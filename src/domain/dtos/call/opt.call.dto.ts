import { Validators } from '../../../config';


export class OptionalCallDto {
    constructor(
        public id?: string,
        public name?: string,
        public startDate?: string,
        public endDate?: string,
        public practiceId?: string
    ) {}


    static create( body: {[key:string]: any}, id: string): [string?, OptionalCallDto?] {
        if (!id) return ['id is required'];

        const name = body.name || undefined;
        const startDate = body.startDate || undefined;
        const endDate = body.endDate || undefined;
        const practiceId = body.practiceId || undefined;

        if (startDate) {
            if (!Validators.datePattern.test(startDate)) return ['startDate is invalid'];
        }
        if (endDate) {
            if (!Validators.datePattern.test(endDate)) return ['endDate is invalid'];
        }

        return [undefined, new OptionalCallDto(id, name, startDate, endDate, practiceId)];
    }


}