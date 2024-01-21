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
        private readonly signToken: SignToken = JwtAdapter.generateToken,
        private readonly sendVerificationEmail: SendVerificationEmail = MailAdapter.sendVerificationEmail
    ) {}

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        
        const user =  await this.authRepository.register( registerUserDto );

        const token = await this.signToken({ id: user.id });
        const tokenActivation = await this.signToken({ id: user.id }, '12h');

        if (!token) throw CustomError.internalServer('Error generating token');
        if (!tokenActivation) throw CustomError.internalServer('Error generating token activation');


        try {
            
            await this.sendVerificationEmail(user.email, tokenActivation);
        } catch (error) {
            console.log(error);
            
        }

        return {
            user: {
                id: user.id,
                email: user.email,
                isActive: user.isActive,
                role: user.role
            },
            token,
        }

    }
}