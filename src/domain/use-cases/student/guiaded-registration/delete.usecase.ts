import { IGuiadedRegistrationRepository } from '../../../repositories/student';


interface IGuiadedRegistration {
    execute(studentId: number): Promise<boolean>
}

export class DeleteUseCase implements IGuiadedRegistration {

    constructor(
        private readonly guiadedRegistration: IGuiadedRegistrationRepository
    ) { }

    async execute(studentId: number): Promise<boolean> {
       
        return await this.guiadedRegistration.delete(studentId);
    }
}