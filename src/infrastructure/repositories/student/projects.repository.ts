import { CustomError, IProjectsDataSource, IProjectsRepository, ProjectsEntity } from '../../../domain';
import { ProjectsDto, OptionalProjectsDto } from '../../../domain/dtos/student/projects';


export class ProjectsRepository implements IProjectsRepository {

    constructor(
        private readonly projectsDatasource: IProjectsDataSource
    ) {}


    register(projectsDto: ProjectsDto): Promise<ProjectsEntity> {
       return this.projectsDatasource.register(projectsDto);
    }
    update(optProjectsDto: OptionalProjectsDto): Promise<boolean> {
        return this.projectsDatasource.update(optProjectsDto);
    }
    getByStudentId(studentId: string): Promise<ProjectsEntity[] | null> {

        if(!studentId) throw CustomError.badRequest('Missing student id');

        return this.projectsDatasource.getByStudentId(studentId);
    }
}