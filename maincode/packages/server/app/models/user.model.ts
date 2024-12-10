import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

export enum EUserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BANNED = 'banned',
}

type TUserAttributes = {
    id: number;
    name?: string;
    email: string;
    password: string;
    status?: EUserStatus;
    emailConfirmed?: boolean;
};

type TUserCreationAttributes = Optional<TUserAttributes, 'id'>; // Опции создания новой записи

export class User extends Model<TUserAttributes, TUserCreationAttributes> implements TUserAttributes {
    public id!: number;
    public name?: string;
    public email!: string;
    public password!: string;
    public status?: EUserStatus;
    public emailConfirmed?: boolean;

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
                unique: true,
                validate: {
                    isEmail: true,
                    /*
                    customValidator(value: string) {
                        if (!validator.isEmpty(value)) {
                            throw new Error(CODES.AUTH.EMAIL_IS_EMPTY);
                        }
                        if (!validator.isEmail(value)) {
                            throw new Error(CODES.AUTH.INCORRECT_EMAIL_FORMAT);
                        }
                    },
                    */
                },
            },
            password: {
                type: DataTypes.STRING(64),
                allowNull: false
            },
            status: {
                type: DataTypes.ENUM(EUserStatus.ACTIVE, EUserStatus.INACTIVE, EUserStatus.BANNED),
                defaultValue: EUserStatus.INACTIVE,
            },
            emailConfirmed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            tableName: 'users',
            sequelize,
        },
    );
}
