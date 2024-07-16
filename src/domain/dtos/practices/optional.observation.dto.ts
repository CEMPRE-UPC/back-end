export class OptionalObservationDto {

    constructor(
        public id: string,
        public content: string,
        public createBy: string,
        public creationDate: Date,
        public practiceAppId: string,
    ) { }



    static create(body: { [key: string]: any }, id: string): [string?, OptionalObservationDto?] {
        const { practiceAppId } = body;

        if (!practiceAppId) return ['studentId is required'];
        if (!id) return ['id is required'];

        const content = body.content || undefined;
        const createdBy = body.createdBy || undefined;
        const creationDate = body.creationDate || undefined;


        return [undefined, new OptionalObservationDto(id,content, createdBy, creationDate, practiceAppId)];
    }
}