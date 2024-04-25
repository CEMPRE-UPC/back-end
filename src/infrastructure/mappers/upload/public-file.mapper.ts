import { CustomError, PublicFileEntity } from '../../../domain';

export class PublicFileMapper {
  
  static publicFileEntityFromObject(object: { [key: string]:any }) {

    const { id, _id, type, file } = object;

    if ( !_id && !id ) {
      throw CustomError.badRequest('Missing id :v');
    }

    if ( !type ) throw CustomError.badRequest('Missing name');
    if ( !file ) throw CustomError.badRequest('Missing file');

    return new PublicFileEntity(
        _id || id,
        type,
        file,
    )
  }

}