import { ProjectsEntity } from '../../../entities';
import { CustomError } from '../../../errors';
import { IProjectsRepository } from '../../../repositories';


interface IGetProjectsUseCase {
    execute(id: string): Promise<ProjectsEntity | null>
}

export class GetProjectById implements IGetProjectsUseCase {

    constructor(
        private readonly projectsRepository: IProjectsRepository
    ) { }

    async execute(id: string): Promise<ProjectsEntity | null> {

        if ( !id ) throw CustomError.badRequest('Id is required');
        
        return await this.projectsRepository.getById(id);
    }

}