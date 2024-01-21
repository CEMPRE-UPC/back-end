import { BcryptAdapter } from '../../../../config/adapters/bcrypt';
import { UserModel } from '../../../../data/mysqldb';
import { IAuthDataSource, CustomError, RegisterUserDto, UserEntity, LoginUserDto } from '../../../../domain';
import { UserMapper } from '../../../mappers';


type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;

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
        
        try {
            
            const exist = await UserModel.findOne({ where: { email } })

            if( exist ) throw CustomError.badRequest('Email already exists');

            const user = UserModel.build({
                email,
                password: this.hashFunction(password),
                isActive,
                roleId: role.id
            });

            await user.save();
            
            return UserMapper.userEntityFromObject({
                ...user.toJSON(),
                role
            });

        } catch (error) {
            
            if(error instanceof CustomError) {
                throw error;
            }
            console.log(error);
            throw CustomError.internalServer();
            
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