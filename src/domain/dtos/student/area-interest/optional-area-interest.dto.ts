

export class OptionalAreaInterestDto  {

    constructor(
        public id: string,
        public description: string[],
        public studentId: string,
    ) {}

    static create(body: {[key: string]: any}, id: string): [string?, OptionalAreaInterestDto?] {

        const { studentId } = body;

        if(!studentId) return ['studentId is required'];
        if(!id) return ['id is required'];

        const description = body.description || undefined;

        return [undefined, new OptionalAreaInterestDto(id, description, studentId)];
    
    }
}