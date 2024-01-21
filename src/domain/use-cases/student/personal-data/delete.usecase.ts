import { CustomError } from '../../../errors';
import { IStudentRepository } from '../../../repositories';


interface IStudent {
    execute(id: string): Promise<boolean>
}

export class DeleteUseCase implements IStudent {


    constructor(
        private readonly studentRepository: IStudentRepository
    ) { }

    async execute(id: string): Promise<boolean> {

        if (!id) throw CustomError.badRequest("Id is required");
       
        return await this.studentRepository.delete(id);
    }
}