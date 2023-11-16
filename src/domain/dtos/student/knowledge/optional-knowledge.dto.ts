

export class OptionalKnowledgeDto  {

    constructor(
        public id: string,
        public description: string[],
        public studentId: string,
    ) {}

    static create(body: {[key: string]: any}, id: string): [string?, OptionalKnowledgeDto?] {

        const { studentId } = body;

        if(!studentId) return ['studentId is required'];
        if(!id) return ['id is required'];

        const description = body.description || undefined;
    

        return [undefined, new OptionalKnowledgeDto(id, description, studentId)];
    
    }
}