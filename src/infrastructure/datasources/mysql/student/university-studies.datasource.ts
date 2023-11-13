import { UniversityStudiesModel } from '../../../../data/mysqldb';
import { CustomError, IUniversityStudiesDataSource, UniversityStudiesEntity, UniversityStudiesDto, OptionalUniversityStudiesDto} from '../../../../domain';
import { UniversityStudiesMapper } from '../../../mappers';



export class UniversityStudiesDataSource implements IUniversityStudiesDataSource {


    async register(universityStudiesDto: UniversityStudiesDto): Promise<UniversityStudiesEntity> {
       
        const {  institution, program, semester, studentId } = universityStudiesDto;

        try {
            
            const universityStudies = UniversityStudiesModel.build({
                institution,
                program,
                semester,
                studentId
            });

            const savedUniversityStudies = await universityStudies.save();

            return UniversityStudiesMapper.universityStudiesEntityFromObject(savedUniversityStudies);

        } catch (error) {
            
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    async update(optUniversityStudiesDto: OptionalUniversityStudiesDto): Promise<boolean> {
        const { id, institution, program, semester, studentId } = optUniversityStudiesDto;

        try {
            
            const exist = await UniversityStudiesModel.findOne({ where: { id, studentId } });

            if(!exist) {
                throw CustomError.notFound('University studies not found');
            }

            const universityStudies = await UniversityStudiesModel.update({
                institution,
                program,
                semester
            }, { where: { id, studentId } });

            return universityStudies.at(0) === 1;
        } catch (error) {
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    async getByIdStudent(studentId: string): Promise<UniversityStudiesEntity[] | null> {
        try {
            
            const universityStudies = await UniversityStudiesModel.findAll({ where: { studentId } });

            if(!universityStudies) {
                return null;
            }

            return universityStudies.map(UniversityStudiesMapper.universityStudiesEntityFromObject);

        } catch (error) {
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }


}