import { WorkExperienceEntity } from '../../../entities';
import { IWorkExperienceRepository } from '../../../repositories';


interface IExperiencesUseCase {
    execute( studentId: string): Promise<WorkExperienceEntity[] | null>
}

export class GetWorkExperiencesUseCase implements IExperiencesUseCase {

    constructor(
        private readonly workExperienceRepository: IWorkExperienceRepository
    ) {}

    async execute(studentId: string): Promise<WorkExperienceEntity[] | null> {

        if(!studentId) {
            throw new Error('Student id must be provided');
        }

        return await this.workExperienceRepository.getByIdStudent(studentId);
    }

}