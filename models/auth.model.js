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
exports.AuthErrorResponse = exports.AuthResponse = exports.AccessTokenAuthResponseModel = exports.UserEmailPasswordAuthRequest = void 0;
const joi = __importStar(require("joi"));
const validation_1 = require("@/utils/validation");
const swagger_express_ts_1 = require("swagger-express-ts");
const user_model_1 = require("./user.model");
let UserEmailPasswordAuthRequest = class UserEmailPasswordAuthRequest {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        required: true,
        description: 'user email',
    }),
    (0, validation_1.Constraint)(joi.string().email().required()),
    __metadata("design:type", String)
], UserEmailPasswordAuthRequest.prototype, "email", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        required: true,
        description: 'user password',
    }),
    (0, validation_1.Constraint)(joi.string().required().min(6).max(30)),
    __metadata("design:type", String)
], UserEmailPasswordAuthRequest.prototype, "password", void 0);
UserEmailPasswordAuthRequest = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        name: 'UserEmailPasswordAuthRequest',
        description: 'User email and password authentication request',
    })
], UserEmailPasswordAuthRequest);
exports.UserEmailPasswordAuthRequest = UserEmailPasswordAuthRequest;
let AccessTokenAuthResponseModel = class AccessTokenAuthResponseModel {
    constructor(token, user) {
        this.user = user;
        this.access_token = token;
    }
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)(),
    __metadata("design:type", String)
], AccessTokenAuthResponseModel.prototype, "access_token", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)(),
    __metadata("design:type", user_model_1.UserResponseModel)
], AccessTokenAuthResponseModel.prototype, "user", void 0);
AccessTokenAuthResponseModel = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        name: 'AccessTokenAuthResponseModel',
        description: 'Access token authentication response model',
    }),
    __metadata("design:paramtypes", [String, user_model_1.UserResponseModel])
], AccessTokenAuthResponseModel);
exports.AccessTokenAuthResponseModel = AccessTokenAuthResponseModel;
let AuthResponse = class AuthResponse {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        required: true,
    }),
    __metadata("design:type", Number)
], AuthResponse.prototype, "code", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'data',
        model: 'AccessTokenAuthResponseModel',
        required: true,
    }),
    __metadata("design:type", AccessTokenAuthResponseModel)
], AuthResponse.prototype, "data", void 0);
AuthResponse = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        name: 'AuthResponse',
        description: 'Authentication response',
    })
], AuthResponse);
exports.AuthResponse = AuthResponse;
let AuthErrorResponse = class AuthErrorResponse {
};
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'code',
        required: true,
    }),
    __metadata("design:type", Number)
], AuthErrorResponse.prototype, "code", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'message',
    }),
    __metadata("design:type", String)
], AuthErrorResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_express_ts_1.ApiModelProperty)({
        description: 'error',
        required: true,
    }),
    __metadata("design:type", String)
], AuthErrorResponse.prototype, "error", void 0);
AuthErrorResponse = __decorate([
    (0, swagger_express_ts_1.ApiModel)({
        description: 'Auth Error Response',
        name: 'AuthErrorResponse',
    })
], AuthErrorResponse);
exports.AuthErrorResponse = AuthErrorResponse;
//# sourceMappingURL=auth.model.js.map