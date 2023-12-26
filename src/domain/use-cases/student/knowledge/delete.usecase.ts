import { CustomError } from '../../../errors';
import { IKnowledgeRepository } from '../../../repositories';


interface IKnowledge {
    execute(id: string): Promise<boolean>
}

export class DeleteUseCase implements IKnowledge {


    constructor(
        private readonly knowledgeRepository: IKnowledgeRepository
    ) { }

    async execute(id: string): Promise<boolean> {

        if (!id) throw CustomError.badRequest("Id is required");
       
        return await this.knowledgeRepository.delete(id);
    }
}