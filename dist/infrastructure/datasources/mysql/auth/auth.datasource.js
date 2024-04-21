"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthDataSource = void 0;
const bcrypt_1 = require("../../../../config/adapters/bcrypt");
const mysqldb_1 = require("../../../../data/mysqldb");
const domain_1 = require("../../../../domain");
const mappers_1 = require("../../../mappers");
const config_1 = require("../../../../config");
const sequelize = mysqldb_1.MysqlDatabase.initialize({
    mysqlUrl: config_1.envs.MYSQL_URL,
    database: config_1.envs.MYSQL_DB_NAME
});
class AuthDataSource {
    constructor(hashFunction = bcrypt_1.BcryptAdapter.hash, compareFunction = bcrypt_1.BcryptAdapter.compare) {
        this.hashFunction = hashFunction;
        this.compareFunction = compareFunction;
    }
    login(loginUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = loginUserDto;
            try {
                const user = yield mysqldb_1.UserModel.findOne({ where: { email }, include: 'role' });
                if (!user)
                    throw domain_1.CustomError.unauthorized('Invalid credentials - email');
                if (!user.isActive)
                    throw domain_1.CustomError.unauthorized('Invalid credentials - inactive');
                const isValidPassword = this.compareFunction(password, user.password);
                if (!isValidPassword)
                    throw domain_1.CustomError.unauthorized('Invalid credentials - password');
                return mappers_1.UserMapper.userEntityFromObject(user.toJSON());
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    register(registerUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, isActive, role } = registerUserDto;
            const t = yield sequelize.transaction();
            try {
                const exist = yield mysqldb_1.UserModel.findOne({ where: { email }, transaction: t });
                if (exist)
                    throw domain_1.CustomError.badRequest('Email already exists');
                const user = mysqldb_1.UserModel.build({
                    email,
                    password: this.hashFunction(password),
                    isActive,
                    roleId: role.id
                });
                yield user.save({ transaction: t });
                yield this.sendEmailVerification(user, t);
                yield t.commit();
                return mappers_1.UserMapper.userEntityFromObject(user.toJSON());
            }
            catch (error) {
                yield t.rollback();
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    sendEmailVerification(user, t) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield config_1.JwtAdapter.generateToken({ id: user.id }, '12h');
            if (!token)
                throw domain_1.CustomError.internalServer('Error generating token activation');
            try {
                yield config_1.MailAdapter.sendVerificationEmail(user.email, token);
            }
            catch (error) {
                console.log(error);
                yield t.rollback();
                throw domain_1.CustomError.badRequest('Error sending email verification');
            }
        });
    }
    activateAccount(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield mysqldb_1.UserModel.findByPk(id);
                console.log(user);
                if (!user)
                    throw domain_1.CustomError.notFound('User not found');
                user.isActive = true;
                yield user.save();
                return mappers_1.UserMapper.userEntityFromObject(user.toJSON());
            }
            catch (error) {
                if (error instanceof domain_1.CustomError) {
                    throw error;
                }
                console.log(error);
                throw domain_1.CustomError.internalServer();
            }
        });
    }
    getUserById(id) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const user = yield mysqldb_1.UserModel.findByPk(id, { include: 'role' });
            if (!user)
                return resolve(null);
            resolve(mappers_1.UserMapper.userEntityFromObject(user.toJSON()));
        }));
    }
    getUserByEmail(email) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const user = yield mysqldb_1.UserModel.findOne({ where: { email } });
            if (!user)
                return resolve(null);
            resolve(mappers_1.UserMapper.userEntityFromObject(user.toJSON()));
        }));
    }
}
exports.AuthDataSource = AuthDataSource;
