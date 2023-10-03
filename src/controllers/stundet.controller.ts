import { Request, Response} from 'express';
import { uploadFile } from '../helpers/upload-file';
import { FileUpload } from '../interfaces/file-upload';


export const savePersonalData = async( req: Request, res: Response ) => {

  const { name, age } = req.body;
  const files = Object.values(req.files!) as FileUpload[];
  const uploadPromises = [];

  try {
    
    for (let i = 0; i < files.length; i++) {
      uploadPromises.push(uploadFile(files[i], undefined, '/student/personal-data'));
    }
    
    const nameFiles = await Promise.all(uploadPromises);
    console.log(nameFiles);

    res.json({ message: 'Datos recibidos correctamente' });

  } catch (error) {
    res.status(400).json({ message: error });
  }

}
