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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var App_1;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const inversify_express_utils_1 = require("inversify-express-utils");
const container_1 = require("./container");
const swagger = __importStar(require("swagger-express-ts"));
const swagger_express_ts_1 = require("swagger-express-ts");
let App = App_1 = class App {
    constructor() {
        this._app = new inversify_express_utils_1.InversifyExpressServer(container_1.container, null, {
            rootPath: '/api',
        });
    }
    start() {
        this._app.setConfig((app) => {
            if (App_1.NODE_ENV === 'development')
                app.use((0, morgan_1.default)('dev'));
            app.use('/api/docs', express_1.default.static('swagger'));
            app.use('/api-docs/swagger/assets', express_1.default.static('node_modules/swagger-ui-dist'));
            app.use(swagger.express({
                definition: {
                    info: {
                        title: 'Astellation API',
                        version: '1.0',
                    },
                    externalDocs: {
                        url: `http://localhost:${process.env.PORT || 5000}`,
                    },
                    securityDefinitions: {
                        apiKeyHeader: {
                            type: swagger_express_ts_1.SwaggerDefinitionConstant.Security.Type.API_KEY,
                            in: swagger_express_ts_1.SwaggerDefinitionConstant.Security.In.HEADER,
                            name: 'Authorization',
                        },
                    },
                    // Models can be defined here
                },
            }));
            app.use((0, helmet_1.default)());
            app.use(express_1.default.urlencoded({
                extended: true,
                limit: '10kb',
            }));
            app.use(express_1.default.json());
        });
        let app = this._app.build();
        return app;
    }
};
App.NODE_ENV = process.env.NODE_ENV || 'development';
App = App_1 = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], App);
exports.default = App;
//# sourceMappingURL=app.js.map