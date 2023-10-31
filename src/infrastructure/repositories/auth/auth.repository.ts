import { IAuthDataSource, IAuthRepository, LoginUserDto, RegisterUserDto, UserEntity } from '../../../domain';


export class AuthRepository implements IAuthRepository {

    constructor(
        private readonly authDataSource: IAuthDataSource
    ) {}
    
    login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        return this.authDataSource.login(loginUserDto);
    }
    
    register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        return this.authDataSource.register(registerUserDto);
    }
    
    getUserById(id: number): Promise<UserEntity | null> {
        return this.authDataSource.getUserById(id);
    }

    getUserByEmail(email: string): Promise<UserEntity | null> {
        return this.authDataSource.getUserByEmail(email);
    }
}