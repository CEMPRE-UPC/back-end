
import { UniversityStudiesEntity } from '../../../entities';
import { IUniversityStudiesRepository } from '../../../repositories';
import { UniversityStudiesDto } from '../../../dtos/student/university-studies';


interface IUniversityStudies {
    execute(universityStudiesDto: UniversityStudiesDto): Promise<UniversityStudiesEntity>
}

export class RegisterUseCase implements IUniversityStudies {


    constructor(
        private readonly universityStudiesRepository: IUniversityStudiesRepository
    ) { }


    async execute(universityStudiesDto: UniversityStudiesDto): Promise<UniversityStudiesEntity> {
       
        return await this.universityStudiesRepository.register(universityStudiesDto);
    }
}