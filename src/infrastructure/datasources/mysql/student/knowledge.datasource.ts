import { KnowledgeModel } from '../../../../data/mysqldb';
import { CustomError, IKnowledgeDataSource, KnowledgeDto, KnowledgeEntity, OptionalKnowledgeDto } from '../../../../domain';
import { KnowledgeMapper } from '../../../mappers';



export class KnowledgeDataSource implements IKnowledgeDataSource {
    
    
    async register(knowledgeDto: KnowledgeDto): Promise<KnowledgeEntity> {
        
        const { description, studentId } = knowledgeDto;
        
        try {
            
            const knowledge =  KnowledgeModel.build({
                description,
                studentId
            });

            const savedKnowledge = await knowledge.save();

            return KnowledgeMapper.knowledgeEntityFromObject(savedKnowledge.toJSON());

        } catch (error) {
            
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    
    }
    async update(optKnowledgeDto: OptionalKnowledgeDto): Promise<boolean> {
        const { id, description, studentId } = optKnowledgeDto;

        try {
            
            const exist = await KnowledgeModel.findOne({ where: { id, studentId } });

            if(!exist) {
                throw CustomError.notFound('Project not found');
            }

            const knowledge = await KnowledgeModel.update({
                description,
            }, { where: { id, studentId } });

            return knowledge.at(0) === 1;
        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }

    }
    async getByStudentId(studentId: string): Promise<KnowledgeEntity | null> {
        
        try {

            const knowledge = await KnowledgeModel.findOne({ where: { studentId } });
            
            if(!knowledge) {
                return null;
            }

            return KnowledgeMapper.knowledgeEntityFromObject(knowledge.toJSON());

        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }




}