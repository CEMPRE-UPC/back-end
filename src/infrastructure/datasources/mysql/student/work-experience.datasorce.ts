import { WorkExperienceModel } from '../../../../data/mysqldb';
import { CustomError, IWorkExperienceDataSource, OptionalWorkExperienceDto, WorkExperienceDto, WorkExperienceEntity } from '../../../../domain';
import { WorkExperienceMapper } from '../../../mappers';


export class WorkExperienceDataSource implements IWorkExperienceDataSource {


    async register(workExperienceDto: WorkExperienceDto): Promise<WorkExperienceEntity> {
        

        const { company, position, functions, start_date, end_date, studentId} = workExperienceDto;

        try {

            const workExperience = WorkExperienceModel.build({
                company,
                position,
                functions,
                start_date,
                end_date,
                studentId
            });

            const savedWorkExperience = await workExperience.save();

            return WorkExperienceMapper.workExperienceEntityFromObject(savedWorkExperience);

        } catch (error) {
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    async update(optWorkExperienceDto: OptionalWorkExperienceDto): Promise<boolean> {
        
        const { id, company, position, functions, start_date, end_date, studentId } = optWorkExperienceDto;
        

        try {

            const exist = await WorkExperienceModel.findOne({ where: { id, studentId } });

            if(!exist) {
                throw CustomError.notFound('Work experience not found');
            }
            
            const workExperience = await WorkExperienceModel.update({
                company,
                position,
                functions,
                start_date,
                end_date
            }, { where: { id, studentId } });

            console.log(workExperience.at(0));
            

            return workExperience.at(0) === 1;

        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
            
        }
    }
    async getByIdStudent(studentId: string): Promise<WorkExperienceEntity[] | null> {
        
        try {
            
            const workExperiences = await WorkExperienceModel.findAll({ where: { studentId } });

            if(!workExperiences) {
                return null;
            }

            return workExperiences.map(workExperience => WorkExperienceMapper.workExperienceEntityFromObject(workExperience));

        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
            
        }
    }

}