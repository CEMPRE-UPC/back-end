import { Validators } from '../../../../config';




export class OptionalSeminarsOrCoursesDto {

    constructor(
        public id: string,
        public topic: string,
        public institution: string,
        public date: Date,
        public studentId: string
    ) {}


    static create(body: { [key: string]: any }, id: string): [string?, OptionalSeminarsOrCoursesDto?] {
        
        const { studentId } = body;

        if (!studentId) return ['studentId is required'];
        if (!id) return ['id is required'];
        
        const topic = body.topic || undefined;
        const institution = body.institution || undefined;
        const date = body.date || undefined;
        
        if (date) {
            if(!Validators.datePattern.test(date)) return ['date is invalid'];
        }

        return [undefined, new OptionalSeminarsOrCoursesDto(id, topic, institution, date, studentId)];
    }
}
