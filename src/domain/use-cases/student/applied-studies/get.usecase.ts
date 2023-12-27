
import { AppliedStudiesEntity } from '../../../entities';
import { CustomError } from '../../../errors';
import { IAppliedStudiesRepository } from '../../../repositories';


interface IAppliedStudies {
    execute(id: string): Promise<AppliedStudiesEntity | null>
}

export class GetByIdUseCase implements IAppliedStudies {

    constructor(
        private readonly appliedStudiesRepository: IAppliedStudiesRepository
    ) { }

    async execute(id: string): Promise<AppliedStudiesEntity | null> {

        if( !id ) throw CustomError.badRequest('Id is required');
       
        return await this.appliedStudiesRepository.getById(id);
    }
}