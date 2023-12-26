import { CustomError } from '../../../errors';
import { IUniversityStudiesRepository } from '../../../repositories';


interface IUniversityStudies {
    execute(id: string): Promise<boolean>
}

export class DeleteUseCase implements IUniversityStudies {


    constructor(
        private readonly universityStudiesRepository: IUniversityStudiesRepository
    ) { }

    async execute(id: string): Promise<boolean> {

        if (!id) throw CustomError.badRequest("Id is required");
       
        return await this.universityStudiesRepository.delete(id);
    }
}