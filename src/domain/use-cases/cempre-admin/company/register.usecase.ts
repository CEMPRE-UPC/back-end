
import { CompanyDto } from '../../../dtos/cempre-admin/company.dto';
import { CompanyEntity } from '../../../entities';
import { ICompanyRepository } from '../../../repositories';


interface ICompanyUseCase {
    execute(companyDto: CompanyDto): Promise<CompanyEntity>
}

export class RegisterUseCase implements ICompanyUseCase {


    constructor(
        private readonly CompanyRepository: ICompanyRepository
    ) { }


    async execute(CompanyDto: CompanyDto): Promise<CompanyEntity> {
       
       
        return await this.CompanyRepository.register(CompanyDto);
    }
}