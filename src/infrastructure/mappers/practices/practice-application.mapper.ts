import { ObservationModel } from '../../../data/mysqldb';
import { CustomError, PracticeApplicationEntity } from '../../../domain';
import { ObservationMapper } from './observation.mapper';


export class PracticeApplicationMapper {


    
    static practiceApplicationEntityFromObject(object: { [key: string]: any }): PracticeApplicationEntity {


        const observations = object?.ObservationModels ? object?.ObservationModels.map((observation: ObservationModel) => ObservationMapper.observationEntityFromObject(observation)) : null;
        
        const { id, _id,
            studentId,
            identificationFile,
            photoFile,
            classScheduleFile,
            epsFile,
            graduationCertificateFile,
            companyRequestLetterFile,
            event,
            statusCempre,
            statusProgram,
            statusFaculty,
            createdAt,
            updatedAt
        } = object;

        if (!id && !_id) throw CustomError.badRequest('Id is required');
        if (!studentId) throw CustomError.badRequest('Student id is required');

        if (identificationFile === null) throw CustomError.badRequest('Identification file is required');
        if (photoFile === null) throw CustomError.badRequest('Photo file is required');
        if (classScheduleFile === null) throw CustomError.badRequest('Class schedule file is required');
        if (epsFile === null) throw CustomError.badRequest('EPS file is required');
        if (graduationCertificateFile === null) throw CustomError.badRequest('Graduation certificate file is required');
        if (companyRequestLetterFile === null) throw CustomError.badRequest('Company request letter file is required');

        if (!event) throw CustomError.badRequest('Event is required');
        if (!statusCempre) throw CustomError.badRequest('Status Cempre is required');
        if (!statusProgram) throw CustomError.badRequest('Status Program is required');
        if (!statusFaculty) throw CustomError.badRequest('Status Faculty is required');
        if (!createdAt) throw CustomError.badRequest('Created at is required');
        if (!updatedAt) throw CustomError.badRequest('Updated at is required');


            return new PracticeApplicationEntity(
                id || _id,
                identificationFile,
                photoFile,
                classScheduleFile,
                epsFile,
                graduationCertificateFile,
                companyRequestLetterFile,
                event,
                statusCempre,
                statusProgram,
                statusFaculty,
                observations,
                createdAt,
                updatedAt,
                studentId
            )
    }
}