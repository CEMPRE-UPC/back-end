import { OptionalWorkExperienceDto } from '../../../dtos';
import { IWorkExperienceRepository } from '../../../repositories';


interface IWorkExperience {
    execute(optWorkExperience: OptionalWorkExperienceDto): Promise<boolean>;
}

export class UpdateWorkExperienceUseCase implements IWorkExperience {

    constructor(
        private readonly workExperienceRepository: IWorkExperienceRepository
    ) {}

    async execute(optWorkExperience: OptionalWorkExperienceDto): Promise<boolean> {
        return await this.workExperienceRepository.update(optWorkExperience);
    }

}