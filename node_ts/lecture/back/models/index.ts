import User, {associate, associate as associateUser} from './user';
//import 와 동시에 export
export * from './sequelize';


const db={
  User,
};

export type dbType = typeof db;

associateUser(db);