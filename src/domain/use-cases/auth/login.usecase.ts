import { LoginUserDto } from '../../dtos';
import { IAuthRepository } from '../../repositories';
import { JwtAdapter } from '../../../config';
import { CustomError } from '../../errors';
import { SignToken, UserToken } from '../../types';

interface ILoginUseCase {
    execute( loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUseCase implements ILoginUseCase {
    
    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {}
    
    async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
        
        const user = await this.authRepository.login(loginUserDto);

        const token = await this.signToken({ id: user.id }, '2h');
        if (!token) throw CustomError.internalServer('Error generating token');

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                isActive: user.isActive,
                role: user.role
            },
            token
        }
    }

}