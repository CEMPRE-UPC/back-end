import { Validators } from '../../../../config';
import { LevelStudies } from '../../../types/student';


export class OptionalAppliedStudiesDto {

    constructor(
        public id: string,
        public level: string,
        public institution: string,
        public college_degree: string,
        public date: Date,
        public studentId: string
    ) {}


    static create(body:{[key: string]: any}, id: string): [string?, OptionalAppliedStudiesDto?] {
        
        const { studentId  } = body;

        if(!studentId) return ['studentId is required'];
        if(!id) return ['id is required'];

        const level = body.level || undefined;
        const institution = body.institution || undefined;
        const college_degree = body.college_degree || undefined;
        const date = body.date || undefined;

        if(level) {
            if(!Object.values(LevelStudies).includes(level)) return ['level is invalid' ];
        }

        if(date) {
            if(!Validators.datePattern.test(date)) return ['date is invalid'];
        }

        
        return [undefined, new OptionalAppliedStudiesDto(id,level, institution, college_degree, date, studentId)];

    }
}