import { CustomError, StudentDto, StudentEntity, IStudentDataSource, OptionalStudentDto } from '../../../../domain';
import { StudentModel, UniversityStudiesModel } from '../../../../data/mysqldb';
import { SequelizeErrorMapper, StudentMapper } from '../../../mappers';
import { ValidationError } from 'sequelize';


export class StudentDataSource implements IStudentDataSource {
    
    
    async register(stundetDto: StudentDto): Promise<StudentEntity> {
        
        try {

            const exist = await StudentModel.findOne({ where: { cedula: stundetDto.cedula } });
            
            if (exist) throw CustomError.badRequest('Cedula already exists');
            
            const student = StudentModel.build(StudentDto.toJSON(stundetDto));
            
            await student.save();
            
            return StudentMapper.studentEntityFromObject(student.toJSON());

        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }
            if (error instanceof ValidationError) {
                const errors= SequelizeErrorMapper.customErrorFromObject(error);
                const { msg, field } = errors[0];
                throw CustomError.badRequest(`${msg} in field ${field}`);
            }
            console.log(error);
            throw CustomError.internalServer();
            
        }
    }
    
    async update( optStudentDto: OptionalStudentDto ): Promise<boolean> {
        
        const { cedula, ...studentObject} = OptionalStudentDto.toJSON(optStudentDto);
        
        console.log(studentObject);
        
        try {
            
            const affectedCount = await StudentModel.update(studentObject, { where: { cedula } });

            return affectedCount.at(0) === 1;

        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }
            if (error instanceof ValidationError) {
                const errors= SequelizeErrorMapper.customErrorFromObject(error);
                const { msg, field } = errors[0];
                throw CustomError.badRequest(`${msg} in field ${field}`);
            }
            
            console.log(error);
            throw CustomError.internalServer();
            
        }
    }

    async getStudentByIdUser(id: string): Promise<StudentEntity | null> {
        
        try {
            
            const student = await StudentModel.findOne({ where: { userId: id } });
            
            if(!student) return student;
            
            return StudentMapper.studentEntityFromObject(student.toJSON());

        } catch (error) {
            
            if (error instanceof CustomError) {
                throw error;
            }
            if (error instanceof ValidationError) {
                const errors= SequelizeErrorMapper.customErrorFromObject(error);
                const { msg, field } = errors[0];
                throw CustomError.badRequest(`${msg} in field ${field}`);
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }

    async getStudentByCedula(cedula: string): Promise<StudentEntity | null> {
        try {
            
            const student = await StudentModel.findOne({ where: { cedula} });

            if(!student) return student;
            
            return StudentMapper.studentEntityFromObject(student.toJSON());
            
        } catch (error) {
            
            if (error instanceof CustomError) {
                throw error;
            }
            if (error instanceof ValidationError) {
                const errors= SequelizeErrorMapper.customErrorFromObject(error);
                const { msg, field } = errors[0];
                throw CustomError.badRequest(`${msg} in field ${field}`);
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }

    async getAllStudents(): Promise<StudentEntity[] | null> {
        try {
            const students = await UniversityStudiesModel.findAll({include: 'students'});

            
            students.forEach(student => {
                console.log(student.toJSON());
            });

            if (!students) return students;

            return students.map(student => StudentMapper.studentEntityFromObject(student.toJSON()));
        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
            
        }
    }
    
    async delete(id: string): Promise<boolean> {
        try {

            const student = await StudentModel.destroy({ where: { id } });

            return student === 1;

        } catch (error) {
            
            if (error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    
 

}