"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const types_1 = __importDefault(require("@/constants/types"));
const user_model_1 = require("@/models/user.model");
const user_store_1 = require("@/stores/user.store");
const response_1 = require("@/utils/response");
const inversify_1 = require("inversify");
let UserService = class UserService {
    constructor(store) {
        this.store = store;
    }
    async create(newUser) {
        try {
            let user = await this.store.getByEmail(newUser.email);
            if (user) {
                return (0, response_1.ResponseFailure)(400, `User with this email ${newUser.email.toLowerCase()} already exists`);
            }
            else {
                user = await this.store.create(newUser.email, newUser.password);
                return (0, response_1.ResponseSuccess)(201, new user_model_1.UserResponseModel(user));
            }
        }
        catch (err) {
            return (0, response_1.ResponseFailure)(500, err);
        }
    }
    async getAll() {
        try {
            const users = await this.store.getAll();
            return (0, response_1.ResponseSuccess)(200, users.map((u) => new user_model_1.UserResponseModel(u)));
        }
        catch (err) {
            return (0, response_1.ResponseFailure)(500, err);
        }
    }
};
UserService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.default.UserStore)),
    __metadata("design:paramtypes", [user_store_1.UserStore])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.services.js.map