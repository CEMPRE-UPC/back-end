import { CustomError } from '../../../errors';
import { IAreaInterestRepository } from '../../../repositories';


interface IAreaInterest {
    execute(id: string): Promise<boolean>
}

export class DeleteUseCase implements IAreaInterest {


    constructor(
        private readonly areaInterestRepository: IAreaInterestRepository
    ) { }

    async execute(id: string): Promise<boolean> {

        if (!id) throw CustomError.badRequest("Id is required");
       
        return await this.areaInterestRepository.delete(id);
    }
}