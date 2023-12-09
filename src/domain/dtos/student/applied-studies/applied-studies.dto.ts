import { Validators } from '../../../../config';
import { LevelStudies } from '../../../types/student';


export class AppliedStudiesDto {

    constructor(
        public level: string,
        public institution: string,
        public collegeDegree: string,
        public date: Date,
        public studentId: string
    ) {}


    static create(body:{[key: string]: any}): [string?, AppliedStudiesDto?] {
        
        const { level, institution, collegeDegree, date, studentId  } = body;

        if(!level) return ['level is required'];
        if(!Object.values(LevelStudies).includes(level)) return ['level is invalid' ];

        if(!institution) return ['institution is required'];
        if(!collegeDegree) return ['collegeDegree is required'];
        
        if(!date) return ['date is required'];
        if(!Validators.datePattern.test(date)) return ['date is invalid'];
        if(!studentId) return ['studentId is required'];
        
        return [undefined, new AppliedStudiesDto(level, institution, collegeDegree, date, studentId)];

        
  
    }
}