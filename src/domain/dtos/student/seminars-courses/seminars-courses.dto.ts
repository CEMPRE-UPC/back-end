import { Validators } from '../../../../config';


export class SeminarsOrCoursesDto {

    constructor(
        public topic: string,
        public institution: string,
        public date: Date,
        public studentId: string
    ) {}


    static create(body: { [key: string]: any }): [string?, SeminarsOrCoursesDto?] {
        
        const { topic,institution, date, studentId } = body;

        if (!topic) return ['topic is required'];
        if (!institution) return ['institution is required'];

        if (!date) return ['date is required'];
        if(!Validators.datePattern.test(date)) return ['date is invalid'];
        
        if (!studentId) return ['studentId is required'];
        
        

        return [undefined, new SeminarsOrCoursesDto(topic, institution, date, studentId)];
    }
}
