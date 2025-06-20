import { ChatOpenAI } from "@langchain/openai"
import { Response } from 'express'
import { HumanMessage, SystemMessage } from '@langchain/core/messages'

import { createReactAgent } from "@langchain/langgraph/prebuilt"

import { getVehicleInfoByName, getvehicleInfoById, searchVehicles } from "../tools/vehicle-info-tool"
import { getZoneInfoById, getZoneInfoByType, searchZones } from "../tools/zone-Info-tool"
import { getSelectedVehicle }  from '../db/selected-vehicle-info'


const model = new ChatOpenAI({
    modelName: "gpt-4o-mini"
})

// const taskPlannerPrompt = `You are task planner assistant, break down the complex task statement to step by step process. 
// check for the vehicle's load carrying capacity, check material available capacity in a particular zone from database, due to vehicle's limited loading capacity it needs take mutiple turn to finish task, respond with structured step by step response, also check material quantity available in certain zones   - MOVE, LOAD, UNLOAD and REPEAT

// example  "Load 1500 tons of Material A and transport it to the crusher" to be decomposed into following steps:
// Tasks: 
// - Move Truck A to Zone A
// - Load 100 tons (Get the capacity of truck information from database)
// - Move to the crusher
// - Unload
// - Move Truck A to Zone A
// - Load 50 tons 
// - Move to the crusher
// - Unload
// - End

// do not add any additional texts to tasks list, use avialbel tools  to fetch related information about vehicle and zone , their quantity and load carray capacity
// `
const taskPlannerPrompt = `You are a task planning assistant. Break down the user’s complex task into a numbered, step-by-step list of actionable instructions.

**MANDATORY requirements:**
- Always retrieve up-to-date information about the specified vehicle(s) and zone(s) from the database before creating the plan.  
- Do NOT assume any vehicle capacity or material quantity — use the provided tools to look up:
  - Vehicle capacity
  - Material availability in the source zone
- Only plan tasks for the vehicle and zone(s) explicitly mentioned in the user’s query. Ignore any other zones or vehicles.
- If the user did not specify a material quantity to load, use the total quantity available in the specified source zone.
- Break the task into multiple trips if the vehicle’s capacity is less than the required quantity. Clearly number each step.
- For repeating trips:
  - Repeat MOVE/LOAD/UNLOAD as needed.
  - Clearly indicate trip repetition with “Repeat Steps X–Y for Trip N”.

**Allowed actions:**
- MOVE (specify vehicle and zone)
- LOAD (specify quantity and material)
- UNLOAD (specify destination zone)
- REPEAT (to indicate further trips)

**Response format:**
Produce **ONLY** a structured list of numbered steps as described — do not add any extra text outside this list.

**Example Input:**  
“Move 150 tons of Material A from Zone A to the crusher using Truck A”

**Example Output:**
Tasks:
	1.	Move Truck A to Zone A
	2.	Load 100 tons of Material A
	3.	Move Truck A to the crusher
	4.	Unload
  5.  Move Truck A to Zone A
  6.  Load 50 tons of Material A
  7.  Move Truck A to the crusher
  4.	Unload

**Tools you must use as needed:** 'getVehicleById', 'getVehicleByName', 'getZoneById', 'getZoneByType', 'searchVehicles', 'searchZones'.

`


const agent = createReactAgent({
    llm: model,
    tools: [
        searchVehicles,
        searchZones,
        getVehicleInfoByName,
        getvehicleInfoById,
        getZoneInfoById,
        getZoneInfoByType,
    ],
})



export const taskPlanningAgent = async (req, res: Response) => {
    try {

      const selectedVehicle = await getSelectedVehicle()

      console.log('getSelectedVehicle:', selectedVehicle)
     

      const promptWithContext = `Selected vehicle:
      ${selectedVehicle ? JSON.stringify(selectedVehicle, null, 2) : 'No vehicle selected'}
      ${taskPlannerPrompt}
      `


      const result = await agent.invoke({
        messages: [
          new SystemMessage(promptWithContext),
          new HumanMessage(req.body.task)
        ]
      }, { recursionLimit: 100 })
      
      console.log(result.messages[result.messages.length - 1].content);
      res.send(result.messages[result.messages.length - 1].content);
    } catch (error) {
      console.error('Error: ', error);
    }
  }