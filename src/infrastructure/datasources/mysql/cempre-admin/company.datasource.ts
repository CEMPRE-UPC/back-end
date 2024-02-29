


import { CompanyModel } from '../../../../data/mysqldb';
import { CustomError, ICompanyDataSource, OptionalCompanyDto, CompanyDto, CompanyEntity } from '../../../../domain';
import { CompanyMapper } from '../../../mappers';


export class CompanyDataSource implements ICompanyDataSource {


    async register(CompanyDto: CompanyDto): Promise<CompanyEntity> {
        

        const { name, startDate, endDate} = CompanyDto;

        try {

            const Company = CompanyModel.build({
                name,
                startDate,
                endDate,
            });

            const savedCompany = await Company.save();

            return CompanyMapper.CompanyEntityFromObject(savedCompany);

        } catch (error) {
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    async update(optCompanyDto: OptionalCompanyDto): Promise<boolean> {
        
        const { id, name, startDate, endDate } = optCompanyDto;
        

        try {

            const exist = await CompanyModel.findOne({ where: { id } });

            if(!exist) {
                throw CustomError.notFound('Company not found');
            }
            
            const Company = await CompanyModel.update({
                name,
                startDate,
                endDate
            }, { where: { id } });

            console.log(Company.at(0));
            

            return Company.at(0) === 1;

        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
            
        }
    }
    

    async getById(id: string): Promise<CompanyEntity | null> {
            
            try {
                
                const Company = await CompanyModel.findByPk( id );
    
                if(!Company) {
                    return null;
                }
    
                return CompanyMapper.CompanyEntityFromObject(Company);
    
            } catch (error) {
    
                if(error instanceof CustomError) {
                    throw error;
                }
                console.log(error);
                throw CustomError.internalServer();
                
            }
    }
    async getAllCompanies(): Promise<CompanyEntity[] | null> {

        try {
            
            const companies = await CompanyModel.findAll();

            if(!companies) {
                console.log('No companies found');
                
                return null;
            }

            return companies.map(company => CompanyMapper.CompanyEntityFromObject(company));

        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
            
        }
    }

    async delete(id: string): Promise<boolean> {
        try {

            const Company = await CompanyModel.destroy({ where: { id } });

            return Company === 1;

        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
            
        }
    }

}