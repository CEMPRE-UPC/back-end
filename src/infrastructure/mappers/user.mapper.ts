import { CustomError, UserEntity } from '../../domain';
import { RoleMapper } from './role.mapper';

export class UserMapper {
  
  static userEntityFromObject(object: { [key: string]:any }) {

    const { id, _id, email, password, isActive, role, roles } = object;

    if ( !_id && !id ) {
      throw CustomError.badRequest('Missing id');
    }

    if ( !email ) throw CustomError.badRequest('Missing email');
    if ( !password ) throw CustomError.badRequest('Missing password');
    if ( isActive === undefined ) throw CustomError.badRequest('Missing isActive');


    return new UserEntity(
      _id || id,
      email,
      password,
      isActive,
      RoleMapper.roleEntityFromObject(role ?? roles)
    );
  }

}