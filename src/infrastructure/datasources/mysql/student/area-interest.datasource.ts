import { AreaInterestDto } from './../../../../domain/dtos/student/area-interest';
import { AreaInterestEntity, CustomError, IAreaInterestDataSource, OptionalAreaInterestDto } from '../../../../domain';
import { AreaInterestModel } from '../../../../data/mysqldb';
import { AreaInterestMapper } from '../../../mappers';



export class AreaInterestDataSource implements IAreaInterestDataSource {
    async register(areaInterestDto: AreaInterestDto): Promise<AreaInterestEntity[]> {

        const { descriptions, studentId } = areaInterestDto;

        // map dto to json
        const areaInterestJson = descriptions.map(description => {
            return {
                description,
                studentId
            }
        });

        console.log(areaInterestJson);
        

        try {

            const savedAreaInterest = await AreaInterestModel
            .bulkCreate(areaInterestJson);

            console.log(savedAreaInterest);
            

            return  savedAreaInterest.map(AreaInterestMapper.areaInterestEntityFromObject);
            
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
    async getByStudentId(studentId: string): Promise<AreaInterestEntity[] | null> {
        try {

            const areaInterest = await AreaInterestModel.findAll({ where: { studentId } });

            if (!areaInterest)  return null;

            return areaInterest.map(AreaInterestMapper.areaInterestEntityFromObject);
            
        } catch (error) {
         
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
        


}