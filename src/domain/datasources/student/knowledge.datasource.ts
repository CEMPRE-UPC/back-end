import { KnowledgeDto, OptionalKnowledgeDto } from '../../dtos/student'
import { KnowledgeEntity } from '../../entities'


export interface IKnowledgeDataSource {

    register(knowledgeDto: KnowledgeDto): Promise<KnowledgeEntity>

    update(optKnowledgeDto: OptionalKnowledgeDto): Promise<boolean>

    getByStudentId(studentId: string): Promise<KnowledgeEntity | null>
}