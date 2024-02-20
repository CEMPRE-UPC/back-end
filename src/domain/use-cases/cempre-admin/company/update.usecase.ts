import { OptionalCompanyDto } from '../../../dtos';
import { ICompanyRepository } from '../../../repositories';


interface ICompanyUseCase {
    execute(optCompany: OptionalCompanyDto): Promise<boolean>;
}

export class UpdateCompanyUseCase implements ICompanyUseCase {

    constructor(
        private readonly CompanyRepository: ICompanyRepository
    ) {}

    async execute(optCompany: OptionalCompanyDto): Promise<boolean> {
        return await this.CompanyRepository.update(optCompany);
    }

}