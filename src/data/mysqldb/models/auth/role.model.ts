import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';

const sequelize = MysqlDatabase.initialize({
    mysqlUrl: envs.MYSQL_URL,
    database: envs.MYSQL_DB_NAME
})

class RoleModel extends Model {
    public id!: number;
    public name!: string;
}

const roles = [
  'STUDENT_ROLE',
  'CEMPRE_ADMIN_ROLE', 
  'CEMPRE_CURR_ROLE', 
  'CEMPRE_PROF_ROLE', 
  'PROGRAM_AE_ROLE', 
  'PROGRAM_CI_ROLE', 
  'PROGRAM_EC_ROLE', 
  'PROGRAM_CP_ROLE',
  'PROGRAM_AETH_ROLE',
  'FACULTAD_ADMIN_ROLE',
];

RoleModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: roles[0],
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'roles',
        timestamps: false
    }
)

RoleModel.afterSync(async () => {
  try {
    await sequelize.transaction(async (t) => {
      for (const role of roles) {
        const [existingRole, created] = await RoleModel.findOrCreate({
          where: { name: role },
          defaults: { name: role },
          transaction: t
        });
        console.log(existingRole.get({ plain: true }));
        console.log(created);
      }
    });
  } catch (error) {
    console.error('Error during transaction:', error);
  }
});

export { RoleModel };