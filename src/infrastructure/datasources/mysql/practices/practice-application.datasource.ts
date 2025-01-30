import { ValidationError } from 'sequelize';
import { MysqlDatabase, ObservationModel, PracticeApplicationModel } from '../../../../data/mysqldb';
import { CustomError, IPracticeApplicationDataSource, OptionalPracticeApplicationDto, PracticeApplicationEntity } from '../../../../domain';
import { PracticeApplicationMapper, SequelizeErrorMapper } from '../../../mappers';
import { envs } from '../../../../config';

const sequelize = MysqlDatabase.initialize({
    mysqlUrl: envs.MYSQL_URL,
    database: envs.MYSQL_DB_NAME
})


export class PracticeApplicationDataSource implements IPracticeApplicationDataSource {
    async register(studentId: number): Promise<PracticeApplicationEntity> {

        try {

            const practiceApplication = await PracticeApplicationModel.create({ studentId })

            console.log(practiceApplication.toJSON());

            return PracticeApplicationMapper.practiceApplicationEntityFromObject(practiceApplication.toJSON());

        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            if (error instanceof ValidationError) {
                const errors = SequelizeErrorMapper.customErrorFromObject(error);
                const { msg, field } = errors[0];
                throw CustomError.badRequest(`${msg} in field ${field}`);
            }

            console.log(error);
            throw CustomError.internalServer();
        }
    }
    async update(optPracticeApplicationDto: OptionalPracticeApplicationDto): Promise<boolean> {

        
        try {
            const { id, studentId, observation, ...rest } = optPracticeApplicationDto;

            
            const transaction = await sequelize.transaction();
            
            try {
                const practiceApplication = await PracticeApplicationModel.update(rest, { where: { id, studentId }, transaction });
                

                if (observation) {
                    const { content, createdBy, userName, practiceAppId } = observation;
                    await ObservationModel.create({
                        content,
                        userName,
                        createdBy,
                        practiceAppId
                    }, { transaction });
                }
                await transaction.commit();

                return practiceApplication[0] === 1;
            } catch (error) {
                await transaction.rollback();

                if (error instanceof CustomError) {
                    throw error;
                }
                if (error instanceof ValidationError) {
                    const errors = SequelizeErrorMapper.customErrorFromObject(error);
                    const { msg, field } = errors[0];
                    throw CustomError.badRequest(`${msg} in field ${field}`);
                }

                console.log(error);
                throw CustomError.internalServer();
            }
        } catch (error) {
            if (error instanceof CustomError) {
                throw error;
            }
            if (error instanceof ValidationError) {
                const errors = SequelizeErrorMapper.customErrorFromObject(error);
                const { msg, field } = errors[0];
                throw CustomError.badRequest(`${msg} in field ${field}`);
            }

            console.log(error);
            throw CustomError.internalServer();
        }
    }

    async getByIdStudent(studentId: number): Promise<PracticeApplicationEntity | null> {

        try {

            const practiceApplication = await PracticeApplicationModel.findOne({ 
                where: { studentId },
                include: [ObservationModel]
            });

            if (!practiceApplication) return null;

            console.log(practiceApplication.toJSON());
            

            return PracticeApplicationMapper.practiceApplicationEntityFromObject(practiceApplication.toJSON());

        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }
            if (error instanceof ValidationError) {
                const errors = SequelizeErrorMapper.customErrorFromObject(error);
                const { msg, field } = errors[0];
                throw CustomError.badRequest(`${msg} in field ${field}`);
            }

            console.log(error);
            throw CustomError.internalServer();

        }

    }


    getById(id: string): Promise<PracticeApplicationEntity | null> {
        throw new Error('Method not implemented.');
    }

}