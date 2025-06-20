
####Part A

##Left Screen View 

- Number of Vehicle 
- Poing of Interests (POI's)
- Scene 


## Right Screen View
- Selected Vehicle Details
    -- Size of the vehicle 
    -- Load carrying capacity
    -- Fuel indicator 
    -- Function of the Vehcile 
    -- Vehicle ID 
    -- Vehicle Status 
    --location. lat,log


#### Part B

##NLP/command planner  tals

## AI based Task Planner
    -- Operator specify the task and as planner to prepare a Plan
    -- Approve -> sent a plan or Decline the plan 
    -- Planner should have access to Selected vehicle's property





###Functional Requirements
-View/GET the vehicle status/information  (e.g. Truck A, B, C, D)
-View POI's , location ( e.g. Zone A, B, C)
-Convert Instruction to list of individual Tasks
    -list set of task
        -MOVE (source -> destination)
        -LOAD (source zone ( Material))
        -UNLOAD (destination)
        -Repeat

-Task planner to get selected vehicle's information       


###Non Functional Requirements
- High traffic or too many usuers using
- Realtime status update of vehicle and zone information





###API Endpoints####### 

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





##Assumption
-- Assuming the operator won't be able define a task properly so a Re Act agent will be useful in this case it provide reasoning before each step, use  tools to fetch information and continously self prompt, to improve the response in proper steps 


###Database
Vehicle
    -- ID: String = 'randomString'
    -- Capacity: number - 100 tons
    -- Fuel_Status: number = 1-100
    -- Type: String =  Loader, Crusher
    -- Status: string =  Moving, Loading, Idle, Stalled (  status usuful only for realtime information storage)
    -- Location: string[] = Latitude,longitude

POI'S
    -- ID: string = 'randomString'
    -- Material: string = zinc (Material A), iron (Material B), ore (Material C), waste (Material D)
    -- Location: string[] = Latitude, Longitude





### How to run 
    - Requires account within Supabase  
    - Creat .env variable file, with following key and values
        -OPENAI_API_KEY
        -DATABASE_URL (from Supabase, replace username, password )

    - RUN "npm i"
    - RUN "npm run db:migrate" 
    - RUN "npm run db:seed"      
    - RUN "npm run dev"











######Misscellineous 


//Prepare for technical Architecture 
-  what could be the scaling of this ??
- CAP ( consistant, available, fault tolerance) CA, CP, AP??


-- Supabase Credentials

Project: sensmore
pass:H!VtyC7V?c*XqYx

