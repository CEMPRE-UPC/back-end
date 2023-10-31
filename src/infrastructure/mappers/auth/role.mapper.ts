import { CustomError, RoleEntity } from '../../../domain';

export class RoleMapper {
  
  static roleEntityFromObject(object: { [key: string]:any }) {

    const { id, _id, name } = object;

    if ( !_id && !id ) {
      throw CustomError.badRequest('Missing id');
    }

    if ( !name ) throw CustomError.badRequest('Missing name');

    return new RoleEntity(
      _id || id,
      name
    );
  }

}