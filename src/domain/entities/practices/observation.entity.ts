

export class ObservationEntity {
    constructor(
        public id: string,
        public content: string,
        public userName: string,
        public createdBy: string,
        public creationDate: Date | string,
    ) { }
}