import { CustomError } from '../../../errors';
import { IWorkExperienceRepository } from '../../../repositories';


interface IWorkExperience {
    execute(id: string): Promise<boolean>
}

export class DeleteUseCase implements IWorkExperience {


    constructor(
        private readonly workExperienceRepository: IWorkExperienceRepository
    ) { }

    async execute(id: string): Promise<boolean> {

        if (!id) throw CustomError.badRequest("Id is required");
       
        return await this.workExperienceRepository.delete(id);
    }
}