import { JwtAdapter } from '../../../config';
import { RegisterUserDto } from '../../dtos';
import { CustomError } from '../../errors';
import { IAuthRepository } from '../../repositories';
import { SignToken, UserToken } from '../../types';


interface IRegisterUseCase {
    execute( registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUseCase implements IRegisterUseCase{

    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly signToken: SignToken = JwtAdapter.generateToken
    ) {}

    async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
        
        const user =  await this.authRepository.register( registerUserDto );

        const token = await this.signToken({ id: user.id });
        if (!token) throw CustomError.internalServer('Error generating token');

        return {
            user: {
                id: user.id,
                email: user.email,
                isActive: user.isActive,
                role: user.role
            },
            token
        }

    }
}