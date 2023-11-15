import { ProjectsEntity } from '../../../entities';
import { IProjectsRepository} from '../../../repositories';


interface IProjects {
    execute( studentId: string): Promise<ProjectsEntity[] | null>
}

export class GetProjectsUseCase implements IProjects {

    constructor(
        private readonly projectsRepository: IProjectsRepository
    ) {}

    async execute(studentId: string): Promise<ProjectsEntity[] | null> {

        if(!studentId) {
            throw new Error('Student id must be provided');
        }

        return await this.projectsRepository.getByStudentId(studentId);
    }

}