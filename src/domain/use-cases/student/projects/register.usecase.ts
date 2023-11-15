import { ProjectsDto } from '../../../dtos/student/projects';
import { ProjectsEntity } from '../../../entities';
import { IProjectsRepository } from '../../../repositories';


interface IProjects {
    execute(projectsDto: ProjectsDto): Promise<ProjectsEntity>
}

export class RegisterUseCase implements IProjects {


    constructor(
        private readonly projectsRepository: IProjectsRepository
    ) { }


    async execute(projectsDto: ProjectsDto): Promise<ProjectsEntity> {
       
        return await this.projectsRepository.register(projectsDto);
    }
}