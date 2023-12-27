import { AppliedStudiesModel } from '../../../../data/mysqldb';
import { AppliedStudiesEntity, CustomError, IAppliedStudiesDataSource } from '../../../../domain';
import { AppliedStudiesDto, OptionalAppliedStudiesDto } from '../../../../domain/dtos/student/applied-studies';
import { AppliedStudiesMapper } from '../../../mappers';

export class AppliedStudiesDataSource implements IAppliedStudiesDataSource {


    async register(appliedStudiesDto: AppliedStudiesDto): Promise<AppliedStudiesEntity> {
       
        const { level, institution, collegeDegree, date, studentId  } = appliedStudiesDto;

        try {
            
            const appliedStudies = AppliedStudiesModel.build({
                level,
                institution,
                collegeDegree,
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
        const { id, level, institution, collegeDegree, date, studentId  } = optAppliedStudiesDto;


        try {
            
            const exist = await AppliedStudiesModel.findOne({ where: { id, studentId } });

            if(!exist) {
                throw CustomError.notFound('University studies not found');
            }

            const appliedStudies = await AppliedStudiesModel.update({
                level,
                institution,
                collegeDegree,
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

    async getById( id: string ): Promise<AppliedStudiesEntity | null> {

        console.log(id);
        
        try {
            
            const appliedStudies = await AppliedStudiesModel.findByPk(id);

            if(!appliedStudies) {
                return null;
            }

            return AppliedStudiesMapper.appliedStudiesEntityFromObject(appliedStudies);

        } catch (error) {
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }

    async delete( id: string ): Promise<boolean> {
        try {
            
            const deleted = await AppliedStudiesModel.destroy({ where: { id } });

            return deleted === 1;

        } catch (error) {
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    


}