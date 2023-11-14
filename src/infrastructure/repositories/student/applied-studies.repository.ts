import { AppliedStudiesDto, AppliedStudiesEntity, IAppliedStudiesDataSource, IAppliedStudiesRepository, OptionalAppliedStudiesDto } from '../../../domain';


export class AppliedStudiesRepository implements IAppliedStudiesRepository {
    
    constructor(
        private readonly dataSource: IAppliedStudiesDataSource
    
    ) {}
    
    async register(appliedStudiesDto: AppliedStudiesDto): Promise<AppliedStudiesEntity> {
        return await this.dataSource.register(appliedStudiesDto);
    }
    async update(optAppliedStudiesDto: OptionalAppliedStudiesDto): Promise<boolean> {
        return await this.dataSource.update(optAppliedStudiesDto);
    }
    async getByIdStudent(studentId: string): Promise<AppliedStudiesEntity[] | null> {
        return await this.dataSource.getByIdStudent(studentId);
    }

}