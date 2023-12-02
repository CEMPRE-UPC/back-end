
import { OptionalSeminarsOrCoursesDto } from '../../../dtos/student';
import { ISeminarsOrCoursesRepository } from '../../../repositories';


interface ISeminarsOrCourses {
    execute(optUniversityStudiesDto: OptionalSeminarsOrCoursesDto): Promise<boolean>
}

export class UpdateUseCase implements ISeminarsOrCourses {

    constructor(
        private readonly seminarsOrCoursesRepository: ISeminarsOrCoursesRepository
    ) { }


    async execute(optUniversityStudiesDto: OptionalSeminarsOrCoursesDto): Promise<boolean> {
       
        return await this.seminarsOrCoursesRepository.update(optUniversityStudiesDto);
    }
}