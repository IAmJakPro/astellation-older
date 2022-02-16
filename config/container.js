"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("./../constants/types"));
const app_1 = __importDefault(require("@/config/app"));
const db_1 = require("@/config/db");
const db_services_1 = require("@/services/db.services");
const user_controller_1 = require("@/controllers/user.controller");
const user_services_1 = require("@/services/user.services");
const user_store_1 = require("@/stores/user.store");
const auth_services_1 = require("@/services/auth.services");
const auth_controller_1 = require("@/controllers/auth.controller");
// load everything needed to the Container
let container = new inversify_1.Container();
exports.container = container;
container.bind(types_1.default.App).to(app_1.default);
container
    .bind(types_1.default.MongoDbConnection)
    .to(db_1.MongoDBConnection);
container.bind(types_1.default.MongoDBClient).to(db_services_1.MongoDBClient);
container.bind(types_1.default.AuthService).to(auth_services_1.AuthService);
container.bind(types_1.default.AuthController).to(auth_controller_1.AuthController);
container.bind(types_1.default.UserStore).to(user_store_1.UserStore);
container.bind(types_1.default.UserService).to(user_services_1.UserService);
container.bind(types_1.default.UserController).to(user_controller_1.UserController);
//# sourceMappingURL=container.js.map