import { CustomError, IKnowledgeDataSource, IKnowledgeRepository, KnowledgeDto, KnowledgeEntity, OptionalKnowledgeDto } from '../../../domain';


export class KnowledgeRepository implements IKnowledgeRepository {

    constructor(
        private readonly knowledgeDatasource: IKnowledgeDataSource
    ) {}


    register(knowledgeDto: KnowledgeDto): Promise<KnowledgeEntity> {
       return this.knowledgeDatasource.register(knowledgeDto);
    }
    update(optKnowledgeDto: OptionalKnowledgeDto): Promise<boolean> {
        return this.knowledgeDatasource.update(optKnowledgeDto);
    }
    getByStudentId(studentId: string): Promise<KnowledgeEntity | null> {

        if(!studentId) throw CustomError.badRequest('Missing student id');

        return this.knowledgeDatasource.getByStudentId(studentId);
    }
    delete(id: string): Promise<boolean> {
        return this.knowledgeDatasource.delete(id);
    }
}