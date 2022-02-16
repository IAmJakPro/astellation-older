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
exports.AuthController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("../constants/types"));
const auth_services_1 = require("@/services/auth.services");
const response_1 = require("@/utils/response");
const swagger_express_ts_1 = require("swagger-express-ts");
const validation_1 = require("@/utils/validation");
const auth_model_1 = require("@/models/auth.model");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async emailSignup(req, res) {
        try {
            const resp = await this.authService.emailSignup(req.body);
            if (!resp) {
                res.status(400).send(`Object AuthResponse is null`);
            }
            else
                res.status(resp.code).send(resp);
        }
        catch (ex) {
            res.status(500).send((0, response_1.ResponseFailure)(500, ex));
        }
    }
    async emailSignin(req, res) {
        try {
            const resp = await this.authService.emailSignin(req.body);
            if (!resp) {
                res.status(400).send(`Object AuthResponse is null`);
            }
            else
                res.status(resp.code).send(resp);
        }
        catch (ex) {
            console.log(ex);
            res.status(500).send((0, response_1.ResponseFailure)(500, ex));
        }
    }
    async googleSignup(req, res) {
        try {
            const resp = await this.authService.googleSignup(req.body.accessToken);
            if (!resp) {
                res.status(400).send(`Object AuthResponse is null`);
            }
            else
                res.status(resp.code).send(resp);
        }
        catch (ex) {
            console.log(ex);
            res.status(500).send((0, response_1.ResponseFailure)(500, ex));
        }
    }
    async googleSignin(req, res) {
        try {
            const resp = await this.authService.googleSignin(req.body.accessToken);
            if (!resp) {
                res.status(400).send(`Object AuthResponse is null`);
            }
            else
                res.status(resp.code).send(resp);
        }
        catch (ex) {
            console.log(ex);
            res.status(500).send((0, response_1.ResponseFailure)(500, ex));
        }
    }
    /* @httpGet('/google/callback', passport.authenticate('google'))
    public async googleRedirect(req: Request, res: Response) {
      try {
        const reqUser = req.user as CreateUserRequest;
        const response = await this.authService.authenticate(reqUser);
        res.status(201).send(response);
      } catch (err) {
        res.status(500).send(ResponseFailure(500, err));
      }
    } */
    async facebookSignup(req, res) {
        try {
            const resp = await this.authService.facebookSignup(req.body.accessToken);
            if (!resp) {
                res.status(400).send(`Object AuthResponse is null`);
            }
            else
                res.status(resp.code).send(resp);
        }
        catch (ex) {
            console.log(ex);
            res.status(500).send((0, response_1.ResponseFailure)(500, ex));
        }
    }
    async facebookSignin(req, res) {
        try {
            const resp = await this.authService.facebookSignin(req.body.accessToken);
            if (!resp) {
                res.status(400).send(`Object AuthResponse is null`);
            }
            else
                res.status(resp.code).send(resp);
        }
        catch (ex) {
            console.log(ex);
            res.status(500).send((0, response_1.ResponseFailure)(500, ex));
        }
    }
    /* @httpGet('/facebook/callback', passport.authenticate('facebook'))
    public async facebookRedirect(req: Request, res: Response) {
      try {
        const reqUser = req.user as CreateUserRequest;
        console.log('requser: ', reqUser);
        const response = await this.authService.authenticate(reqUser);
        res.status(201).send(response);
      } catch (err) {
        res.status(500).send(ResponseFailure(500, err));
      }
    } */
    // Only authenticated users
    getProfile(req, res) {
        res.status(200).json({
            status: 'success',
            //data: req.user,
        });
    }
};
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        path: '/signup/email',
        description: 'Signup with email',
        summary: 'Email signup',
        parameters: {
            body: {
                description: 'Signup',
                required: true,
                model: 'UserEmailPasswordAuthRequest',
            },
        },
        responses: {
            200: { model: 'AuthResponse' },
            400: { model: 'AuthErrorResponse' },
            500: { model: 'AuthErrorResponse' },
        },
    }),
    (0, inversify_express_utils_1.httpPost)('/signup/email', (0, validation_1.validateBody)(auth_model_1.UserEmailPasswordAuthRequest)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "emailSignup", null);
__decorate([
    (0, swagger_express_ts_1.ApiOperationPost)({
        path: '/login/email',
        description: 'Login with email and password',
        summary: 'Email and Password login',
        parameters: {
            body: {
                description: 'Login',
                required: true,
                model: 'UserEmailPasswordAuthRequest',
            },
        },
        responses: {
            200: { model: 'AuthResponse' },
            400: { model: 'AuthErrorResponse' },
            500: { model: 'AuthErrorResponse' },
        },
    }),
    (0, inversify_express_utils_1.httpPost)('/login/email'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "emailSignin", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/signup/google'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleSignup", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/signup/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleSignin", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/signup/facebook'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookSignup", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)('/login/facebook'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "facebookSignin", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)('/profile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
AuthController = __decorate([
    (0, swagger_express_ts_1.ApiPath)({
        name: 'Authentication',
        path: '/auth',
    }),
    (0, inversify_express_utils_1.controller)('/auth'),
    __param(0, (0, inversify_1.inject)(types_1.default.AuthService)),
    __metadata("design:paramtypes", [auth_services_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map