import { PracticeApplicationModel } from '../../../../data/mysqldb';
import { CustomError, IPracticeApplicationDataSource, OptionalPracticeApplicationDto, PracticeApplicationEntity } from '../../../../domain';
import { PracticeApplicationMapper } from '../../../mappers';


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
            console.log(error);
            throw CustomError.internalServer();


        }
    }
    update(optPracticeApplicationDto: OptionalPracticeApplicationDto): Promise<boolean> {
        throw new Error('Method not implemented.');
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
            console.log(error);
            throw CustomError.internalServer();

        }

    }


    getById(id: string): Promise<PracticeApplicationEntity | null> {
        throw new Error('Method not implemented.');
    }

}