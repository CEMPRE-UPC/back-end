import { OptionalKnowledgeDto } from '../../../dtos/student';
import { IKnowledgeRepository } from '../../../repositories';


interface IKnowledge {
    execute(optKnowledgeDto: OptionalKnowledgeDto): Promise<boolean>
}

export class UpdateUseCase implements IKnowledge {

    constructor(
        private readonly knowledge: IKnowledgeRepository
    ) { }

    async execute(optKnowledgeDto: OptionalKnowledgeDto): Promise<boolean> {
       
        return await this.knowledge.update(optKnowledgeDto);
    }
}