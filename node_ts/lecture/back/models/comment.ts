import {DataTypes, Model} from 'sequelize';
import { sequelize } from '.';
class Comment extends Model{
    public readonly id! : number;
    public content! : string;
    public readonly createdAt!:Date;
    public readonly updatedAt!: Date;
}

Comment.init({
    content:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
},{
    sequelize,
    modelName:'Comment',
    tableName:'comment',
    charset:'utf8mb4',
    collate:'utf8mb4_general_ci'
});

export const associate = (dbType: any)=>{

};

export default Comment;