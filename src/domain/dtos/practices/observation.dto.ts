export class ObservationDto {

    constructor(
        public content: string,
        public createdBy: string,
        public practiceAppId: string,
    ) { }



    static create(body:{[key: string]: any}): [string?, ObservationDto?] {

        const { content, createdBy, practiceAppId } = body;

        if (!practiceAppId) return ['studentId is required'];
        if (!content) return ['content is required'];
        if (!createdBy) return ['createdBy is required'];

        return [undefined, new ObservationDto(content, createdBy, practiceAppId)];
    }
}