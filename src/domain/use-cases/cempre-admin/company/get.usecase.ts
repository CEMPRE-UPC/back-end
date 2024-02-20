import { CompanyEntity } from '../../../entities';
import { CustomError } from '../../../errors';
import { ICompanyRepository } from '../../../repositories';

interface ICompanyUseCase {
    execute(id: string): Promise<CompanyEntity | null>
}


export class GetCompanyById implements ICompanyUseCase {

    constructor(
        private readonly companyRespository: ICompanyRepository
    ) { }

    async execute(id: string): Promise<CompanyEntity | null> {

        if (!id) throw CustomError.badRequest('Id is required');
        
        return await this.companyRespository.getById(id);
    }

}