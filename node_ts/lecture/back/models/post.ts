import {DataTypes, Model} from 'sequelize';
import { sequelize } from '.';
class Post extends Model{
    public readonly id! : number;
    public content! : string;
    public readonly createdAt!:Date;
    public readonly updatedAt!: Date;
}

Post.init({
    content:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
},{
    sequelize,
    modelName:'Post',
    tableName:'post',
    charset:'utf8mb4',
    collate:'utf8mb4_general_ci'
});

export const associate = (dbType: any)=>{
   
};

export default Post;