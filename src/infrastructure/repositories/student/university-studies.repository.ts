import { 
    IUniversityStudiesDataSource, 
    IUniversityStudiesRepository, 
    OptionalUniversityStudiesDto,
    UniversityStudiesDto, 
    UniversityStudiesEntity
} from '../../../domain';


export class UniversityStudiesRepository implements IUniversityStudiesRepository {
    
    constructor(
        private readonly universityStudiesDataSource: IUniversityStudiesDataSource
    ) {}
    
    
    register(universityStudiesDto: UniversityStudiesDto): Promise<UniversityStudiesEntity> {
        return this.universityStudiesDataSource.register(universityStudiesDto);
    }
    update(optUniversityStudiesDto: OptionalUniversityStudiesDto): Promise<boolean> {
        return this.universityStudiesDataSource.update(optUniversityStudiesDto);
    }
    getByIdStudent(studentId: string): Promise<UniversityStudiesEntity | null> {
        return this.universityStudiesDataSource.getByIdStudent(studentId);
    }
    delete(id: string): Promise<boolean> {
        return this.universityStudiesDataSource.delete(id);
    }

}