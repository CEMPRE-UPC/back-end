import { JwtAdapter, MailAdapter } from '../../../config';
import { RegisterUserDto } from '../../dtos';
import { CustomError } from '../../errors';
import { IAuthRepository } from '../../repositories';
import { SendVerificationEmail, SignToken, UserToken } from '../../types';


interface IRegisterUseCase {
    execute( registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUserUseCase implements IRegisterUseCase{

    constructor(
        private readonly authRepository: IAuthRepository,
    ) {}

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        
        const user =  await this.authRepository.register( registerUserDto );

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                isActive: user.isActive,
                role: user.role
            }
        }

    }
}