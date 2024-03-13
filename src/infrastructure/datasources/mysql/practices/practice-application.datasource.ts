import { ValidationError } from 'sequelize';
import { PracticeApplicationModel } from '../../../../data/mysqldb';
import { CustomError, IPracticeApplicationDataSource, OptionalPracticeApplicationDto, PracticeApplicationEntity } from '../../../../domain';
import { PracticeApplicationMapper, SequelizeErrorMapper } from '../../../mappers';


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
            
            const { id, studentId,...rest } = optPracticeApplicationDto;

            const practiceApplication = await PracticeApplicationModel.update(rest, { where: { id, studentId } });

            return practiceApplication.at(0) === 1;

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

            const practiceApplication = await PracticeApplicationModel.findOne({ where: { studentId } });

            if (!practiceApplication) return null;

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