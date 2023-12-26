

export class WorkExperienceEntity {
   
    constructor(
        public id: string,
        public company: string,
        public position: string,
        public functions: string,
        public startDate: Date | string,
        public endDate: Date | string,
    ) {}
}