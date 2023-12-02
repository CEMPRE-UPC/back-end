
import { SeminarsOrCoursesEntity } from '../../../entities';
import { ISeminarsOrCoursesRepository } from '../../../repositories';
import { CustomError } from '../../../errors';



interface ISeminarsOrCourses {
    execute(studentId: string): Promise<SeminarsOrCoursesEntity[] | null>
}

export class GetByStudentIdUseCase implements ISeminarsOrCourses {


    constructor(
        private readonly seminarsOrCoursesRepository: ISeminarsOrCoursesRepository
    ) { }


    async execute(studentid: string): Promise<SeminarsOrCoursesEntity[] | null> {

        if (!studentid) throw CustomError.badRequest('Student id is required');

        return await this.seminarsOrCoursesRepository.getByIdStudent(studentid);
    }
}