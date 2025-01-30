export class ObservationDto {

    constructor(
        public content: string,
        public userName: string,
        public createdBy: string,
        public practiceAppId: string,
    ) { }



    static create(body:{[key: string]: any}): [string?, ObservationDto?] {

        const { content, userName, createdBy, practiceAppId } = body;

        if (!practiceAppId) return ['studentId is required'];
        if (!content) return ['content is required'];
        if (!userName) return ['userName is required'];
        if (!createdBy) return ['createdBy is required'];
        

        return [undefined, new ObservationDto(content, userName, createdBy, practiceAppId)];
    }
}