import { AreaInterestDto } from './../../../../domain/dtos/student/area-interest';
import { AreaInterestEntity, CustomError, IAreaInterestDataSource, OptionalAreaInterestDto } from '../../../../domain';
import { AreaInterestModel } from '../../../../data/mysqldb';
import { AreaInterestMapper } from '../../../mappers';



export class AreaInterestDataSource implements IAreaInterestDataSource {
    async register(areaInterestDto: AreaInterestDto): Promise<AreaInterestEntity> {

        const { description, studentId } = areaInterestDto;

        try {

            const areaInterest = AreaInterestModel.build({
                description,
                studentId
            });

            const savedAreaInterest = await areaInterest.save();

            return AreaInterestMapper.areaInterestEntityFromObject(savedAreaInterest.toJSON());
            
        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
            
        }
    }
    async update(optAreaInterestDto: OptionalAreaInterestDto): Promise<boolean> {
        
        const {  id, description, studentId } =  optAreaInterestDto;

        try {

            const exist = await AreaInterestModel.findOne({ where: { id, studentId } });

            if (!exist) {
                throw CustomError.notFound('not found area interest');
            }

            const areaInterest = await AreaInterestModel.update({
                description
            }, { where: { id, studentId }})

            return areaInterest.at(0) === 1;

        } catch (error) {
            
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    async getByStudentId(studentId: string): Promise<AreaInterestEntity | null> {
        try {

            const areaInterest = await AreaInterestModel.findOne({ where: { studentId } });

            if (!areaInterest)  return null;

            return AreaInterestMapper.areaInterestEntityFromObject(areaInterest.toJSON());
            
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

            const deleted = await AreaInterestModel.destroy({ where: { id } });

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