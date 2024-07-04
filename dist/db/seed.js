"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = __importDefault(require("./client"));
var faker_1 = require("@faker-js/faker");
client_1.default.serialize(function () {
    client_1.default.run('DROP TABLE lorem');
    client_1.default.run('CREATE TABLE lorem (id INTEGER, name TEXT)');
    var stmt = client_1.default.prepare('INSERT INTO lorem VALUES (?, ?)');
    for (var i = 0; i < 600; i++) {
        stmt.run("".concat(faker_1.faker.number.int()), "".concat(faker_1.faker.person.firstName()));
    }
    stmt.finalize();
    client_1.default.each('SELECT id, name FROM lorem', function (err, row) {
        console.log("".concat(row.id, ": ").concat(row.name));
    });
});
client_1.default.close();
//# sourceMappingURL=seed.js.map