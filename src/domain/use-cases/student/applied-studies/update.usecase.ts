
import { IAppliedStudiesRepository } from '../../../repositories';
import { OptionalAppliedStudiesDto } from '../../../dtos';


interface IAppliedStudies {
    execute(optAppliedStudies: OptionalAppliedStudiesDto): Promise<boolean>
}

export class UpdateUseCase implements IAppliedStudies {

    constructor(
        private readonly appliedStudiesRepository: IAppliedStudiesRepository
    ) { }

    async execute(optAppliedStudies: OptionalAppliedStudiesDto): Promise<boolean> {
       
        return await this.appliedStudiesRepository.update(optAppliedStudies);
    }
}