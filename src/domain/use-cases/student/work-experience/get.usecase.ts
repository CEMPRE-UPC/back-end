import { WorkExperienceEntity } from '../../../entities';
import { CustomError } from '../../../errors';
import { IWorkExperienceRepository } from '../../../repositories';

interface IGetExperienceUseCase {
    execute(id: string): Promise<WorkExperienceEntity | null>
}


export class GetExperienceById implements IGetExperienceUseCase {

    constructor(
        private readonly _workExperienceRepository: IWorkExperienceRepository
    ) { }

    async execute(id: string): Promise<WorkExperienceEntity | null> {

        if (!id) throw CustomError.badRequest('Id is required');
        
        return await this._workExperienceRepository.getById(id);
    }

}