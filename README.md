# IoT Water-Level Monitoring System

React.js frontend that connects to a OneM2M server to display status of system and generate inferences from uploaded data.

## Quick Start Guide
Enter the following commands into your terminal
```
git clone https://github.com/KevinVargis/water-level-dashboard
cd water-level-dashboard/frontend
node proxy.js
npm install
npm start
```
The Webapp will now be running at http://localhost:3000/

## Pages
- Dashboard
	- Displays all the immediate data that would be needed during day-to-day usage, such as Water Level in the tank and the Motor Status
### Primary Inferences
- Water Level Graph
	- Has a menu to select a duration of time
	- Displays the water level data pushed from the sensor within the selected time range
- Motor Status Graph
	- Has a menu to select a duration of time
	- Displays the motor status data pushed from the sensor within the selected time range
### Secondary Inferences
- Water Usage Graph	
	- Partitions all the data present on the server into slices based on time interval
	- For example, selecting 1 Day partitions the data into sets of consecutive 24-hour periods
	- We can then use the motor status over time and the flow rate of the motor to calculate the water usage in that partition
### Tertiary Inferences
- Usage Statistics
	- As we can calculate the water usage for different time intervals, this information can be used to calculate the average daily and monthly water usage statistics.