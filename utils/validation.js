"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateParams = exports.validateQuery = exports.validateBody = exports.validate = exports.Constraint = exports.Key = void 0;
require("reflect-metadata");
const lodash_1 = __importDefault(require("lodash"));
const joi_1 = __importDefault(require("joi"));
const response_1 = require("./response");
exports.Key = 'AnnotationMeta';
function Constraint(joi) {
    return function (target, propertyKey) {
        let meta = lodash_1.default.assign({}, Reflect.getMetadata(exports.Key, target.constructor));
        meta[propertyKey] = joi;
        Reflect.defineMetadata(exports.Key, meta, target.constructor);
    };
}
exports.Constraint = Constraint;
function validate(targetClass, instance) {
    let meta = Reflect.getMetadata(exports.Key, targetClass);
    if (!meta) {
        return {
            error: null,
            value: {},
        };
    }
    let schema = meta.__schema;
    if (!schema) {
        schema = joi_1.default.object().keys(meta);
        meta.__schema = schema;
        Reflect.defineMetadata(exports.Key, meta, targetClass);
    }
    //return joi.validate<any>(instance, schema);
    return schema.validate(instance);
}
exports.validate = validate;
function validateBody(bodyType) {
    return (req, res, next) => {
        Object.setPrototypeOf(req.body, new bodyType());
        let validation = validate(bodyType, req.body);
        if (validation.error) {
            const response = new response_1.IModelResponse();
            response.code = 400;
            response.error = 'BODY.ERROR';
            response.message = validation.error.message;
            res.status(400);
            return res.json(response);
        }
        next();
    };
}
exports.validateBody = validateBody;
function validateQuery(queryType) {
    return (req, res, next) => {
        Object.setPrototypeOf(req.query, new queryType());
        let validation = validate(queryType, req.query);
        if (validation.error) {
            const response = new response_1.IModelResponse();
            response.code = 400;
            response.error = 'QUERY.ERROR';
            response.message = validation.error.message;
            res.status(400);
            return res.json(response);
        }
        next();
    };
}
exports.validateQuery = validateQuery;
function validateParams(paramType) {
    return (req, res, next) => {
        Object.setPrototypeOf(req.params, new paramType());
        let validation = validate(paramType, req.params);
        if (validation.error) {
            const response = new response_1.IModelResponse();
            response.code = 400;
            response.error = 'PARAMS.ERROR';
            response.message = validation.error.message;
            res.status(400);
            return res.json(response);
        }
        next();
    };
}
exports.validateParams = validateParams;
//# sourceMappingURL=validation.js.map