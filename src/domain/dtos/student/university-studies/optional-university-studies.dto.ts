import { ProgramsEnum } from '../../../types/student';

export class OptionalUniversityStudiesDto {
    constructor(
        public id: string,
        public institution: string,
        public program: string,
        public semester: string,
        public studentId: string,
    ) {}


    static create(body: {[key: string]: any }, id: string): [string?, OptionalUniversityStudiesDto?] {

        const { studentId } = body;

        if (!id) return ['id is required'];
        if (!studentId) return ['studentId is required'];

        const institution = body.institution || undefined;
        const program = body.program || undefined;
        const semester = body.semester || undefined;

        if (program) {
            if (!Object.values(ProgramsEnum).includes(program)) return ['program is invalid'];
        }

        return [undefined, new OptionalUniversityStudiesDto(id, institution, program, semester, studentId)];
    }
}