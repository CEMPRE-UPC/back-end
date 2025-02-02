import fs from 'fs';
import path from 'path';
import { UUIDAdapter, envs } from '../../../../config';
import { CustomError, FileUpload, IPublicFileDataSource, PublicFileEntity, ShowFileByTypeDto, ShowFileDto } from '../../../../domain';
import { MysqlDatabase, PublicFileModel } from '../../../../data/mysqldb';
import { PublicFileMapper } from '../../../mappers';
import { PublicFileDto } from '../../../../domain/dtos/upload/public-file.dto';

const sequelize = MysqlDatabase.initialize({
    mysqlUrl: envs.MYSQL_URL,
    database: envs.MYSQL_DB_NAME
})

export class PublicFileDataSource implements IPublicFileDataSource {

    constructor(
        private readonly generateUUID: () => string = UUIDAdapter.generate,
    ) { }


    private uploadFilePath = path.join(process.cwd(), envs.UPLOAD_PATH, 'public-files');

  
    async register(publicFileDto: PublicFileDto): Promise<boolean> {

        const { table, file, typeFile } = publicFileDto;

        const { uploadPath, fileName } = this.createfilePath(file, table);

        const transaction = await sequelize.transaction();

        try {
            
            await file.mv(uploadPath);

            await PublicFileModel.create({
                type: typeFile,
                file: fileName,
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

    async getFiles(): Promise<PublicFileEntity[]> {
        
        try {

            const publicFiles = await PublicFileModel.findAll();

            return publicFiles.map(publicFile => PublicFileMapper.publicFileEntityFromObject(publicFile.toJSON()));

        } catch (error) {
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }

    async getFileByType(showFileByTypeDto: ShowFileByTypeDto): Promise<string> {
         try {
        
            const { table, typeFile } = showFileByTypeDto;

            
            
            const publicFile = await PublicFileModel.findOne({ where: { type: typeFile } });
            
            if(!publicFile) throw CustomError.badRequest('File not found');
            
            const fileMap = PublicFileMapper.publicFileEntityFromObject(publicFile.toJSON());
            
            const filePath = path.join(this.uploadFilePath, table, fileMap.file);

            return filePath;

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

        try {
            
            const publicFile = await PublicFileModel.findByPk(id);

            if(!publicFile) throw CustomError.badRequest('File not found');

            const fileMap = PublicFileMapper.publicFileEntityFromObject(publicFile.toJSON());

            const filePath = path.join(this.uploadFilePath, table, fileMap.file);

            return filePath;
            
        } catch (error) {

            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
            
        }
    }

    async updateFile(publicFileDto: PublicFileDto): Promise<boolean> {

        const { table, file, typeFile } = publicFileDto;

        const publicFile = await PublicFileModel.findOne({ where: { type: typeFile } });

        if(!publicFile) throw CustomError.badRequest('File not found');

        const fileMap = PublicFileMapper.publicFileEntityFromObject(publicFile.toJSON());


        // borramos el archivo anterior

        const filePath = path.join(this.uploadFilePath, table ,fileMap.file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        const { uploadPath, fileName } = this.createfilePath(file, table);


        const transaction = await sequelize.transaction();

        try {
            await file.mv(uploadPath);

            await publicFile.update({
                file: fileName
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


    private createfilePath(file: FileUpload, table: string) {
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];

        const fileName = this.generateUUID() + '.' + extension;

        const uploadPath = path.join(this.uploadFilePath, table, fileName);
        return { uploadPath, fileName };
    }
}