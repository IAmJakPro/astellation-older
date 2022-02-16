"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
require("reflect-metadata");
//import PassPortAuth from './config/passport';
const types_1 = __importDefault(require("@/constants/types"));
const container_1 = require("@/config/container");
//import AuthConfig from './config/auth';
require('dotenv').config();
const app = container_1.container.get(types_1.default.App);
/* const passport = container.get<AuthConfig>(TYPES.AuthConfig);
passport.fetchStrategies(); */
const server = app.start();
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT} :)`);
});
//# sourceMappingURL=server.js.map