import { RoleEntity } from '../../../domain/entities';
import { IRoleDatasource } from '../../../domain/datasources';
import { IRoleRepository } from '../../../domain/repositories';


export class RoleRepository implements IRoleRepository {

    constructor(
        private readonly roleDataSource: IRoleDatasource
    ) {}

    getRoleByName(name: string): Promise<RoleEntity | null> {
        return this.roleDataSource.getRoleByName(name);
    }

}