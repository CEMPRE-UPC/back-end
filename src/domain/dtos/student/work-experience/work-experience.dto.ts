import { Validators } from '../../../../config';


export class WorkExperienceDto {
    constructor(
        public studentId: string,
        public company: string,
        public position: string,
        public functions: string,
        public startDate: string,
        public endDate: string,
    ) {}


    static create(body: {[key: string]: any }): [string?, WorkExperienceDto?] {

        const { company, position, functions, startDate, endDate, studentId } = body;

        if (!studentId)  return ['studentId is required'];
        if (!company)  return ['company is required']; 
        if (!position)  return ['position is required']; 
        if (!functions)  return ['functions is required']; 
        if (!startDate)  return ['startDate is required']; 
        if(!Validators.datePattern.test(startDate)) return ['startDate is invalid'];
        if (!endDate)  return ['endDate is required']; 
        if(!Validators.datePattern.test(endDate)) return ['endDate is invalid'];


        return [undefined, new WorkExperienceDto(studentId, company, position, functions, startDate, endDate)];
    }
}