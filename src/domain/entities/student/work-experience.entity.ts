

export class WorkExperienceEntity {
   
    constructor(
        public id: string,
        public company: string,
        public position: string,
        public functions: string,
        public start_date: Date | string,
        public end_date: Date | string,
    ) {}
}