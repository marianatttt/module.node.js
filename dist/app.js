"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const http = require('http');
const swaggerUi = __importStar(require("swagger-ui-express"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const routers_1 = require("./routers");
const configs_1 = require("./configs");
const routers_2 = require("./routers");
const crons_1 = require("./crons");
const swaggerJson = __importStar(require("./utils/swagger.json"));
const app = (0, express_1.default)();
const server = http.createServer(app);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_fileupload_1.default)());
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
io.on('connection', async (socket) => {
    const sockets = await io.fetchSockets();
    sockets.forEach((socket) => {
        console.log(socket.id);
    });
    socket.on('message:send', (text) => {
        io.emit('message:get', text);
    });
});
app.use("/users", routers_1.userRouter);
app.use("/auth", routers_2.authRouter);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson));
app.use((err, req, res, next) => {
    const status = err.status || 500;
    return res.status(status).json({
        message: err.message,
        status,
    });
});
server.listen(configs_1.configs.PORT, async () => {
    await mongoose_1.default.connect(configs_1.configs.DB_URL);
    (0, crons_1.cronRunner)();
    console.log(`start${configs_1.configs.PORT}`);
});
