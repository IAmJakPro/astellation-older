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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBClient = void 0;
const mongodb_1 = require("mongodb");
const inversify_1 = require("inversify");
const db_1 = require("@/config/db");
let MongoDBClient = class MongoDBClient {
    constructor() {
        db_1.MongoDBConnection.getConnection((connection) => {
            this.db = connection;
            console.log('Database Connected!');
        });
    }
    find(collection, filter, result) {
        this.db
            .collection(collection)
            .find(filter)
            .toArray((error, find) => {
            return result(error, find);
        });
    }
    findOneById(collection, objectId, result) {
        this.db
            .collection(collection)
            .find({ _id: new mongodb_1.ObjectID(objectId) })
            .limit(1)
            .toArray((error, find) => {
            return result(error, find[0]);
        });
    }
    insert(collection, model, result) {
        this.db.collection(collection).insertOne(model, (error, insert) => {
            return result(error, insert.insertedId);
        });
    }
    update(collection, objectId, model, result) {
        this.db
            .collection(collection)
            .updateOne({ _id: new mongodb_1.ObjectID(objectId) }, { $set: model }, (error, update) => result(error, model));
    }
    remove(collection, objectId, result) {
        this.db
            .collection(collection)
            .deleteOne({ _id: new mongodb_1.ObjectID(objectId) }, (error, remove) => {
            return result(error, remove);
        });
    }
    findOne(collection, filter, result) {
        this.db.collection(collection).findOne(filter, (error, find) => {
            return result(error, find);
        });
    }
};
MongoDBClient = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], MongoDBClient);
exports.MongoDBClient = MongoDBClient;
//# sourceMappingURL=db.services.js.map