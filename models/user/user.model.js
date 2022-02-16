"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserErrorResponse = exports.UserResponse = exports.UserResponseModel = exports.AuthProvider = exports.UserModel = exports.UserEmailPasswordAuthRequest = exports.CreateUserRequest = void 0;
require("reflect-metadata");
const joi = __importStar(require("joi"));
const validation_1 = require("@/utils/validation");
const swagger_express_ts_1 = require("swagger-express-ts");
/**
 * Requests models
 */
let CreateUserRequest = class CreateUserRequest {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({ required: true }),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "email", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)(),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "password", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)(),
    __metadata("design:type", String)
], CreateUserRequest.prototype, "provider", void 0);
CreateUserRequest = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        name: 'CreateUserRequest',
        description: 'Create user request model',
    })
], CreateUserRequest);
exports.CreateUserRequest = CreateUserRequest;
class UserEmailPasswordAuthRequest {
}
__decorate([
    (0, validation_1.Constraint)(joi.string().max(3)),
    __metadata("design:type", String)
], UserEmailPasswordAuthRequest.prototype, "email", void 0);
__decorate([
    (0, validation_1.Constraint)(joi.string()),
    __metadata("design:type", String)
], UserEmailPasswordAuthRequest.prototype, "password", void 0);
exports.UserEmailPasswordAuthRequest = UserEmailPasswordAuthRequest;
let UserModel = class UserModel {
    constructor() {
        this.provider = AuthProvider.LOCAL;
    }
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        required: true,
    }),
    __metadata("design:type", String)
], UserModel.prototype, "_id", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        required: true,
    }),
    __metadata("design:type", String)
], UserModel.prototype, "email", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)(),
    __metadata("design:type", String)
], UserModel.prototype, "password", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({}),
    __metadata("design:type", String)
], UserModel.prototype, "provider", void 0);
UserModel = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        name: 'UserModel',
        description: 'DB user model',
    })
], UserModel);
exports.UserModel = UserModel;
var AuthProvider;
(function (AuthProvider) {
    AuthProvider["LOCAL"] = "local";
    AuthProvider["GOOGLE"] = "google";
    AuthProvider["FACEBOOK"] = "facebook";
})(AuthProvider = exports.AuthProvider || (exports.AuthProvider = {}));
/**
 * Responses models
 */
let UserResponseModel = class UserResponseModel {
    constructor(user) {
        this._id = user._id;
        this.email = user.email;
    }
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)(),
    __metadata("design:type", String)
], UserResponseModel.prototype, "_id", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)(),
    __metadata("design:type", String)
], UserResponseModel.prototype, "email", void 0);
UserResponseModel = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'User Response Model',
        name: 'UserResponseModel',
    }),
    __metadata("design:paramtypes", [UserModel])
], UserResponseModel);
exports.UserResponseModel = UserResponseModel;
let UserResponse = class UserResponse {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'code',
        required: true,
    }),
    __metadata("design:type", Number)
], UserResponse.prototype, "code", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'data',
        model: 'UserResponseModel',
        required: true,
    }),
    __metadata("design:type", UserResponseModel)
], UserResponse.prototype, "data", void 0);
UserResponse = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'User Response',
        name: 'UserResponse',
    })
], UserResponse);
exports.UserResponse = UserResponse;
let UserErrorResponse = class UserErrorResponse {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'code',
        required: true,
    }),
    __metadata("design:type", Number)
], UserErrorResponse.prototype, "code", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'message',
    }),
    __metadata("design:type", String)
], UserErrorResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'error',
        required: true,
    }),
    __metadata("design:type", String)
], UserErrorResponse.prototype, "error", void 0);
UserErrorResponse = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'User Error Response',
        name: 'UserErrorResponse',
    })
], UserErrorResponse);
exports.UserErrorResponse = UserErrorResponse;
//# sourceMappingURL=user.model.js.map