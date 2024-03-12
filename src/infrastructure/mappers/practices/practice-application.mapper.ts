import { CustomError, PracticeApplicationEntity } from '../../../domain';


export class PracticeApplicationMapper {

    static practiceApplicationEntityFromObject(body: { [key: string]: any }): PracticeApplicationEntity {
        const { id, _id,
            studentId,
            identificationFile,
            photoFile,
            classScheduleFile,
            epsFile,
            graduationCertificateFile,
            companyRequestLetterFile,
            status,
            observation,
            createdAt,
            updatedAt
        } = body;

        if (!id && !_id) throw CustomError.badRequest('Id is required');
        if (!studentId) throw CustomError.badRequest('Student id is required');

        if (identificationFile === null) throw CustomError.badRequest('Identification file is required');
        if (photoFile === null) throw CustomError.badRequest('Photo file is required');
        if (classScheduleFile === null) throw CustomError.badRequest('Class schedule file is required');
        if (epsFile === null) throw CustomError.badRequest('EPS file is required');
        if (graduationCertificateFile === null) throw CustomError.badRequest('Graduation certificate file is required');
        if (companyRequestLetterFile === null) throw CustomError.badRequest('Company request letter file is required');

        if (!status) throw CustomError.badRequest('Status is required');
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
                status,
                observation,
                createdAt,
                updatedAt,
                studentId
            )
    }
}