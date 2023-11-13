
import { IUniversityStudiesRepository } from '../../../repositories';
import { OptionalUniversityStudiesDto } from '../../../dtos/student/university-studies';


interface IUniversityStudies {
    execute(optUniversityStudiesDto: OptionalUniversityStudiesDto): Promise<boolean>
}

export class UpdateUseCase implements IUniversityStudies {

    constructor(
        private readonly universityStudiesRepository: IUniversityStudiesRepository
    ) { }


    async execute(optUniversityStudiesDto: OptionalUniversityStudiesDto): Promise<boolean> {
       
        return await this.universityStudiesRepository.update(optUniversityStudiesDto);
    }
}