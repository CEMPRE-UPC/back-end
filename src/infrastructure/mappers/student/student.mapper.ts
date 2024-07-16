import { ObservationModel } from '../../../data/mysqldb';
import { CustomError, StudentEntity } from '../../../domain';
import { ObservationMapper, PracticeApplicationMapper } from '../practices';

export class StudentMapper {

    static studentEntityFromObject(object: { [key: string]: any }) {



        
        
        const modality  = object?.PracticeModel?.modality;
        const program  = object?.UniversityStudiesModel?.program;
        const practiceApplication = object?.PracticeApplicationModel ? PracticeApplicationMapper.practiceApplicationEntityFromObject(object.PracticeApplicationModel) : null;
        const observations = object?.PracticeApplicationModel?.ObservationModels.map((observation: ObservationModel) => ObservationMapper.observationEntityFromObject(observation));
        
        
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
            address,
            phone,
            eps,
            email,
            city,
            userId,
            practiceId,
        } = object;


        if (!_id && !id) throw CustomError.badRequest('Missing id');
        if (!cedula) throw CustomError.badRequest('Missing cedula');
        if (!firstName) throw CustomError.badRequest('Missing firstName');
        if (!lastName) throw CustomError.badRequest('Missing lastName');
        if (!middleName) throw CustomError.badRequest('Missing middleName');
        if (!birthDate) throw CustomError.badRequest('Missing birthDate');
        if (!placeOfBirth) throw CustomError.badRequest('Missing placeOfBirth');
        if (!martialStatus) throw CustomError.badRequest('Missing martialStatus');
        if (!address) throw CustomError.badRequest('Missing address');
        if (!phone) throw CustomError.badRequest('Missing phone');
        if (!eps) throw CustomError.badRequest('Missing eps');
        if (!email) throw CustomError.badRequest('Missing email');
        if (!city) throw CustomError.badRequest('Missing city');

        // if (practiceApplication) {
        //     practiceApplication.observations = observations;
        // }

        return new StudentEntity(
            _id || id,
            cedula,
            firstName,
            secondName,
            lastName,
            middleName,
            (birthDate as Date).toISOString().split('T')[0],
            placeOfBirth,
            martialStatus,
            address,
            phone,
            eps,
            email,
            city,
            userId,
            practiceId,
            program,
            modality,
            practiceApplication ?? undefined
        )
    }

}