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
exports.AuthService = void 0;
const types_1 = __importDefault(require("@/constants/types"));
const user_model_1 = require("@/models/user.model");
const user_store_1 = require("@/stores/user.store");
const response_1 = require("@/utils/response");
const inversify_1 = require("inversify");
const user_services_1 = require("./user.services");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_model_1 = require("@/models/auth.model");
const google_auth_library_1 = require("google-auth-library");
const client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID, '', '');
let AuthService = class AuthService {
    constructor(userService, userStore) {
        this.userService = userService;
        this.userStore = userStore;
        this.getGoogleUser = (code) => {
            //verify the token using google client
            return client
                .verifyIdToken({ idToken: code, audience: process.env.GOOGLE_CLIENT_ID })
                .then((login) => {
                //if verification is ok, google returns a jwt
                var payload = login.getPayload();
                var userid = payload['sub'];
                //check if the jwt is issued for our client
                var audience = payload.aud;
                if (audience !== process.env.GOOGLE_CLIENT_ID) {
                    throw new Error('error while authenticating google user: audience mismatch: wanted [' +
                        process.env.GOOGLE_CLIENT_ID +
                        '] but was [' +
                        audience +
                        ']');
                }
                //promise the creation of a user
                return {
                    name: payload['name'],
                    pic: payload['picture'],
                    id: payload['sub'],
                    email_verified: payload['email_verified'],
                    email: payload['email'],
                };
            })
                .then((user) => {
                return user;
            })
                .catch((err) => {
                //throw an error if something gos wrong
                throw new Error('error while authenticating google user: ' + JSON.stringify(err));
            });
        };
        this.getFacebookUser = (code) => {
            let appToken;
            const client_id = process.env.FACEBOOK_CLIENT_ID;
            const client_secret = process.env.FACEBOOK_CLIENT_SECRET;
            let url = 'https://graph.facebook.com/oauth/access_token?client_id=' +
                client_id +
                '&client_secret=' +
                client_secret +
                '&grant_type=client_credentials';
            //login as a facebook app to get an "app token"
            return (fetch(url, { method: 'GET' })
                .then((response) => response.json())
                .then((response) => {
                appToken = response.access_token;
                //validate "social token", must pass the "app token"
                return fetch('https://graph.facebook.com/debug_token?input_token=' +
                    code +
                    '&access_token=' +
                    appToken, {
                    method: 'GET',
                });
            })
                .then((response) => response.json())
                .then((response) => {
                //check the audience of the token
                const { app_id, is_valid, user_id } = response.data;
                if (app_id !== client_id) {
                    throw new Error('invalid app id: expected [' +
                        client_id +
                        '] but was [' +
                        app_id +
                        ']');
                }
                //check if the token is valid
                if (!is_valid) {
                    throw new Error('token is not valid');
                }
                //get user profile using the app token
                return fetch('https://graph.facebook.com/v2.11/' +
                    user_id +
                    '?fields=id,name,picture,email&access_token=' +
                    appToken, {
                    method: 'GET',
                });
            })
                .then((response) => response.json())
                .then((response) => {
                // return the user profile
                const { id, picture, email, name } = response;
                let user = {
                    name: name,
                    pic: picture.data.url,
                    id: id,
                    email_verified: true,
                    email: email,
                };
                return user;
            })
                //throw an error if something goes wrong
                .catch((err) => {
                throw new Error('error while authenticating facebook user: ' + JSON.stringify(err));
            }));
        };
    }
    signToken(id) {
        return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SERCRET, {
            expiresIn: 60 * 60 * 24 * 30,
        });
    }
    verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        }
        catch (e) {
            throw new Error('jwt token not verified');
        }
    }
    async emailSignup(newUser) {
        try {
            const user = await this.userStore.getByEmail(newUser.email);
            if (user) {
                return (0, response_1.ResponseFailure)(400, `User with this email ${newUser.email.toLowerCase()} already exists`);
            }
            else {
                const response = await this.userService.create(newUser);
                if (!response.data) {
                    return response;
                }
                else {
                    const user = response.data;
                    const token = this.signToken(user._id);
                    return (0, response_1.ResponseSuccess)(201, new auth_model_1.AccessTokenAuthResponseModel(token, new user_model_1.UserResponseModel(user)));
                }
            }
        }
        catch (err) {
            return (0, response_1.ResponseFailure)(500, err);
        }
    }
    async emailSignin(userCredentials) {
        try {
            const user = await this.userStore.getByEmail(userCredentials.email);
            if (!user) {
                return (0, response_1.ResponseFailure)(400, `User with this email ${userCredentials.email} does not exist`);
            }
            else if ((await bcryptjs_1.default.compare(userCredentials.password, user.password)) == false) {
                return (0, response_1.ResponseFailure)(400, `User with this email ${userCredentials.email} bad password`);
            }
            else {
                const token = this.signToken(user._id);
                return (0, response_1.ResponseSuccess)(201, new auth_model_1.AccessTokenAuthResponseModel(token, new user_model_1.UserResponseModel(user)));
            }
        }
        catch (err) {
            console.log('Error catch triggered!', err);
            return (0, response_1.ResponseFailure)(500, err);
        }
    }
    async googleSignup(idToken) {
        try {
            const response = await this.getGoogleUser(idToken);
            console.log('response: ', response);
            return await this.emailSignup(response);
        }
        catch (error) {
            return (0, response_1.ResponseFailure)(500, error);
        }
    }
    async googleSignin(idToken) {
        try {
            const response = await this.getGoogleUser(idToken);
            console.log('response: ', response);
            return await this.authenticate(response.email);
        }
        catch (error) {
            return (0, response_1.ResponseFailure)(500, error);
        }
    }
    async facebookSignup(idToken) {
        try {
            const response = await this.getFacebookUser(idToken);
            console.log('response: ', response);
            return await this.emailSignup(response);
        }
        catch (error) {
            return (0, response_1.ResponseFailure)(500, error);
        }
    }
    async facebookSignin(idToken) {
        try {
            const response = await this.getFacebookUser(idToken);
            console.log('response: ', response);
            return await this.authenticate(response.email);
        }
        catch (error) {
            return (0, response_1.ResponseFailure)(500, error);
        }
    }
    async authenticate(email) {
        try {
            const user = await this.userStore.getByEmail(email);
            if (user) {
                const token = this.signToken(user._id);
                return (0, response_1.ResponseSuccess)(201, { token, user });
            }
            else {
            }
        }
        catch (err) {
            return (0, response_1.ResponseFailure)(500, err);
        }
    }
};
AuthService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(types_1.default.UserService)),
    __param(1, (0, inversify_1.inject)(types_1.default.UserStore)),
    __metadata("design:paramtypes", [user_services_1.UserService,
        user_store_1.UserStore])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.services.js.map