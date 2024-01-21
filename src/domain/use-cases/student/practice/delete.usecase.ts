import { CustomError } from '../../../errors';
import { IPracticeRepository } from '../../../repositories';


interface IPractice {
    execute(id: string): Promise<boolean>
}

export class DeleteUseCase implements IPractice {


    constructor(
        private readonly practiceRepository: IPracticeRepository
    ) { }

    async execute(id: string): Promise<boolean> {

        if (!id) throw CustomError.badRequest("Id is required");
       
        return await this.practiceRepository.delete(id);
    }
}