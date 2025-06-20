Case Study: AI Machine Command Center

Requirements:
A map displaying all vehicles and points of interest (POIs) on the left side of the screen
A detailed overview of the selected vehicle, including a chat feature, on the right side of the screen
Ability for the operator to assign tasks to the vehicle




Example Tasks:
Load 500 tons of Material A and transport it to the crusher
Fill the crusher with a mixture of Material A and Material B
Clear Zone A by moving all material to Zone B or C




Task Decomposition:
The system should automatically break down instructions into individual steps. For example, the task "Load 150 tons of Material A and transport it to the crusher" could be decomposed into:
Move Truck A to Zone A
Load 100 tons (assuming a loading limit of 100 tons)
Move to the crusher
Unload
Repeat steps 2–4 until 150 tons have been transported.



Task Visualization:
The decomposed task should be presented to the user in a clear and understandable format. The user should have the option to either accept or reject the proposed plan.
