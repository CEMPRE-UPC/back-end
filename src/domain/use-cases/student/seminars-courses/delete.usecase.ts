import { CustomError } from '../../../errors';
import { ISeminarsOrCoursesRepository } from '../../../repositories';


interface ISeminarsOrCourses {
    execute(id: string): Promise<boolean>
}

export class DeleteUseCase implements ISeminarsOrCourses {


    constructor(
        private readonly seminarsOrCoursesRepository: ISeminarsOrCoursesRepository
    ) { }

    async execute(id: string): Promise<boolean> {

        if (!id) throw CustomError.badRequest("Id is required");
       
        return await this.seminarsOrCoursesRepository.delete(id);
    }
}