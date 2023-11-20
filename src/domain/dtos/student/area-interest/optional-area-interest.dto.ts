

export class OptionalAreaInterestDto  {

    constructor(
        public id: number,
        public description: string,
        public studentId: number,
    ) {}

    static create(body: {[key: string]: any},_id: string): [string?, OptionalAreaInterestDto?] {

        const { studentId } = body;
        const id = parseInt(_id);
        
        if(isNaN(id)) return ['id must be a number'];
        if(!studentId) return ['studentId is required'];
        if(!id) return ['id is required'];

        const description = body.description || undefined;

        return [undefined, new OptionalAreaInterestDto(id, description, studentId)];
    
    }
}