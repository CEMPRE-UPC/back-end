import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { FileUpload } from '../interfaces/file-upload';

export const uploadFile = async (file: FileUpload, extensionesValidas: string[] = ['png', 'jpg', 'jpeg', 'pdf'], carpeta = ''): Promise<string> => {
    return new Promise((resolve, reject) => {

        const nombreCortado = file.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        // Validar la extension
        if (!extensionesValidas.includes(extension)) {
            return reject(`La extensión ${extension} no es permitida - ${extensionesValidas}`);
        }

        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        file.mv(uploadPath, (err: Error) => {
            if (err) {
                reject(err);
            }
            resolve(nombreTemp);
        });
    });
};
