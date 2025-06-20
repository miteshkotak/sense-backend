# Vehicle & Task Management System 🛠️

This repository contains the implementation of a **Vehicle & Task Management System** that enables operators to manage vehicles, assign tasks, and monitor Points of Interest (POIs) via a web interface.  
It integrates a backend service, real-time updates through Redis and WebSockets, and an AI-powered task planner.

---

## ✨ Application Overview

### 🖥️ Part A — UI Views

#### Left Screen View:
- 📍 Number of Vehicles
- 🗺️ Points of Interests (POIs)
- 🎬 Scene Overview

#### Right Screen View:
- 📄 Selected Vehicle Details:
  - 🚚 Size of Vehicle
  - ⚖️ Load Carrying Capacity
  - ⛽ Fuel Indicator
  - 🛠️ Vehicle Function
  - 🆔 Vehicle ID
  - 📡 Vehicle Status
  - 📍 Location (Latitude, Longitude)

---

### 🤖 Part B — AI-Based Task Planner
#### NLP/Command Planner:
- Operators can specify a task in natural language.
- AI-based planner breaks the request into actionable steps.
- Operator can **Approve** or **Decline** the plan.
- Planner can access the selected vehicle's properties.

---

## 🎯 Functional Requirements
- 📡 View/Get real-time status and information of:
  - Vehicles (e.g. Truck A, B, C, D)
  - Points of Interest / Zones (e.g. Zone A, B, C)
- 🧠 Convert natural language instructions into a list of structured tasks:
  - `MOVE` (Source → Destination)
  - `LOAD` (Source Zone with Material)
  - `UNLOAD` (Destination)
  - `REPEAT` if multiple trips required
- 🤖 Task planner must access the selected vehicle's properties before generating a plan.

---

## ⚙️ Non-Functional Requirements
- 📈 Scalable for high traffic with many concurrent users
- ⚡ Real-time updates on vehicle and zone status
- 🔄 Redis for caching frequently accessed data
- 📡 WebSocket connections to IoT devices on trucks
- 🧑‍💻 Backend service scaled to multiple servers for high availability

---

## 🌐 API Endpoints

#### 💼 Task Endpoints
| Method | Endpoint              | Description                 |
|--------|------------------------|-----------------------------|
| POST   | `/taskPlannerAgent`    | AI-based task planning      |
| POST   | `/task/post`           | Publish finalized task      |

#### 🚚 Select Entity Endpoints
| Method | Endpoint                  | Description               |
|--------|----------------------------|---------------------------|
| POST   | `/task/setSelectedVehicle` | Set the current vehicle   |

#### 🗄️ Data Endpoints
| Method | Endpoint             | Description                |
|--------|------------------------|----------------------------|
| GET    | `/vehicle/info`       | Get vehicle by ID         |
| GET    | `/allVehicle/info`    | Get all vehicles          |
| GET    | `/zone/info`          | Get zone by ID            |
| GET    | `/allzone/info`       | Get all zones             |

---

## 🤝 Assumptions
- Operators may not describe tasks perfectly — the AI agent will:
  - Clarify unclear requirements
  - Fetch up-to-date information using tools
  - Self-prompt to improve its response

---

## 🧠 Database Structure

#### 🛻 Vehicles
| Field         | Type             | Description                  |
|---------------|------------------|------------------------------|
| ID            | string           | Unique vehicle ID           |
| Capacity      | number           | Capacity in tons            |
| Fuel_Status   | number (1-100)   | Fuel level (%)               |
| Type          | string           | Loader, Crusher, etc.       |
| Status        | string           | Moving, Loading, Idle, etc. |
| Location      | string[]         | Latitude, Longitude         |

#### 🧭 Points of Interest (POIs)
| Field         | Type             | Description                  |
|---------------|------------------|------------------------------|
| ID            | string           | Unique POI ID               |
| Material      | string           | e.g. zinc, iron, ore, waste |
| Location      | string[]         | Latitude, Longitude         |

---

## ⚙️ How to Run

1. 🧰 Requires a **Supabase** account.
2. ✍️ Create a `.env` file with:
   ```env
   OPENAI_API_KEY=<your_openai_api_key>
   DATABASE_URL=<your_supabase_database_url>

######Misscellineous 

3.	📦 Install dependencies:
npm i

4.	🗄️ Set up database:    

npm run db:migrate
npm run db:seed


5.	▶️ Start the development server:

npm run dev
