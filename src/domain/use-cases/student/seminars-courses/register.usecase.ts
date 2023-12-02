
import { SeminarsOrCoursesEntity } from '../../../entities';
import { ISeminarsOrCoursesRepository } from '../../../repositories';

import { SeminarsOrCoursesDto } from '../../../dtos';


interface ISeminarsOrCourses {
    execute(seminarsOrCoursesDto: SeminarsOrCoursesDto): Promise<SeminarsOrCoursesEntity>
}

export class RegisterUseCase implements ISeminarsOrCourses {


    constructor(
        private readonly seminarsOrCoursesRepository: ISeminarsOrCoursesRepository
    ) { }


    async execute(seminarsOrCoursesDto: SeminarsOrCoursesDto): Promise<SeminarsOrCoursesEntity> {
       
        return await this.seminarsOrCoursesRepository.register(seminarsOrCoursesDto);
    }
}