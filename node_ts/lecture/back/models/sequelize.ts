import { Sequelize } from "sequelize/types";
//대문자가 클래스 소문자가 인스턴스
import config from "../config/config";


const env = process.env.NODE_ENV as ('production'|'test'|'development') || 'development';
const {database,username,password} = config[env];
const sequelize = new Sequelize(database,username,password);

export {sequelize};
export default sequelize;