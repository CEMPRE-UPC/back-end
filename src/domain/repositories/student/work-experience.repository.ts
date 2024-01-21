import { OptionalWorkExperienceDto, WorkExperienceDto } from '../../dtos'
import { WorkExperienceEntity } from '../../entities'


export interface IWorkExperienceRepository {

    register(workExperienceDto: WorkExperienceDto): Promise<WorkExperienceEntity>

    update(optWorkExperienceDto: OptionalWorkExperienceDto): Promise<boolean>

    getByIdStudent(studentId: string): Promise<WorkExperienceEntity[] | null>

    getById(id: string): Promise<WorkExperienceEntity | null>

    delete(id: string): Promise<boolean>

}