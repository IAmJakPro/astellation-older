"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBConnection = void 0;
const inversify_1 = require("inversify");
const mongodb_1 = require("mongodb");
const connStr = 'mongodb+srv://jaker:l7l6aqymJx4B54gL@cluster0.nzn2z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbName = 'myFirstDatabase';
let MongoDBConnection = class MongoDBConnection {
    static getConnection(result) {
        if (this.isConnected) {
            return result(this.db);
        }
        else {
            this.connect((error, db) => {
                return result(this.db);
            });
        }
    }
    static connect(result) {
        mongodb_1.MongoClient.connect(connStr, (err, client) => {
            this.db = client.db();
            this.isConnected = true;
            return result(err, this.db);
        });
    }
};
MongoDBConnection.isConnected = false;
MongoDBConnection = __decorate([
    (0, inversify_1.injectable)()
], MongoDBConnection);
exports.MongoDBConnection = MongoDBConnection;
//# sourceMappingURL=db.js.map