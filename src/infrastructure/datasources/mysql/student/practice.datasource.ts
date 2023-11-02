import { PracticeModel } from '../../../../data/mysqldb';
import { CustomError, IPracticeDataSource, PracticeDto, PracticeEntity } from '../../../../domain';
import { PracticeMapper } from '../../../mappers';


export class PracticeDataSource implements IPracticeDataSource {

    async register(practiceDto: PracticeDto): Promise<PracticeEntity> {
       
        const { modality, studentId } = practiceDto;

        try {
            
            const practice = await PracticeModel.findOne({ where: { studentId } });

            if (practice) throw  CustomError.badRequest('Practice already exists');

            const newPractice = PracticeModel.build({
                modality,
                studentId
            });

            const savedPractice = await newPractice.save();

            return PracticeMapper.practiceEntityFromObject(savedPractice);

        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }

    async update(practiceDto: PracticeDto): Promise<boolean> {
        const { modality, studentId } = practiceDto;

        try {
            
            const practice = await PracticeModel.findOne({ where: { studentId } });

            if (!practice) throw  CustomError.badRequest('Practice not found');


            practice.modality = modality;

            await practice.save();

            return true;

        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }


    }
    async getByIdStudent(studentId: string): Promise<PracticeEntity | null> {
        
        try {
            
            const practice = await PracticeModel.findOne({ where: { studentId } });

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

}