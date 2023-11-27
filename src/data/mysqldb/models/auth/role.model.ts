import { DataTypes, Model } from 'sequelize';

import { MysqlDatabase } from '../../mysql-database';
import { envs } from '../../../../config';

const sequelize = MysqlDatabase.initialize({
    mysqlUrl: envs.MYSQL_URL,
    database: envs.MYSQL_DB_NAME
})

class RoleModel extends Model {
    public id!: number;
    public name!: string;
}

const DEFAULT_ROLE = 'STUDENT_ROLE';

RoleModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: DEFAULT_ROLE,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'roles',
        timestamps: false
    }
)

RoleModel.afterSync(async () => {
  const [role, created] = await RoleModel.findOrCreate({
    where: { name: DEFAULT_ROLE },
    defaults: { name: DEFAULT_ROLE }
  });
  console.log(role.get({ plain: true }));
  console.log(created);
});
export { RoleModel };