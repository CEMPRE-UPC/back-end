import { CustomError } from '../../../errors';
import { IAppliedStudiesRepository } from '../../../repositories';


interface IAppliedStudies {
    execute(id: string): Promise<boolean>
}

export class DeleteUseCase implements IAppliedStudies {


    constructor(
        private readonly appliedStudiesRepository: IAppliedStudiesRepository
    ) { }

    async execute(id: string): Promise<boolean> {

        if (!id) throw CustomError.badRequest("Id is required");
       
        return await this.appliedStudiesRepository.delete(id);
    }
}