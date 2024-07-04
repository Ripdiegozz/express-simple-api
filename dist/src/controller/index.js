"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLoremById = exports.updateLoremById = exports.getLoremByName = exports.getLoremById = exports.getAllLorem = exports.createLorem = void 0;
var client_1 = __importDefault(require("../../db/client"));
var faker_1 = require("@faker-js/faker");
var createLorem = function (req, res) {
    var person = req.body.person;
    console.log(person);
    if (!person.id)
        return res.status(400).json("A valid person must be provided!");
    var stmt = client_1.default.prepare("INSERT INTO lorem VALUES (?, ?)");
    var personToSave = {
        id: faker_1.faker.number.int({
            min: 1,
        }),
        name: person.name,
    };
    stmt.run(personToSave.id, person.name);
    return res.status(201).json(personToSave);
};
exports.createLorem = createLorem;
var getAllLorem = function (req, res) {
    client_1.default.all("SELECT * FROM lorem", function (err, rows) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(rows);
    });
};
exports.getAllLorem = getAllLorem;
var getLoremById = function (req, res) {
    var id = req.params.id;
    client_1.default.get("SELECT * FROM lorem WHERE id = ?", [id], function (err, row) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(row);
    });
};
exports.getLoremById = getLoremById;
var getLoremByName = function (req, res) {
    var name = req.params.name;
    client_1.default.all("SELECT * FROM lorem WHERE name LIKE ?", ["%".concat(name, "%")], function (err, rows) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(rows);
    });
};
exports.getLoremByName = getLoremByName;
var updateLoremById = function (req, res) {
    var person = req.body.person;
    console.log(person);
    if (!person.id)
        return res.status(400).json("A valid person must be provided!");
    else
        client_1.default.all("UPDATE lorem SET name = ? WHERE id = ?", [person.name, person.id], function (err) {
            if (err)
                return res.status(500).json({ message: err.message });
            return res.json("Person edited correctly: ".concat(JSON.stringify(person)));
        });
};
exports.updateLoremById = updateLoremById;
var deleteLoremById = function (req, res) {
    var id = req.params.id;
    console.log(id);
    if (!id)
        return res.status(400).json("An ID must be provided!");
    else
        client_1.default.all("DELETE FROM lorem WHERE id = ?", [id], function (err) {
            if (err)
                return res.status(500).json({ message: err.message });
            return res.json("Person deleted correctly with id: ".concat(id));
        });
};
exports.deleteLoremById = deleteLoremById;
//# sourceMappingURL=index.js.map