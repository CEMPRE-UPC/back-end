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

const roles = ['STUDENT_ROLE', 'CEMPRE_ADMIN_ROLE', 'CEMPRE_CURR_ROLE', 'CEMPRE_PROF_ROLE'];

RoleModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: roles[0],
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
  roles.forEach(role => {
    RoleModel.findOrCreate({
      where: { name: role },
      defaults: { name: role }
    }).then(([role, created]) => {
      console.log(role.get({ plain: true }));
      console.log(created);
    });
  });
});

export { RoleModel };