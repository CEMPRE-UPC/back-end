import { Validators } from '../../../../config';

export class ProjectsDto {

    constructor(
        public description: string,
        public date: string,
        public studentId: string 
    ) {}


    static create(body:{[key: string]: any}): [string?, ProjectsDto?] {
        const { description, date, studentId } = body;

        if(!description) return ['description is required'];
        if(!date) return ['date is required'];
        if(!Validators.datePattern.test(date)) return ['date is invalid']
      
        if(!studentId) return ['studentId is required'];
        

        return [undefined, new ProjectsDto(description, date, studentId)];        
  
    }
}