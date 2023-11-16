import { KnowledgeEntity } from '../../../entities';
import { IKnowledgeRepository } from '../../../repositories';


interface Iknowledge {
    execute( studentId: string): Promise<KnowledgeEntity | null>
}

export class GetKnowledgeUseCase implements Iknowledge {

    constructor(
        private readonly knowledge: IKnowledgeRepository
    ) {}

    async execute(studentId: string): Promise<KnowledgeEntity | null> {

        if(!studentId) {
            throw new Error('Student id must be provided');
        }

        return await this.knowledge.getByStudentId(studentId);
    }

}