"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
function createApp() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        // 1. CORS Configuration - Allow React frontend to make requests
        const corsOptions = {
            origin: [
                'http://localhost:3000', // React dev server
                'http://localhost:3001', // Alternative React port
                'http://localhost:5173', // Vite dev server
            ],
            credentials: true, // Allow cookies/auth headers
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: [
                'Content-Type',
                'Authorization',
                'X-Requested-With',
                'Accept',
                'Origin',
                'Cache-Constrol',
                'X-File-Name'
            ],
            exposedHeaders: ['Content-Range', 'X-Content-Range'],
            optionsSuccessStatus: 200 // Some legacy browsers choke on 204
        };
        app.use((0, cors_1.default)(corsOptions));
        // 2. Security middleware
        app.use((0, helmet_1.default)({
            crossOriginEmbedderPolicy: false, // Needed for some frontend frameworks
        }));
        // 3. Request parsing middleware
        app.use(express_1.default.json({ limit: '10mb' })); // Parse JSON bodies
        app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' })); // Parse URL-encoded bodies
        //app.use(express.text());                            // Parse text bodies
        //app.use(express.raw());                             // Parse raw bodies
        app.use((0, morgan_1.default)('combined')); // Log all requests
        app.use('/api/v1', routes_1.default);
        app.get('/', (req, res) => {
            res.send('System is online');
        });
        return app;
    });
}
//# sourceMappingURL=app.js.map