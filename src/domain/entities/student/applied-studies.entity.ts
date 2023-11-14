

export class AppliedStudiesEntity {

    constructor(
        public id: string,
        public level: string,
        public institution: string,
        public college_degree: string,
        public date: Date | string,
    ) {}
}