import { CustomError, StudentDto, StudentEntity, IStudentDataSource } from '../../../domain';
import { StudentModel } from '../../../data/mysqldb';
import { SequelizeErrorMapper, StudentMapper } from '../../mappers';
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

    async update(stundetDto: StudentDto): Promise<number[]> {

        const { cedula, ...studentObject} = StudentDto.toJSON(stundetDto);
        try {

            const affectedCount = await StudentModel.update(studentObject, { where: { cedula } });

            if(affectedCount.at(0) === 0) throw CustomError.notFound('No se actualizo ninguna informacion');

            return affectedCount;

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

    async getStudentByIdAndCedula(id: string, cedula: string): Promise<StudentEntity | null> {
        try {
            
            const student = await StudentModel.findOne({ where: { id, cedula} });

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
    
 

}