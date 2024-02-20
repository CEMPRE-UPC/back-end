import { CustomError } from '../../../errors';
import { ICompanyRepository } from '../../../repositories';


interface ICompanyUseCase {
    execute(id: string): Promise<boolean>
}

export class DeleteCompanyUseCase implements ICompanyUseCase {


    constructor(
        private readonly companyRepository: ICompanyRepository
    ) { }

    async execute(id: string): Promise<boolean> {

        if (!id) throw CustomError.badRequest("Id is required");
       
        return await this.companyRepository.delete(id);
    }
}