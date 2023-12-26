import { AppliedStudiesDto, AppliedStudiesEntity, IAppliedStudiesDataSource, IAppliedStudiesRepository, OptionalAppliedStudiesDto } from '../../../domain';


export class AppliedStudiesRepository implements IAppliedStudiesRepository {
    
    constructor(
        private readonly dataSource: IAppliedStudiesDataSource
    
    ) {}
    
    register(appliedStudiesDto: AppliedStudiesDto): Promise<AppliedStudiesEntity> {
        return this.dataSource.register(appliedStudiesDto);
    }
    update(optAppliedStudiesDto: OptionalAppliedStudiesDto): Promise<boolean> {
        return this.dataSource.update(optAppliedStudiesDto);
    }
    getByIdStudent(studentId: string): Promise<AppliedStudiesEntity[] | null> {
        return this.dataSource.getByIdStudent(studentId);
    }
    delete(id: string): Promise<boolean> {
        return this.dataSource.delete(id);
    }

}