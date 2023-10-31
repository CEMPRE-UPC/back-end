import { DataTypes, Model } from 'sequelize';
import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';
import { RoleModel } from './role.model';

const sequelize = MysqlDatabase.initialize({
  mysqlUrl: envs.MYSQL_URL,
  database: envs.MYSQL_DB_NAME
})


class UserModel extends Model {
  public id!: number;
  public email!: string;
  public password!: string;
  public isActive!: boolean;
}

UserModel.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    unique: true,
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  isActive: {
    type: new DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }
}, {
  tableName: 'users',
  sequelize, // this bit is important
  timestamps: false,
})

RoleModel.hasMany(UserModel, { as: 'role',  foreignKey: { name: 'roleId', }  });
UserModel.belongsTo(RoleModel, { as: 'role', foreignKey: { name: 'roleId', }  });

export { UserModel };