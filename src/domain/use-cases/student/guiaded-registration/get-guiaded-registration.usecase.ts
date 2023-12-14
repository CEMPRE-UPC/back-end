import { GuiadedRegistrationEntity } from '../../../entities';
import { IGuiadedRegistrationRepository } from '../../../repositories';


interface IGuiadedRegistration {
    execute( studentId: number): Promise<GuiadedRegistrationEntity | null>
}

export class GetGuiadedRegistrationUseCase implements IGuiadedRegistration {

    constructor(
        private readonly guiadedRegistration: IGuiadedRegistrationRepository
    ) {}

    async execute(studentId: number): Promise<GuiadedRegistrationEntity | null> {

        if(!studentId) {
            throw new Error('Student id must be provided');
        }

        return await this.guiadedRegistration.getByStudentId(studentId);
    }

}