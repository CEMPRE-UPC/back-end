import { LoginUserDto, RegisterUserDto } from '../../dtos';
import { UserEntity } from '../../entities';


export interface IAuthRepository {
    register( registerUserDto: RegisterUserDto): Promise<UserEntity>

    login( loginUserDto: LoginUserDto ): Promise<UserEntity>

    getUserById( id: number ): Promise<UserEntity|null>

    getUserByEmail( email: string ): Promise<UserEntity|null>

}