"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var prod = process.env.NODE_ENV === 'production';
app.set('port', prod ? process.env.PORT : 3065);
app.get('/', function (Request, Response, Nextfunction) {
    Response.send('server정상동작!');
});
app.listen(app.get('port'), function () {
    console.log("server is running on " + process.env.PORT);
});
