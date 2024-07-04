"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var node_fs_1 = __importDefault(require("node:fs"));
var node_path_1 = __importDefault(require("node:path"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT || 3000;
// create a write stream (in append mode)
var accessLogStream = node_fs_1.default.createWriteStream(node_path_1.default.join(__dirname, "access.log"), {
    flags: "a",
});
app.use(express_1.default.json());
app.use((0, morgan_1.default)("combined", {
    stream: accessLogStream,
}));
app.use(routes_1.default);
app.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port, " :PPP"));
});
//# sourceMappingURL=index.js.map