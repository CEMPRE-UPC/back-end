import { CustomError, StudentEntity } from '../../domain';


export class StudentMapper {

   static studentEntityFromObject(object: { [key: string]:any }) {

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

    } = object;

    if (!_id && !id) throw CustomError.badRequest('Missing id');
    if (!cedula) throw CustomError.badRequest('Missing cedula');
    if (!firstName) throw CustomError.badRequest('Missing firstName');
    if (!lastName) throw CustomError.badRequest('Missing lastName');
    if (!middleName) throw CustomError.badRequest('Missing middleName');
    if (!birthDate) throw CustomError.badRequest('Missing birthDate');
    if (!placeOfBirth) throw CustomError.badRequest('Missing placeOfBirth');
    if (!martialStatus) throw CustomError.badRequest('Missing martialStatus');
    if (!program) throw CustomError.badRequest('Missing program');
    if (!address) throw CustomError.badRequest('Missing address');
    if (!phone) throw CustomError.badRequest('Missing phone');
    if (!eps) throw CustomError.badRequest('Missing eps');
    if (!email) throw CustomError.badRequest('Missing email');
    if (!city) throw CustomError.badRequest('Missing city');

    return new StudentEntity(
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
     userId
    )
   }

}