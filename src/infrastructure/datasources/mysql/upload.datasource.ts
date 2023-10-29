import fs from 'fs';
import path from 'path';
import { UUIDAdapter, envs } from '../../../config';
import { AttachedFileEntity, CustomError, IUploadDataSource, ShowFileDto, UploadDto } from '../../../domain';
import { AttachedFileModel, MysqlDatabase } from '../../../data/mysqldb';
import { UploadMapper } from '../../mappers';

const sequelize = MysqlDatabase.initialize({
    mysqlUrl: envs.MYSQL_URL,
    database: envs.MYSQL_DB_NAME
})

export class UploadDataSource implements IUploadDataSource {

    constructor(
        private readonly generateUUID: () => string = UUIDAdapter.generate,
    ) { }

  
    async uploadFile(uploadDto: UploadDto): Promise<boolean> {

        const { cedula, table, file, typeFile, studentId } = uploadDto;

        console.log(uploadDto);
        

        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];

        const fileName = this.generateUUID() + '.' + extension;
 
        const uploadPath = path.join(__dirname, '../../../../uploads/', table, cedula, fileName);

        const transaction = await sequelize.transaction();

        try {
            await file.mv(uploadPath);

            await AttachedFileModel.create({
                type: typeFile,
                file: fileName,
                studentId
            }, { transaction });

            await transaction.commit();
            return true;
        } catch (error) {
            console.log(error);
            
            await transaction.rollback();
            fs.unlinkSync(uploadPath);
            return false;
        }

    }
    async getFilesByStudentId(studentId: string): Promise<AttachedFileEntity[]> {
        
        try {

            const attachedFiles = await AttachedFileModel.findAll({ where: { studentId } });

            // mapear los archivos
            return attachedFiles.map(AttachedFile => UploadMapper.uploadEntityFromObject(AttachedFile));

        } catch (error) {
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }

    async getFile(showFileDto: ShowFileDto): Promise<string> {
        
        const { table, id } = showFileDto;

        console.log(showFileDto);
        
      
        try {
            
            const attachedFile = await AttachedFileModel.findByPk(id, { include: 'student' });

            if(!attachedFile) throw CustomError.badRequest('File not found');

            const attached = UploadMapper.uploadEntityFromObject(attachedFile.toJSON());

            const filePath = path.join(__dirname, '../../../../uploads/', table, attached.student!.cedula ,attachedFile.file);

            return filePath;
            
        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
            
        }
    }





}