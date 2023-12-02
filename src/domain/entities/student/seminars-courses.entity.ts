


export class SeminarsOrCoursesEntity {
    
    constructor(
        public id: string,
        public topic: string,
        public institution: string,
        public date: Date | string,
    ) {}
}