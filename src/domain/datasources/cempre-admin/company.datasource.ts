import { OptionalCompanyDto, CompanyDto } from '../../dtos';
import { CompanyEntity } from '../../entities';

export interface ICompanyDataSource {
    
    register( registerCompanyDto: CompanyDto): Promise<CompanyEntity>

    update(optCompanyDto: OptionalCompanyDto): Promise<boolean>

    getById(id: string): Promise<CompanyEntity | null>

    delete(id: string): Promise<boolean>

    getAllCompanies(): Promise<CompanyEntity[] | null>


}