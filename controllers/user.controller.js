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
exports.UserController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("../constants/types"));
const user_services_1 = require("@/services/user.services");
const response_1 = require("@/utils/response");
const swagger_express_ts_1 = require("swagger-express-ts");
let UserController = class UserController {
    constructor(userServices) {
        this.userServices = userServices;
    }
    async index(req, res) {
        try {
            const response = await this.userServices.getAll();
            res.status(200).send(response);
        }
        catch (err) {
            res.status(400).send((0, response_1.ResponseFailure)(500, err));
        }
    }
};
__decorate([
    (0, swagger_express_ts_1.ApiOperationGet)({
        //path: '/',
        description: 'Get all users, this route is restricted to admins, it exists now only for test cases',
        summary: 'Get all users',
        responses: {
            200: { model: 'UserResponse' },
            400: { model: 'UserErrorResponse' },
            405: { model: 'UserErrorResponse' },
            500: { model: 'UserErrorResponse' },
        },
        security: { apiKeyHeader: [] },
    }),
    (0, inversify_express_utils_1.httpGet)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "index", null);
UserController = __decorate([
    (0, swagger_express_ts_1.ApiPath)({
        path: '/users',
        name: 'Users',
        security: { apiKeyHeader: [] },
    }),
    (0, inversify_express_utils_1.controller)('/users'),
    __param(0, (0, inversify_1.inject)(types_1.default.UserService)),
    __metadata("design:paramtypes", [user_services_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map