
import { AppliedStudiesEntity } from '../../../entities';
import { IAppliedStudiesRepository } from '../../../repositories';
import { AppliedStudiesDto } from '../../../dtos/student/applied-studies';


interface IAppliedStudies {
    execute(appliedStudiesDto: AppliedStudiesDto): Promise<AppliedStudiesEntity>
}

export class RegisterUseCase implements IAppliedStudies {


    constructor(
        private readonly appliedStudiesRepository: IAppliedStudiesRepository
    ) { }

    async execute(appliedStudiesDto: AppliedStudiesDto): Promise<AppliedStudiesEntity> {
       
        return await this.appliedStudiesRepository.register(appliedStudiesDto);
    }
}