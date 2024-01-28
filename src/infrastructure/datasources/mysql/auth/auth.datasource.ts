import { BcryptAdapter } from '../../../../config/adapters/bcrypt';
import { MysqlDatabase, UserModel } from '../../../../data/mysqldb';
import { IAuthDataSource, CustomError, RegisterUserDto, UserEntity, LoginUserDto } from '../../../../domain';
import { UserMapper } from '../../../mappers';
import { JwtAdapter, MailAdapter, envs } from '../../../../config';
import { env } from 'process';
import { Transaction } from 'sequelize';


type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;

const sequelize = MysqlDatabase.initialize({
    mysqlUrl: envs.MYSQL_URL,
    database: envs.MYSQL_DB_NAME
})


export class AuthDataSource implements IAuthDataSource {
    
    constructor(
        private readonly hashFunction: HashFunction = BcryptAdapter.hash,
        private readonly compareFunction: CompareFunction = BcryptAdapter.compare
    ) {}


    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        
        const { email, password } = loginUserDto;

        try {

            const user = await UserModel.findOne({ where: { email }, include: 'role' });

            if(!user) throw CustomError.unauthorized('Invalid credentials - email');

            if (!user.isActive) throw CustomError.unauthorized('Invalid credentials - inactive');

            const isValidPassword = this.compareFunction(password, user.password);
            if (!isValidPassword) throw CustomError.unauthorized('Invalid credentials - password');

            return UserMapper.userEntityFromObject(user.toJSON());
            
        } catch (error) {
            
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    
    async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        const { email, password, isActive, role } = registerUserDto;
    
        const t = await sequelize.transaction();
        
        try {
            const exist = await UserModel.findOne({ where: { email }, transaction: t });
    
            if( exist ) throw CustomError.badRequest('Email already exists');
    
            const user = UserModel.build({
                email,
                password: this.hashFunction(password),
                isActive,
                roleId: role.id
            });
    
            await user.save({ transaction: t });
            await this.sendEmailVerification(user, t);
            await t.commit();
    
            return UserMapper.userEntityFromObject(user.toJSON());
        } catch (error) {
            await t.rollback();
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
        }
    }
    
    private async sendEmailVerification(user: UserModel, t: Transaction): Promise<void> {
        const token = await JwtAdapter.generateToken({ id: user.id }, '12h');
        if (!token) throw CustomError.internalServer('Error generating token activation');
    
        try {
            await MailAdapter.sendVerificationEmail(user.email, token);
        } catch (error) {
            console.log(error);
            await t.rollback();
            throw CustomError.badRequest('Error sending email verification');
        }
    }

    async activateAccount(id: number): Promise<UserEntity> {
            
            try {
    
                const user = await UserModel.findByPk(id);
                console.log(user);
                
                if(!user) throw CustomError.notFound('User not found');
    
                user.isActive = true;
                await user.save();
    
                return UserMapper.userEntityFromObject(user.toJSON());
                
            } catch (error) {
                
                if(error instanceof CustomError) {
                    throw error;
                }
                console.log(error);
                throw CustomError.internalServer();
                
            }
    }

    getUserById(id: number): Promise<UserEntity|null> {
       
        return new Promise( async (resolve) => {

            const user = await UserModel.findByPk(id, { include: 'role' });
            if(!user) return resolve(null);

            resolve( UserMapper.userEntityFromObject(user.toJSON()) );
        })
    }

    getUserByEmail(email: string): Promise<UserEntity | null> {
        return new Promise( async (resolve) => {

            const user = await UserModel.findOne({ where: { email } });
            if(!user) return resolve(null);

            resolve( UserMapper.userEntityFromObject(user.toJSON()) );
        })
    }

}