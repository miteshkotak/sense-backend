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
exports.taskPlanner = exports.OPENAI_API_KEY = void 0;
const openai_1 = require("@langchain/openai");
const config_1 = __importDefault(require("./config"));
exports.OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const taskPlannerPrompt = `You are task planner assistant, break down the complex task statement to step by step process of, check for the vehicle capacity in case of load and unloading material , due to vehicle's limited capacity there needs to repeatitaion of task, respon with structured step by step response   - MOVE, LOAD, UNLOAD and REPEAT

e.g.  "Load 150 tons of Material A and transport it to the crusher" could be decomposed into:
Move Truck A to Zone A
Load 100 tons (assuming a loading limit of 100 tons)
Move to the crusher
Unload
Repeat steps 2–4 until 150 tons have been transported.
`;
const taskPlanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Request Body (POST data)
    console.log('Request Body:', req.body);
    const llm = new openai_1.ChatOpenAI({
        model: "gpt-4o",
        temperature: 0,
        apiKey: config_1.default.open_ai_key
    });
    const aiMsg = yield llm.invoke([
        {
            role: "system",
            content: `${taskPlannerPrompt}`,
        },
        {
            role: "user",
            content: `${req.body.task}`,
        },
    ]);
    console.log('tasks: ', aiMsg.content);
    res.json({ plannedTask: `Planned version task: ${aiMsg.content}` });
});
exports.taskPlanner = taskPlanner;
//# sourceMappingURL=taskPlanner.js.map