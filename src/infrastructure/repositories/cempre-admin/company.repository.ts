import { CompanyDto, CompanyEntity, ICompanyDataSource, ICompanyRepository, OptionalCompanyDto } from '../../../domain';


export class CompanyRespository implements ICompanyRepository {
    
    constructor(
        private readonly dataSource: ICompanyDataSource
    
    ) {}
    register(registerCompanyDto: CompanyDto): Promise<CompanyEntity> {
        return this.dataSource.register(registerCompanyDto);
    }
    update(optCompanyDto: OptionalCompanyDto): Promise<boolean> {
        return this.dataSource.update(optCompanyDto);
    }
    getById(id: string): Promise<CompanyEntity | null> {
        return this.dataSource.getById(id);
    }
    delete(id: string): Promise<boolean> {
        return this.dataSource.delete(id);
    }
    getAllCompanies(): Promise<CompanyEntity[] | null> {
        return this.dataSource.getAllCompanies();
    }
    


}