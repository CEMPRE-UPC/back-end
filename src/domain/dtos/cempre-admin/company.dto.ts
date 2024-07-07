import { Validators } from '../../../config/validators';


export class CompanyDto {
    
    constructor(
        public name: string,
        public startDate: string,
        public endDate: string,
    ) {}

    static create(body: {[key: string]: any }): [string?, CompanyDto?] {
        const { name, startDate, endDate } = body;

        if (!name) return ['El correo es requerido'];
        if (!startDate) return ['La contraseña es requerida'];
        if (!startDate)  return ['startDate is required']; 
        if(!Validators.datePattern.test(startDate)) return ['startDate is invalid'];
        if (!endDate)  return ['endDate is required']; 
        if(!Validators.datePattern.test(endDate)) return ['endDate is invalid'];


        return [undefined, new CompanyDto(name, startDate, endDate)];
    }
}