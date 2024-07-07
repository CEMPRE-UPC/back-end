import { Validators } from '../../../config';
import { Status } from '../../types/call';



export class CallDto {
        
        constructor(
            public name: string,
            public startDate: string,
            public endDate: string,
            public status: Status,
            public practiceId?: string,
        ) {}
    
        static create(body: {[key: string]: any }): [string?, CallDto?] {
            const { name, startDate, endDate, status, practiceId } = body;
    
            if (!name) return ['El name es requerido'];
            if (!Validators.datePattern.test(startDate))  return ['startDate is required']; 
            if (!Validators.datePattern.test(endDate))  return ['endDate is required']; 
            if (!status)  return ['status is required'];
            if (!Object.values(Status).includes(status))  return ['status is invalid'];
            if (!practiceId)  return ['companyId is required'];

            return [undefined, new CallDto(name, startDate, endDate, status, practiceId )];
        }

}