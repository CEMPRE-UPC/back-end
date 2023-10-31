import { RegisterUserDto,LoginUserDto } from '../../dtos';
import { UserEntity } from '../../entities';

export interface IAuthDataSource {
    
    register( registerUserDto: RegisterUserDto): Promise<UserEntity>

    login( loginUserDto: LoginUserDto): Promise<UserEntity>

    getUserById( id: number ): Promise<UserEntity|null>

    getUserByEmail( email: string ): Promise<UserEntity|null>

}