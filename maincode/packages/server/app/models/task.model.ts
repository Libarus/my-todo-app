import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

type TTaskAttributes = {
    id: number;
    title: string;
    description?: string;
    dueDate: Date;
    completed: boolean;
};

type TTaskCreationAttributes = Optional<TTaskAttributes, 'id'>; // Опции создания новой записи

export class Task extends Model<TTaskAttributes, TTaskCreationAttributes> implements TTaskAttributes {
    public id!: number; // Уникальный идентификатор
    public title!: string; // Название задачи
    public description?: string; // Описание задачи
    public dueDate: Date = new Date(); // Дата выполнения
    public completed!: boolean; // Флаг завершения задачи

    // Методы класса будут определены автоматически при вызове метода `init`
}

// Функция для инициализации модели
export function initializeTaskModel(sequelize: Sequelize) {

    console.info('2222');
    
    Task.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
            },
            completed: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            dueDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        },
        {
            tableName: 'tasks',
            sequelize,
        }
    );
}
