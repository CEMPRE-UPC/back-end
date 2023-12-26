import { SeminarsOrCoursesModel } from '../../../../data/mysqldb';
import { SeminarsOrCoursesDto, SeminarsOrCoursesEntity, OptionalSeminarsOrCoursesDto, CustomError } from '../../../../domain';
import { ISeminarsOrCoursesDataSource } from '../../../../domain/datasources/student/seminars-courses.datasource';
import { SeminarsOrCoursesMapper } from '../../../mappers/student/seminars-courses';



export class SeminarsOrCoursesDataSource implements ISeminarsOrCoursesDataSource {
    
    
    
    async register(seminarsOrCoursesDto: SeminarsOrCoursesDto): Promise<SeminarsOrCoursesEntity> {

        const { topic, institution, date, studentId } = seminarsOrCoursesDto;

        try {

            const seminarOrCourse =  SeminarsOrCoursesModel.build({
                topic,
                institution,
                date,
                studentId
            });

            const savedSeminarOrCourse = await seminarOrCourse.save();

            return SeminarsOrCoursesMapper.seminarsOrCoursesEntityFromObject(savedSeminarOrCourse.toJSON());
            
        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();

        }
    }


    async update(optSeminarOrCourses: OptionalSeminarsOrCoursesDto): Promise<boolean> {
        
        const { id, topic, institution, date, studentId } = optSeminarOrCourses;

        try {
            
            const exist = await SeminarsOrCoursesModel.findOne({ where: { id, studentId } });

            if(!exist) {
                throw CustomError.notFound('Seminar or course not found');
            }

            const seminarOrCourse = await SeminarsOrCoursesModel.update({
                topic,
                institution,
                date
            }, { where: { id, studentId } });

            return seminarOrCourse.at(0) === 1;
        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    async getByIdStudent(idStudent: string): Promise<SeminarsOrCoursesEntity[] | null> {

        try {

            const seminarsOrCourses = await SeminarsOrCoursesModel.findAll({ where: { studentId: idStudent } });

            if(!seminarsOrCourses) return null;

            return seminarsOrCourses.map(SeminarsOrCoursesMapper.seminarsOrCoursesEntityFromObject);

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

            const seminarOrCourse = await SeminarsOrCoursesModel.destroy({ where: { id } });

            return seminarOrCourse === 1;

        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }

}