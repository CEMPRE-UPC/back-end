import { PracticeModel } from '../../../../data/mysqldb';
import { CustomError, IPracticeDataSource, PracticeEntity } from '../../../../domain';
import { PracticeMapper } from '../../../mappers';


export class PracticeDataSource implements IPracticeDataSource {
    
    async getPracticeById( id: string ): Promise<PracticeEntity | null> {
        
        try {
            
            const practice = await PracticeModel.findByPk(id);

            if (!practice) return null;

            return PracticeMapper.practiceEntityFromObject(practice);

        } catch (error) {
            
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }

    async getAllPractices(): Promise<PracticeEntity[] | null> {
        try {
            

            const practices = await PracticeModel.findAll();

            if (!practices) return null;

            return practices.map(PracticeMapper.practiceEntityFromObject);

        } catch (error) {
            
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }

}