"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskPlanner_1 = require("./taskPlanner");
const router = express_1.default.Router();
router.post('/taskPlanner', taskPlanner_1.taskPlanner);
router.post('/taskPlanner/agent', taskPlanner_1.taskPlanner);
exports.default = router;
//# sourceMappingURL=routes.js.map