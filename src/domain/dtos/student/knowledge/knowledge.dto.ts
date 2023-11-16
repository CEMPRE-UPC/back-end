
export class KnowledgeDto {

    constructor(
        public description: string[],
        public studentId: string 
    ) {}


    static create(body:{[key: string]: any}): [string?, KnowledgeDto?] {
        const { description = [], studentId } = body;

        if(!description.length) return ['description is required'];
        if(!studentId) return ['studentId is required'];
        

        return [undefined, new KnowledgeDto(description, studentId)];        
  
    }
}