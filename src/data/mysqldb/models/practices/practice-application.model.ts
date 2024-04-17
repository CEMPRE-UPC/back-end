import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { StudentModel } from '../student';


const sequelize = MysqlDatabase.initialize({
    mysqlUrl: envs.MYSQL_URL,
    database: envs.MYSQL_DB_NAME
});

const EVENTS = ['Enviado para revisar por CEMPRE', 'Revisado por CEMPRE', 'Revisado por el programa', 'Revisado por la facultad', 'Practicas avaladas', 'Practicas rechazadas'];
const STATUS = [
    'Sin revisar',
    'Por corregir',
    'Actualizado',
    'Correcto'
]

class PracticeApplicationModel extends Model {
    public id!: string;
    // campos para validar si se subio el archivo
    public identificationFile!: boolean;
    public photoFile!: boolean;
    public classScheduleFile!: boolean;
    public epsFile!: boolean;
    public graduationCertificateFile!: boolean;
    public companyRequestLetterFile!: boolean;
    public statusCempre!: string;
    public statusProgram!: string;
    public statusFaculty!: string;
    public event!: string;
    public observation!: string;
    public createdAt!: Date;
    public updatedAt!: Date;

}

PracticeApplicationModel.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        identificationFile: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        photoFile: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        classScheduleFile: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        epsFile: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        graduationCertificateFile: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        companyRequestLetterFile: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        event: {
            type: DataTypes.ENUM(...EVENTS),
            defaultValue: EVENTS.at(0)
        },
        statusCempre: {
            type: DataTypes.ENUM(...STATUS),
            defaultValue: STATUS.at(0)
        },
        statusProgram: {
            type: DataTypes.ENUM(...STATUS),
            defaultValue: STATUS.at(0)
        },
        statusFaculty: {
            type: DataTypes.ENUM(...STATUS),
            defaultValue: STATUS.at(0)
        },
        observation: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: new Date()
        }
    },
    {
        sequelize,
        tableName: 'practice_applications',
        timestamps: true
    }
);

StudentModel.hasOne(PracticeApplicationModel, { foreignKey: { name: 'studentId' } });
PracticeApplicationModel.belongsTo(StudentModel, { foreignKey: { name: 'studentId' } });

export { PracticeApplicationModel };