import { JwtAdapter } from '../../../config';
import { IAuthRepository } from '../../repositories';
import { VerifyToken } from '../../types';
import { CustomError } from '../../errors/custom.error';

interface IActivateAccountUseCase {
    execute( token: string ): Promise<boolean>;
}

export class ActivateAccountUseCase implements IActivateAccountUseCase {
    
    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly verifyToken: VerifyToken = JwtAdapter.validateToken
    ) {}
    
    async execute(token: string): Promise<boolean> {
        
        const payload = await this.verifyToken<{ id: number }>(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const user = await this.authRepository.activateAccount(payload.id);
        if (!user ) throw CustomError.unauthorized('Invalid token - user not found');

        return user.isActive
    }

}