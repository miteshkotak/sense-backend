import express from 'express'
import { taskPlanningAgent } from './service/task/task-planner-agent'
import { vehicleInfoById, allVehicleInfo } from './service/db/vehicle-info'
import { zoneInfoById, allZoneInfo } from './service/db/zone-info'
import { publishTask } from './service/task/task-publish'
import { setSelectedVehicle } from './service/task/task-selectecd-vehicle'


const router = express.Router()

//Task endpoints
router.post('/taskPlannerAgent', taskPlanningAgent)
router.post('/task/post', publishTask)

//select entity endpoints
router.post('/task/setSelectedVehicle', setSelectedVehicle)


//DB info endpoints
router.get('/vehicle/info', vehicleInfoById)
router.get('/allVehicle/info', allVehicleInfo)
router.get('/zone/info', zoneInfoById)
router.get('/allzone/info', allZoneInfo)




export default router
