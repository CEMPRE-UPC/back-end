

export class AppliedStudiesEntity {

    constructor(
        public id: string,
        public level: string,
        public institution: string,
        public collegeDegree: string,
        public date: Date | string,
    ) {}
}