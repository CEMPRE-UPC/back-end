
import { WorkExperienceDto } from '../../../dtos/student/work-experience';
import { WorkExperienceEntity } from '../../../entities';
import { IWorkExperienceRepository } from '../../../repositories';


interface IWorkExperience {
    execute(workExperienceDto: WorkExperienceDto): Promise<WorkExperienceEntity>
}

export class RegisterUseCase implements IWorkExperience {


    constructor(
        private readonly workExperienceRepository: IWorkExperienceRepository
    ) { }


    async execute(workExperienceDto: WorkExperienceDto): Promise<WorkExperienceEntity> {
       
       
        return await this.workExperienceRepository.register(workExperienceDto);
    }
}