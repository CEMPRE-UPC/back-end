import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from '../interfaces/file-upload';

export const uploadFile = async (file: FileUpload, validExtensions: string[] = ['png', 'jpg', 'jpeg', 'pdf'], folder = ''): Promise<string> => {
    return new Promise((resolve, reject) => {

        const cutName = file.name.split('.');
        const extension = cutName[cutName.length - 1];

        // Validar la extension
        if (!validExtensions.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida - ${validExtensions}`);
        }

        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);

        file.mv(uploadPath, (err: Error) => {
            if (err) {
                reject(err);
            }
            resolve(nameTemp);
        });
    });
};
