import { OptionalSeminarsOrCoursesDto, SeminarsOrCoursesDto } from '../../dtos';
import { SeminarsOrCoursesEntity } from '../../entities';



export interface ISeminarsOrCoursesRepository {

    register(seminarsOrCoursesDto: SeminarsOrCoursesDto): Promise<SeminarsOrCoursesEntity>;

    update(optSeminarOrCourses: OptionalSeminarsOrCoursesDto): Promise<boolean>;

    getByIdStudent(idStudent: string): Promise<SeminarsOrCoursesEntity[] | null>;
}