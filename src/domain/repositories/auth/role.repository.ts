import { RoleEntity } from '../../entities';


export interface IRoleRepository {
    getRoleByName(name: string): Promise<RoleEntity|null>;
}