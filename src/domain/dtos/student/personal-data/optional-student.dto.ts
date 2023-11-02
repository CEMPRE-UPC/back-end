import { Validators } from '../../../../config';


export class OptionalStudentDto {

    constructor(
        public cedula?: string,
        public firstName?: string,
        public lastName?: string,
        public middleName?: string,
        public birthDate?: Date,
        public placeOfBirth?: string,
        public martialStatus?: string,
        public program?: string,
        public address?: string,
        public phone?: string,
        public city?: string,
        public eps?: string,
        public secondName?: string
    ) {}

    static create(body: {[key: string]: any}, cedula: string): [string?, OptionalStudentDto?] {

        const {
            firstName,
            secondName,
            lastName,
            middleName,
            birthDate,
            placeOfBirth,
            martialStatus,
            program,
            address,
            phone,
            eps,
            city
        } = body;

        if (!cedula) return ['Cedula is required'];
        if (!Validators.tenCharactersPattern.test(cedula)) return ['La cedula debe tener 10 caracteres'];
        if (!Validators.onlyNumbersPattern.test(cedula)) return ['La cedula solo puede contener numeros'];

        if (!Validators.onlyLettersPattern.test(firstName)) return ['El primer nombre solo puede contener letras'];
        
        if (!Validators.onlyLettersPattern.test(secondName)) return ['El segunndo nombre solo puede contener letras'];

        if (!Validators.onlyLettersPattern.test(lastName)) return ['El primer apellido solo puede contener letras'];

        if (!Validators.onlyLettersPattern.test(middleName)) return ['El segundo apellido solo puede contener letras'];

        if ( !Validators.datePattern.test(birthDate) ) return ['La fecha debe tener el formato yyyy-mm-dd'];
        
        if (!Validators.placeOfBirthPattern.test(placeOfBirth)) return ['El campo debe tener el formato: "Ciudad, Departamento"'];

        if (!Validators.onlyLettersPattern.test(martialStatus)) return ['El estado civil solo puede contener letras'];

        if (!Validators.onlyLettersPattern.test(program)) return ['El programa solo puede contener letras'];

        if (!Validators.addressPattern.test(address)) return ['La direccion solo puede contener letras, numeros y los caracteres: ,.-#'];

        if (!Validators.tenCharactersPattern.test(phone)) return ['El telefono debe tener 10 caracteres'];
        if (!Validators.onlyNumbersPattern.test(phone)) return ['El telefono solo puede contener numeros'];

        if (!Validators.onlyLettersPattern.test(eps)) return ['La eps solo puede contener letras'];

        if (!Validators.onlyLettersPattern.test(city)) return ['La ciudad solo puede contener letras'];

        return [undefined, new OptionalStudentDto(
            cedula,
            firstName,
            lastName,
            middleName,
            birthDate,
            placeOfBirth,
            martialStatus,
            program,
            address,
            phone,
            city,
            eps,
            secondName
        )]
    }

    static toJSON(optionalStudentDto: OptionalStudentDto): { [key: string]: any } {
        return {
            cedula: optionalStudentDto.cedula,
            firstName: optionalStudentDto.firstName,
            lastName: optionalStudentDto.lastName,
            middleName: optionalStudentDto.middleName,
            birthDate: optionalStudentDto.birthDate,
            placeOfBirth: optionalStudentDto.placeOfBirth,
            martialStatus: optionalStudentDto.martialStatus,
            program: optionalStudentDto.program,
            address: optionalStudentDto.address,
            phone: optionalStudentDto.phone,
            eps: optionalStudentDto.eps,
            city: optionalStudentDto.city,
            secondName: optionalStudentDto.secondName
        }
    }
}