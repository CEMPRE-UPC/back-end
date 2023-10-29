import { AttachedFileEntity, CustomError, RoleEntity } from '../../domain';
import { StudentMapper } from './student.mapper';

export class UploadMapper {
  
  static uploadEntityFromObject(object: { [key: string]:any }) {

    const { id, _id, type, file, student } = object;

    if ( !_id && !id ) {
      throw CustomError.badRequest('Missing id');
    }

    if ( !type ) throw CustomError.badRequest('Missing name');
    if ( !file ) throw CustomError.badRequest('Missing file');

    return new AttachedFileEntity(
        _id || id,
        type,
        file,
        (student) && StudentMapper.studentEntityFromObject(student)
    )
  }

}