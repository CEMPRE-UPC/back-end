import { CustomError, IKnowledgeRepository, KnowledgeDto, KnowledgeEntity, OptionalKnowledgeDto } from '../../../domain';


export class KnowledgeRepository implements IKnowledgeRepository {

    constructor(
        private readonly knowledgeRepository: IKnowledgeRepository
    ) {}


    register(knowledgeDto: KnowledgeDto): Promise<KnowledgeEntity> {
       return this.knowledgeRepository.register(knowledgeDto);
    }
    update(optKnowledgeDto: OptionalKnowledgeDto): Promise<boolean> {
        return this.knowledgeRepository.update(optKnowledgeDto);
    }
    getByStudentId(studentId: string): Promise<KnowledgeEntity | null> {

        if(!studentId) throw CustomError.badRequest('Missing student id');

        return this.knowledgeRepository.getByStudentId(studentId);
    }
}