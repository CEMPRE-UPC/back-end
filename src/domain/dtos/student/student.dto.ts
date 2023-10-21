import { Validators } from '../../../config';

export class StudentDto {

    constructor(
        public id: number,
        public cedula: string,
        public firstName: string,
        public lastName: string,
        public middleName: string,
        public birthDate: Date,
        public placeOfBirth: string,
        public martialStatus: string,
        public program: string,
        public address: string,
        public phone: string,
        public eps: string,
        public email: string,
        public city: string,
        public userId: string,
        public secondName?: string
    ) {}


    static create(body: {[key: string]: any}): [string?, StudentDto?] {

        const {
            _id,
            id,
            cedula,
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
            email,
            city,
            userId

        } = body;

        if ( !cedula ) return ['La cedula es requerida'];
        if (!Validators.tenCharactersPattern.test(cedula)) return ['La cedula debe tener 10 caracteres'];
        if (!Validators.onlyNumbersPattern.test(cedula)) return ['La cedula solo puede contener numeros'];

        if ( !firstName ) return ['El primer nombre es requerido'];
        if (!Validators.onlyLettersPattern.test(firstName)) return ['El primer nombre solo puede contener letras'];

        if (!Validators.onlyLettersPattern.test(secondName)) return ['El segunndo nombre solo puede contener letras'];

        if ( !lastName ) return ['El primer apellido es requerido'];
        if (!Validators.onlyLettersPattern.test(lastName)) return ['El primer apellido solo puede contener letras'];

        if ( !middleName ) return ['El segundo apellido es requerido'];
        if (!Validators.onlyLettersPattern.test(middleName)) return ['El segundo apellido solo puede contener letras'];

        if ( !birthDate ) return ['La fecha de nacimiento es requerida'];
        if ( !Validators.datePattern.test(birthDate) ) return ['La fecha debe tener el formato yyyy-mm-dd'];

        if ( !placeOfBirth ) return ['El lugar de nacimiento es requerido'];
        if (!Validators.onlyLettersPattern.test(placeOfBirth)) return ['El lugar de nacimiento solo puede contener letras'];

        if ( !martialStatus ) return ['El estado civil es requerido'];
        if (!Validators.onlyLettersPattern.test(martialStatus)) return ['El estado civil solo puede contener letras'];

        if ( !program ) return ['El programa es requerido'];
        if (!Validators.onlyLettersPattern.test(program)) return ['El programa solo puede contener letras'];

        if ( !address ) return ['La direccion es requerida'];
        if (!Validators.addressPattern.test(address)) return ['La direccion solo puede contener letras, numeros y los caracteres: ,.-#'];

        if ( !phone ) return ['El telefono es requerido'];
        if (!Validators.tenCharactersPattern.test(phone)) return ['El telefono debe tener 10 caracteres'];
        if (!Validators.onlyNumbersPattern.test(phone)) return ['El telefono solo puede contener numeros'];

        if ( !eps ) return ['La eps es requerida'];
        if (!Validators.onlyLettersPattern.test(eps)) return ['La eps solo puede contener letras'];

        if ( !email ) return ['El email es requerido'];
        if (!Validators.emailPattern.test(email)) return ['El email debe tener el formato'];

        if ( !city ) return ['La ciudad es requerida'];
        if (!Validators.onlyLettersPattern.test(city)) return ['La ciudad solo puede contener letras'];

        if ( !userId ) return ['El id del usuario es requerido'];
        if (!Validators.onlyNumbersPattern.test(userId)) return ['El id del usuario solo puede contener numeros'];


        return [undefined, new StudentDto(
            _id || id,
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
            eps,
            email,
            city,
            userId,
            secondName
        )]

    }

    static toJSON(studentDto: StudentDto): { [key: string]: any } {

        return {
            id: studentDto.id,
            cedula: studentDto.cedula,
            firstName: studentDto.firstName,
            secondName: studentDto.secondName,
            lastName: studentDto.lastName,
            middleName: studentDto.middleName,
            birthDate: studentDto.birthDate,
            placeOfBirth: studentDto.placeOfBirth,
            martialStatus: studentDto.martialStatus,
            program: studentDto.program,
            address: studentDto.address,
            phone: studentDto.phone,
            eps: studentDto.eps,
            email: studentDto.email,
            city: studentDto.city,
            userId: studentDto.userId
        }
    }
}