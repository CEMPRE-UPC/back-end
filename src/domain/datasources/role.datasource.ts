import { RoleEntity } from '../entities';


export interface IRoleDatasource {
    getRoleByName(name: string): Promise<RoleEntity|null>;
}