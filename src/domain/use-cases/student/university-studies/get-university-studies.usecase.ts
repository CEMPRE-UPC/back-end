
import { UniversityStudiesEntity } from '../../../entities';
import { CustomError } from '../../../errors';
import { IUniversityStudiesRepository } from '../../../repositories';



interface IUniversityStudies {
    execute(studentId: string): Promise<UniversityStudiesEntity[] | null>
}

export class GetByStudentIdUseCase implements IUniversityStudies {


    constructor(
        private readonly universityStudiesRepository: IUniversityStudiesRepository
    ) { }


    async execute(studentid: string): Promise<UniversityStudiesEntity[] | null> {

        if (!studentid) throw CustomError.badRequest('Student id is required');
       
        return await this.universityStudiesRepository.getByIdStudent( studentid );
    }
}