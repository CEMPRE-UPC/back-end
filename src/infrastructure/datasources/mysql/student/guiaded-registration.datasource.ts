import { GuiadedRegistrationModel } from '../../../../data/mysqldb';
import { CustomError, GuiadedRegistrationEntity, IGuiadedRegistrationDataSource } from '../../../../domain';
import { GuiadedRegistrationMapper } from '../../../mappers';


export class GuiadedRegistrationDataSource implements IGuiadedRegistrationDataSource {


    async register(studentId: number): Promise<GuiadedRegistrationEntity> {
        
        try {

            const guiadedRegistration = await GuiadedRegistrationModel.create({ studentId })

            return GuiadedRegistrationMapper.guiadedRegistrationEntityFromObject(guiadedRegistration);
            
        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
            
        }
    }
    async getByStudentId(studentId: number): Promise<GuiadedRegistrationEntity | null> {
        
        try {

            const guiadedRegistration = await GuiadedRegistrationModel.findOne({ where: { studentId } });

            if(!guiadedRegistration) return null;

            return GuiadedRegistrationMapper.guiadedRegistrationEntityFromObject(guiadedRegistration.toJSON());
            
        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
            
        }
    }


    async delete(studentId: number): Promise<boolean> {
        
        try {

            const deleted = await GuiadedRegistrationModel.destroy({ where: { studentId } });

            return deleted === 1;
            
        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
            
        }
    }
  

}