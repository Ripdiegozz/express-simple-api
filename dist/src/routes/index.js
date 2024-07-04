"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var controller_1 = require("../controller");
var router = (0, express_1.Router)();
router.get("/", function (req, res) {
    res.json("Hello world");
});
router.get('/person', controller_1.getAllLorem);
router.get('/person/id/:id', controller_1.getLoremById);
router.get('/person/name/:name', controller_1.getLoremByName);
router.put('/person', controller_1.updateLoremById);
router.delete('/person/:id', controller_1.deleteLoremById);
exports.default = router;
//# sourceMappingURL=index.js.map