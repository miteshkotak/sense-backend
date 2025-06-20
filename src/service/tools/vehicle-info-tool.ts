import { tool } from "@langchain/core/tools"
import { z } from "zod"
import prisma  from "../../lib/prisma"


// Tool to fetch all vehicles information
export const searchVehicles = tool(async ({ name }: { name: string }) => {
  try {
    const vehicle = await prisma.vehicle.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    });
    
    return vehicle.length > 0 
      ? JSON.stringify(vehicle) 
      : `No vehicle found with name containing "${name}"`
  } catch (error) {
    console.error("Error searching vehicles by name:", error)
    return "Failed to search vehicles by name";
  }
}, {
  name: "searchVehicles",
  description: "Fetch information for all the vehicles",
  schema: z.object({
    name: z.string().describe("Fetch information for all the vehicles")
  })
})



// Tool to find vehicles by name
export const getVehicleInfoByName = tool(async ({ name }: { name: string }) => {
  try {
    const vehicle = await prisma.vehicle.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive'
        }
      }
    })

    if (!vehicle) {
      return `No vehicle found with name containing "${name}"`;
    }

    
    return {
      vehicleCapacity: vehicle.load_capacity,
      vehicleId: vehicle.id,
    }
  } catch (error) {
    console.error("Error searching vehicles by name:", error)
    return "Failed to search vehicles by name"
  }
}, {
  name: "getVehicleInfoByName",
  description: "Search for vehicle information by name (case insensitive, partial matches)",
  schema: z.object({
    name: z.string().describe("Search for vehicle information by name ")
  })
})


// Tool to get a vehicle by their ID
export const getvehicleInfoById = tool(async ({ id }: { id: number }) => {
    try {
      const vehicle = await prisma.vehicle.findUnique({
        where: { id }
      });
      
      return {
        vehicleCapacity: vehicle.load_capacity,
        vehicleId: vehicle.id,
      }
    } catch (error) {
      console.error("Error fetching vehicle by ID:", error)
      return "Failed to fetch vehicle by ID"
    }
  }, {
    name: "getvehicleById",
    description: "Get a vehicle by their ID",
    schema: z.object({
      id: z.number().describe("et a vehicle by their ID")
    })
  })
