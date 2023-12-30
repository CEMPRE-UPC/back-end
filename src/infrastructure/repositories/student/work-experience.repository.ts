import { IWorkExperienceDataSource, IWorkExperienceRepository, OptionalWorkExperienceDto, WorkExperienceDto, WorkExperienceEntity } from '../../../domain';


export class WorkExperienceRepository implements IWorkExperienceRepository {

    constructor(
        private readonly workExperienceDataSource: IWorkExperienceDataSource
    ) {}

    register(workExperienceDto: WorkExperienceDto): Promise<WorkExperienceEntity> {
        return this.workExperienceDataSource.register(workExperienceDto);
    }
    update(optWorkExperienceDto: OptionalWorkExperienceDto): Promise<boolean> {
        return this.workExperienceDataSource.update(optWorkExperienceDto);
    }
    getByIdStudent(studentId: string): Promise<WorkExperienceEntity[] | null> {
        return this.workExperienceDataSource.getByIdStudent(studentId);
    }
    getById(id: string): Promise<WorkExperienceEntity | null> {
        return this.workExperienceDataSource.getById(id);
    }
    delete(id: string): Promise<boolean> {
        return this.workExperienceDataSource.delete(id);
    }

}