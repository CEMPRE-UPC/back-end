import { AppliedStudiesModel } from '../../../../data/mysqldb';
import { AppliedStudiesEntity, CustomError, IAppliedStudiesDataSource } from '../../../../domain';
import { AppliedStudiesDto, OptionalAppliedStudiesDto } from '../../../../domain/dtos/student/applied-studies';
import { AppliedStudiesMapper } from '../../../mappers';

export class AppliedStudiesDataSource implements IAppliedStudiesDataSource {


    async register(appliedStudiesDto: AppliedStudiesDto): Promise<AppliedStudiesEntity> {
       
        const { level, institution, college_degree, date, studentId  } = appliedStudiesDto;

        try {
            
            const appliedStudies = AppliedStudiesModel.build({
                level,
                institution,
                college_degree,
                date,
                studentId
            });

            const savedAppliedStudies = await appliedStudies.save();

            return AppliedStudiesMapper.appliedStudiesEntityFromObject(savedAppliedStudies);

        } catch (error) {
            
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    async update(optAppliedStudiesDto: OptionalAppliedStudiesDto): Promise<boolean> {
        const { id, level, institution, college_degree, date, studentId  } = optAppliedStudiesDto;


        try {
            
            const exist = await AppliedStudiesModel.findOne({ where: { id, studentId } });

            if(!exist) {
                throw CustomError.notFound('University studies not found');
            }

            const appliedStudies = await AppliedStudiesModel.update({
                level,
                institution,
                college_degree,
                date,
            }, { where: { id, studentId } });

            return appliedStudies.at(0) === 1;
        } catch (error) {
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    async getByIdStudent(studentId: string): Promise<AppliedStudiesEntity[] | null> {
        try {
            
            const appliedStudies = await AppliedStudiesModel.findAll({ where: { studentId } });

            if(!appliedStudies) {
                return null;
            }

            return appliedStudies.map(AppliedStudiesMapper.appliedStudiesEntityFromObject);

        } catch (error) {
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }


}