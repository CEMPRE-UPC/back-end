import { Validators } from '../../../config';

export class OptionalCompanyDto {
    constructor(
        public id: string,
        public name: string,
        public startDate: string,
        public endDate: string,
    ) {}

    static create(body: {[key: string]: any }, id: string): [string?, OptionalCompanyDto?] {

        if (!id) return ['id is required'];

        const name = body.name || undefined;
        const startDate = body.startDate || undefined;
        const endDate = body.endDate || undefined;

        if (startDate) {
            if(!Validators.datePattern.test(startDate)) return ['startDate is invalid'];
        }
        if (endDate) {
            if(!Validators.datePattern.test(endDate)) return ['endDate is invalid'];
        }

        return [undefined, new OptionalCompanyDto(id, name, startDate, endDate,)];
    }
}
