import { ProgramsEnum } from '../../../types/student';

export class UniversityStudiesDto {
    constructor(
        public institution: string,
        public program: string,
        public semester: string,
        public studentId: string
    ) {}


    static create(body: {[key: string]: any }): [string?, UniversityStudiesDto?] {

        const { institution, program, semester, studentId } = body;

        if (!institution)  return ['institution is required'];
        if (!program)  return ['program is required'];
        if (!Object.values(ProgramsEnum).includes(program))  return ['program is invalid'];

        if (!semester)  return ['semester is required'];
        if (!studentId)  return ['studentId is required'];


        return [undefined, new UniversityStudiesDto(institution, program, semester, studentId)];
    }
}