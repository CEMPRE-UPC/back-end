import { OptionalWorkExperienceDto, WorkExperienceDto } from '../../dtos';
import { WorkExperienceEntity } from '../../entities';



export interface IWorkExperienceDataSource {

    register(workExperienceDto: WorkExperienceDto): Promise<WorkExperienceEntity>

    update(optWorkExperienceDto: OptionalWorkExperienceDto): Promise<boolean>

    getByIdStudent(studentId: string): Promise<WorkExperienceEntity[] | null>

}