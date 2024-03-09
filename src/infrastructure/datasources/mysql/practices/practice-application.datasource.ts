import { PracticeApplicationModel } from '../../../../data/mysqldb';
import { CustomError, IPracticeApplicationDataSource, OptionalPracticeApplicationDto, PracticeApplicationEntity } from '../../../../domain';
import { PracticeApplicationMapper } from '../../../mappers';


export class PracticeApplicationDataSource implements IPracticeApplicationDataSource {
    async register(studentId: number): Promise<PracticeApplicationEntity> {
        
        try {
            
            const practiceApplication = await PracticeApplicationModel.create({ studentId })

            return PracticeApplicationMapper.practiceApplicationEntityFromObject(practiceApplication);
            
        } catch (error) {
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();

            
        }
    }
    update(optPracticeApplicationDto: OptionalPracticeApplicationDto): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getByIdStudent(studentId: number): Promise<PracticeApplicationEntity[] | null> {
        throw new Error('Method not implemented.');
    }
    getById(id: string): Promise<PracticeApplicationEntity | null> {
        throw new Error('Method not implemented.');
    }

}