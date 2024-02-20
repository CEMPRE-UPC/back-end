import { CompanyEntity } from '../../../entities';
import { ICompanyRepository } from '../../../repositories';


interface ICompanyUseCase {
    execute(): Promise<CompanyEntity[] | null>
}

export class GetAllCompaniesUseCase implements ICompanyUseCase {

    constructor(
        private readonly companyRepository: ICompanyRepository
    ) {}

    async execute(): Promise<CompanyEntity[] | null> {

        return await this.companyRepository.getAllCompanies();
    }

}