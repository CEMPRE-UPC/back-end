import { CustomError, IProjectsRepository, ProjectsEntity } from '../../../domain';
import { ProjectsDto, OptionalProjectsDto } from '../../../domain/dtos/student/projects';


export class ProjectsRepository implements IProjectsRepository {

    constructor(
        private readonly projectsRepository: IProjectsRepository
    ) {}


    register(projectsDto: ProjectsDto): Promise<ProjectsEntity> {
       return this.projectsRepository.register(projectsDto);
    }
    update(optProjectsDto: OptionalProjectsDto): Promise<boolean> {
        return this.projectsRepository.update(optProjectsDto);
    }
    getByStudentId(studentId: string): Promise<ProjectsEntity[] | null> {

        if(!studentId) throw CustomError.badRequest('Missing student id');

        return this.projectsRepository.getByStudentId(studentId);
    }
}