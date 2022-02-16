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
exports.UserStore = void 0;
const types_1 = __importDefault(require("@/constants/types"));
const user_model_1 = require("@/models/user.model");
const inversify_1 = require("inversify");
const db_services_1 = require("@/services/db.services");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
let UserStore = class UserStore {
    constructor(mongoClient) {
        this.mongoClient = mongoClient;
        this.collectionName = 'users';
        this.saltRounds = 10;
    }
    async getAll() {
        return new Promise((resolve, reject) => {
            this.mongoClient.find(this.collectionName, {}, (error, data) => {
                if (error)
                    reject(error);
                else
                    resolve(data);
            });
        });
    }
    async getByEmail(email) {
        return new Promise((resolve, reject) => {
            this.mongoClient.findOne(this.collectionName, { email: email }, (error, data) => {
                if (error)
                    reject(error);
                else
                    resolve(data);
            });
        });
    }
    async create(email, password) {
        return new Promise(async (resolve, reject) => {
            const user = new user_model_1.UserModel();
            user.email = email;
            if (password) {
                user.password = await bcryptjs_1.default.hash(password, this.saltRounds);
            }
            this.mongoClient.insert(this.collectionName, user, (error, data) => {
                if (error)
                    reject(error);
                else
                    resolve(data);
            });
        });
    }
    async geById(id) {
        return new Promise((resolve, reject) => {
            this.mongoClient.findOneById(this.collectionName, id, (error, data) => {
                if (error)
                    reject(error);
                else
                    resolve(data);
            });
        });
    }
};
UserStore = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.default.MongoDBClient)),
    __metadata("design:paramtypes", [db_services_1.MongoDBClient])
], UserStore);
exports.UserStore = UserStore;
//# sourceMappingURL=user.store.js.map