import { GuiadedRegistrationEntity } from '../../../entities';
import { IGuiadedRegistrationRepository } from '../../../repositories';


interface IGuiadedRegistration {
    execute(studentId: number): Promise<GuiadedRegistrationEntity>
}

export class RegisterUseCase implements IGuiadedRegistration {

    constructor(
        private readonly guiadedRegistration: IGuiadedRegistrationRepository
    ) { }


    async execute(studentId: number): Promise<GuiadedRegistrationEntity> {
       
        return await this.guiadedRegistration.register(studentId);
    }
}