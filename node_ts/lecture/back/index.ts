import express from 'express';
import {Request,Response,NextFunction} from 'express';
import morgan from 'morgan';
import cors from 'cors';
//요청된 쿠키를 쉽게 추출할 수 있도록 해주는 미들웨어.
import cookieParser from 'cookie-parser';
//Express 프레임워크에서 세션을 관리하기 위해 필요한 미들웨어
import expressSession from 'express-session';
//환경변수 사용 dotenv
import dotenv from 'dotenv';
import passport from 'passport';
//Express의 중복 이름 파라메터 공격을 방어
import hpp from 'hpp';
//Express.js 사용시 HTTP 헤더 설정을 자동으로 바꾸어주어
//잘 알려진 몇가지 보안 이슈로부터 보호해주는 패키지
import helmet from 'helmet';

import {sequelize} from './models';
import userRouter from './routes/user';
import postRouter from './routes/post';


dotenv.config();
const app = express();
const prod = process.env.NODE_ENV === 'production';
app.set('port',prod?process.env.PORT:3065);


sequelize.sync({force:false}) //  서버재시작시 테이블 초기화?
    .then(()=>{
        console.log('데이터베이스 연결');
    })
    .catch((err:Error)=>{
        console.log(err);     
    })

if(prod){
    app.use(hpp());
    app.use(helmet());
    app.use(morgan('combined'));
    app.use(cors({
        origin:/skc\.com$/,
        credentials: true
    }));
}else{
    app.use(morgan('dev'));
    app.use(cors({
        origin:true,
        credentials:true,
    }))
}
app.use('/',express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRET!,
    cookie:{
        httpOnly:true,
        secure:false,
        domain:prod ? '.skc.com' : undefined
    },
    name:'rnbck',
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/user',userRouter);
app.use('/post',postRouter);
app.get('/',(Request,Response,Nextfunction)=>{
    Response.send('server정상동작!');
});

app.listen(app.get('port'), ()=>{
    console.log(`server is running on ${process.env.PORT}`);
});