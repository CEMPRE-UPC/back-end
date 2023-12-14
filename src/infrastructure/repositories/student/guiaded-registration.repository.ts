import { GuiadedRegistrationEntity, CustomError, IGuiadedRegistrationRepository } from '../../../domain';
import { GuiadedRegistrationDataSource } from '../../datasources';


export class GuiadedRegistrationRepository implements IGuiadedRegistrationRepository {
    
    constructor(
        private readonly guiadedRegistration: GuiadedRegistrationDataSource
    ) {}

    register(studentId: number): Promise<GuiadedRegistrationEntity> {
        if (!studentId) {
            throw CustomError.badRequest('studentId is required');
        }
        return this.guiadedRegistration.register(studentId);
    }
    delete(studentId: number): Promise<boolean> {
        if (!studentId) {
            throw CustomError.badRequest('studentId is required');
        }
        return this.guiadedRegistration.delete(studentId);
    }
    getByStudentId(studentId: number): Promise<GuiadedRegistrationEntity | null> {
        
        if (!studentId) {
            throw CustomError.badRequest('studentId is required');
        }

        return this.guiadedRegistration.getByStudentId(studentId);
    }

}