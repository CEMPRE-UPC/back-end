import { DataTypes, ENUM, Model } from 'sequelize';
import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';

// Inicializar Sequelize
const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME,
});

// Clase del modelo
class PracticeModel extends Model {
  public id!: string;
  public modality!: string;
}

// Lista de modalidades permitidas
const modalities = ['professional', 'curricular'];

// Inicializar el modelo
PracticeModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    modality: {
      type: ENUM(...modalities), // O usa DataTypes.STRING con validate si ENUM causa problemas
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'practices',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['modality'], // Asegura un índice único
      },
    ],
  }
);

// Insertar modalidades si no existen
PracticeModel.afterSync(async () => {
  try {
    await sequelize.transaction(async (t) => {
      for (const modality of modalities) {
        const [existingPractice, created] = await PracticeModel.findOrCreate({
          where: { modality },
          defaults: { modality },
          transaction: t,
        });
        console.log('Práctica existente o creada:', existingPractice.get({ plain: true }));
        console.log('¿Creado nuevo registro?:', created);
      }
    });
  } catch (error) {
    console.error('Error durante la transacción en afterSync:', error);
  }
});

export { PracticeModel };
