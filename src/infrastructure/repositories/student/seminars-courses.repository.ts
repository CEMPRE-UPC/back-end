import { 
    ISeminarsOrCoursesDataSource, 
    ISeminarsOrCoursesRepository, 
    OptionalSeminarsOrCoursesDto, 
    SeminarsOrCoursesDto, 
    SeminarsOrCoursesEntity 
} from '../../../domain';



export class SeminarsOrCoursesRepository implements ISeminarsOrCoursesRepository {
    
    constructor(
        private readonly seminarsOrCoursesDataSource: ISeminarsOrCoursesDataSource
    ) {}
    
    
    register(seminarsOrCoursesDto: SeminarsOrCoursesDto): Promise<SeminarsOrCoursesEntity> {
        return this.seminarsOrCoursesDataSource.register(seminarsOrCoursesDto);
    }
    update(optSeminarsOrCoursesDto: OptionalSeminarsOrCoursesDto): Promise<boolean> {
        return this.seminarsOrCoursesDataSource.update(optSeminarsOrCoursesDto);
    }
    getByIdStudent(studentId: string): Promise<SeminarsOrCoursesEntity[] | null> {
        return this.seminarsOrCoursesDataSource.getByIdStudent(studentId);
    }

}