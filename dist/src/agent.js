"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("@langchain/openai");
const prompts_1 = require("@langchain/core/prompts");
const model = new openai_1.ChatOpenAI({
    modelName: "gpt-4o-mini",
    temperature: 0.2,
});
const taskPlannerPrompt = `You are task planner assistant, break down the complex task statement to step by step process of, check for the vehicle capacity in case of load and unloading material , due to vehicle's limited capacity there needs to repeatitaion of task, respon with structured step by step response   - MOVE, LOAD, UNLOAD and REPEAT

e.g.  "Load 150 tons of Material A and transport it to the crusher" to be decomposed into following steps:
Tasks: 
- Move Truck A to Zone A
- Load 100 tons (Get the capacity of truck information from database)
- Move to the crusher
- Unload
- Move Truck A to Zone A
- Load 50 tons 
- Move to the crusher
- Unload

do not add any additional texts to tasks list, just in the the blank from following
- Move Truck _ from to Location _
- Load Material _
- Unload
- Move Truck _ to location _


`;
const prompt = prompts_1.ChatPromptTemplate.fromMessages([
    [`system`, `${taskPlannerPrompt} `],
    new prompts_1.MessagesPlaceholder("chat_history"),
    ["human", "{input}"],
    new prompts_1.MessagesPlaceholder("agnet_scratchpad"),
]);
//# sourceMappingURL=agent.js.map