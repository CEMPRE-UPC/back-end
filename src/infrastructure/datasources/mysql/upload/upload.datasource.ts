import fs from 'fs';
import path from 'path';
import { UUIDAdapter, envs } from '../../../../config';
import { AttachedFileEntity, CustomError, FileUpload, IUploadDataSource, ShowFileDto, UploadDto } from '../../../../domain';
import { AttachedFileModel, MysqlDatabase } from '../../../../data/mysqldb';
import { UploadMapper } from '../../../mappers';

const sequelize = MysqlDatabase.initialize({
    mysqlUrl: envs.MYSQL_URL,
    database: envs.MYSQL_DB_NAME
})

export class UploadDataSource implements IUploadDataSource {

    constructor(
        private readonly generateUUID: () => string = UUIDAdapter.generate,
    ) { }

    private uploadFilePath = path.join(process.cwd(), envs.UPLOAD_PATH);


    async uploadFile(uploadDto: UploadDto): Promise<boolean> {

        const { cedula, table, file, typeFile, studentId } = uploadDto;

        const { uploadPath, fileName } = this.createfilePath(file, table, cedula);

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
            if (error instanceof CustomError) {
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

            if (!attachedFile) throw CustomError.badRequest('File not found');

            const attached = UploadMapper.uploadEntityFromObject(attachedFile.toJSON());

            const filePath = path.join(this.uploadFilePath, table, attached.student!.cedula, attachedFile.file);

            console.log(filePath);


            return filePath;

        } catch (error) {

            if (error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();

        }
    }

    async updateFile(uploadDto: UploadDto): Promise<boolean> {

        const { cedula, table, file, typeFile, studentId } = uploadDto;

        const attachedFile = await AttachedFileModel.findOne({ where: { studentId, type: typeFile } });

        if (!attachedFile) {
            return await this.uploadFile(uploadDto);
        }

        const attached = UploadMapper.uploadEntityFromObject(attachedFile.toJSON());


        // borramos el archivo anterior

        const filePath = path.join(this.uploadFilePath, table, cedula, attached.file);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        const { uploadPath, fileName } = this.createfilePath(file, table, cedula);


        const transaction = await sequelize.transaction();

        try {
            await file.mv(uploadPath);

            await attachedFile.update({
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


    private createfilePath(file: FileUpload, table: string, cedula: string) {
        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];

        const fileName = this.generateUUID() + '.' + extension;

        const uploadPath = path.join(this.uploadFilePath, table, cedula, fileName);
        return { uploadPath, fileName };
    }
}