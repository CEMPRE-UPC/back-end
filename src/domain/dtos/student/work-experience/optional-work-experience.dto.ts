import { Validators } from '../../../../config';

export class OptionalWorkExperienceDto {
    constructor(
        public studentId: string,
        public id: string,
        public company: string,
        public position: string,
        public functions: string,
        public startDate: string,
        public endDate: string,
    ) {}

    static create(body: {[key: string]: any }, id: string): [string?, OptionalWorkExperienceDto?] {

        const { studentId, ...rest } = body;

        if (!id) return ['id is required'];
        if (!studentId) return ['studentId is required'];

        const company = body.company || undefined;
        const position = body.position || undefined;
        const functions = body.functions || undefined;
        const startDate = body.startDate || undefined;
        const endDate = body.endDate || undefined;

        if (startDate) {
            if(!Validators.datePattern.test(startDate)) return ['startDate is invalid'];
        }
        if (endDate) {
            if(!Validators.datePattern.test(endDate)) return ['endDate is invalid'];
        }

        return [undefined, new OptionalWorkExperienceDto(studentId, id, company, position, functions, startDate, endDate,)];
    }
}
