const { Model, DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING,
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  }
};

class User extends Model {
  static associate(models) {
    this.hasOne(models.Customer, {
      as: 'customer',
      foreignKey: 'userId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      hooks: { //encrypt password before create
        beforeCreate: async (user) => {
          const password = await bcrypt.hash(user.password,10);
          user.password = password;
        },
      },
      defaultScope: {//default scope show user info without password & recovery token
        attributes:{
          exclude: ['password']
        },
      },
      scopes: {
        withPassword: {
          attributes: {}
        }
      },
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User };
