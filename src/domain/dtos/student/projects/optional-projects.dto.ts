

export class OptionalProjectsDto  {

    constructor(
        public id: string,
        public description: string,
        public date: string,
        public studentId: string,
    ) {}

    static create(body: {[key: string]: any}, id: string): [string?, OptionalProjectsDto?] {

        const { studentId } = body;

        if(!studentId) return ['studentId is required'];
        if(!id) return ['id is required'];

        const description = body.description || undefined;
        const date = body.date || undefined;
    

        return [undefined, new OptionalProjectsDto(id, description, date, studentId)];
    
    }
}