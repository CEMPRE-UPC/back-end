import { Validators } from '../../../config';



export class CallDto {
        
        constructor(
            public name: string,
            public startDate: string,
            public endDate: string,
            public practiceId?: string,
        ) {}
    
        static create(body: {[key: string]: any }): [string?, CallDto?] {
            const { name, startDate, endDate, practiceId } = body;
    
            if (!name) return ['El name es requerido'];
            if (!Validators.datePattern.test(startDate))  return ['startDate is required']; 
            if (!Validators.datePattern.test(endDate))  return ['endDate is required']; 
            if (!practiceId)  return ['companyId is required'];

            return [undefined, new CallDto(name, startDate, endDate, practiceId )];
        }

}