import { Validators } from '../../../../config';


export class OptionalWorkExperienceDto {
    constructor(
        public studentId: string,
        public id: string,
        public company?: string,
        public position?: string,
        public functions?: string,
        public start_date?: string,
        public end_date?: string,
    ) {}


    static create(body: {[key: string]: any }, id: string): [string?, OptionalWorkExperienceDto?] {

        const { company, position, functions, start_date, end_date, studentId } = body;

        if (!id) return ['id is required'];
        if (!studentId) return ['studentId is required'];

        if (start_date) {
            if(!Validators.datePattern.test(start_date)) return ['start_date is invalid'];
        }
        if (end_date) {
            if(!Validators.datePattern.test(end_date)) return ['end_date is invalid'];
        }

        return [undefined, new OptionalWorkExperienceDto(studentId, id, company, position, functions, start_date, end_date)];
    }
}