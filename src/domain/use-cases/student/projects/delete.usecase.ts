import { CustomError } from '../../../errors';
import { IProjectsRepository } from '../../../repositories';


interface IProjects {
    execute(id: string): Promise<boolean>
}

export class DeleteUseCase implements IProjects {


    constructor(
        private readonly projectsRepository: IProjectsRepository
    ) { }

    async execute(id: string): Promise<boolean> {

        if (!id) throw CustomError.badRequest("Id is required");
       
        return await this.projectsRepository.delete(id);
    }
}