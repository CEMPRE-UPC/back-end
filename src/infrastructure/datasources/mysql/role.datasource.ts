import { RoleMapper } from '../../mappers';
import { RoleModel } from '../../../data/mysqldb';
import { RoleEntity, IRoleDatasource } from '../../../domain';

export class RoleDataSouce implements IRoleDatasource {

    getRoleByName(name: string): Promise<RoleEntity|null> {
        
        return new Promise(async (resolve) => {

            const role =  await RoleModel.findOne({ where: { name } });
            if (!role) return resolve(null);
            
            return resolve(RoleMapper.roleEntityFromObject(role));
        })
    }

}