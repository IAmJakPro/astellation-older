"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFailure = exports.ResponseError = exports.ResponseSuccess = exports.IModelResponse = void 0;
class IModelResponse {
}
exports.IModelResponse = IModelResponse;
const dictCodeHttpResponse = {
    //2xx - Success
    //It means the action was successfully received, understood, and accepted.
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    204: 'No Content',
    //4xx - Client Error
    //It means the request contains incorrect syntax or cannot be fulfilled.
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    408: 'Request Time-out',
    //5xx - Server Error
    //It means the server failed to fulfill an apparently valid request.
    500: 'Internal Server Error',
    501: 'Not Implemented',
    503: 'Service Unavailable',
    504: 'Gateway Time-out',
    507: 'Insufficient storage',
    509: 'Bandwidth Limit Exceeded',
    520: 'Unknown Error',
};
function ResponseSuccess(code, data) {
    const response = new IModelResponse();
    response.code = code;
    response.data = data;
    return response;
}
exports.ResponseSuccess = ResponseSuccess;
function ResponseError(error) {
    const response = new IModelResponse();
    if (typeof error.code != typeof Number) {
        response.code = 500;
    }
    else {
        response.code = error.code;
    }
    response.error = dictCodeHttpResponse[error.code];
    response.message = error.message;
    return response;
}
exports.ResponseError = ResponseError;
function ResponseFailure(code, message) {
    const response = new IModelResponse();
    response.code = code;
    response.error = dictCodeHttpResponse[code];
    response.message = message;
    return response;
}
exports.ResponseFailure = ResponseFailure;
//# sourceMappingURL=response.js.map