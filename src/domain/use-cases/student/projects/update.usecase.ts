import { OptionalProjectsDto, ProjectsDto } from '../../../dtos/student/projects';
import { IProjectsRepository } from '../../../repositories';


interface IProjects {
    execute(optProjectsDto: OptionalProjectsDto): Promise<boolean>
}

export class UpdateUseCase implements IProjects {


    constructor(
        private readonly projectsRepository: IProjectsRepository
    ) { }


    async execute(optProjectsDto: OptionalProjectsDto): Promise<boolean> {
       
        return await this.projectsRepository.update(optProjectsDto);
    }
}