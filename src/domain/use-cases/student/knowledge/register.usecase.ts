import { KnowledgeDto } from '../../../dtos/student';
import { KnowledgeEntity } from '../../../entities';
import { IKnowledgeRepository } from '../../../repositories';


interface IKnowledge {
    execute(knowledgeDto: KnowledgeDto): Promise<KnowledgeEntity>
}

export class RegisterUseCase implements IKnowledge {


    constructor(
        private readonly knowledge: IKnowledgeRepository
    ) { }


    async execute(knowledgeDto: KnowledgeDto): Promise<KnowledgeEntity> {
       
        return await this.knowledge.register(knowledgeDto);
    }
}