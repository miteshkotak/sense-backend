System Architecture Overview:

Application consists of a few key components working together to deliver a smooth and highly available experience:
	1.	Frontend Service (Operator-Facing UI)
The user interface that operators use is built as a frontend service.
	•	It communicates with the backend service over REST APIs.
	•	A load balancer sits in between the frontend and backend.
	•	This ensures that incoming API requests are evenly distributed across multiple backend instances, allowing the system to handle high traffic efficiently.
	2.	Backend Service
The backend contains the core business logic and is scaled across multiple servers for high availability and fault tolerance.
	•	The backend connects to a Postgres database (Supabase) as the primary data store.
	•	It also connects to a Redis cache to store frequently accessed data, which improves performance and reduces database load.
	•	Backend communicates with frontend via REST APIs.
	3.	IoT Devices (Mounted on Trucks)
Multiple IoT devices installed on trucks continuously send data to the backend:
	•	They establish persistent connections using WebSockets for real-time updates.
	•	They also communicate directly with Redis to quickly push real-time status and telemetry data (e.g. GPS location, fuel level, etc.) so that the backend can instantly access these updates.
	4.	Data Sync between Redis and Supabase
Redis acts as a high-speed cache and real-time data store:
	•	Frequently changing data is held in Redis to support instant access.
	•	Redis is synchronized with the Supabase database so that important data is persisted and consistent over time.

⸻

Summary:
In short, the architecture is built for scalability, speed, and real-time updates:
	•	The frontend communicates with the backend via REST through a load balancer.
	•	Backend servers scale out to support high availability.
	•	Redis provides caching and real-time data sharing between backend services and IoT devices.
	•	Supabase ensures long-term data persistence.

This setup enables the operators to manage trucks and view live status updates in a responsive, highly available application.