import { OptionalProjectsDto, ProjectsDto } from '../../dtos/student/projects'
import { ProjectsEntity } from '../../entities'


export interface IProjectsRepository {

    register(projectsDto: ProjectsDto): Promise<ProjectsEntity>

    update(optProjectsDto: OptionalProjectsDto): Promise<boolean>

    getByStudentId(studentId: string): Promise<ProjectsEntity[] | null>

    delete(id: string): Promise<boolean>

}