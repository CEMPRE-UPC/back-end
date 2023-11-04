import { Validators } from '../../../../config';


export class WorkExperienceDto {
    constructor(
        public studentId: string,
        public company: string,
        public position: string,
        public functions: string,
        public start_date: string,
        public end_date: string,
    ) {}


    static create(body: {[key: string]: any }): [string?, WorkExperienceDto?] {

        const { company, position, functions, start_date, end_date, studentId } = body;

        if (!studentId)  return ['studentId is required'];
        if (!company)  return ['company is required']; 
        if (!position)  return ['position is required']; 
        if (!functions)  return ['functions is required']; 
        if (!start_date)  return ['start_date is required']; 
        if(!Validators.datePattern.test(start_date)) return ['start_date is invalid'];
        if (!end_date)  return ['end_date is required']; 
        if(!Validators.datePattern.test(end_date)) return ['end_date is invalid'];


        return [undefined, new WorkExperienceDto(studentId, company, position, functions, start_date, end_date)];
    }
}