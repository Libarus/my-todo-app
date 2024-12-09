import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

enum EUserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BANNED = 'banned',
}

type TUserAttributes = {
    id: number;
    name?: string;
    email: string;
    password: string;
    status: EUserStatus; 
};

type TUserCreationAttributes = Optional<TUserAttributes, 'id'>; // Опции создания новой записи

export class User extends Model<TUserAttributes, TUserCreationAttributes> implements TUserAttributes {
    public id!: number;
    public name?: string;
    public email!: string;
    public password!: string;
    public status!: EUserStatus;
}

// Функция для инициализации модели
export function InitializeUserModel(sequelize: Sequelize) {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(200),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(200),
                allowNull: false,
                validate: {
                    isEmail: true,
                }
            },
            password: {
                type: DataTypes.STRING(64),
            },
            status: {
                type: DataTypes.ENUM(EUserStatus.ACTIVE, EUserStatus.INACTIVE, EUserStatus.BANNED),
                defaultValue: EUserStatus.INACTIVE,
            }
        },
        {
            tableName: 'users',
            sequelize,
        }
    );
}
