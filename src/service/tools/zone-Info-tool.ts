import { tool } from "@langchain/core/tools"
import { z } from "zod"
import prisma  from "../../lib/prisma"


// Tool to fetch information about the zone by name
export const searchZones = tool(async ({ name }: { name: string }) => {
  try {
    const zone = await prisma.pointOfInterest.findMany({
      where: {
        type: {
          contains: name
        }
      }
    })
    
    return zone.length > 0 
      ? JSON.stringify(zone) 
      : `No zone found in database "${name}"`
  } catch (error) {
    console.error("Error searching zones:", error)
    return "Failed to search  for zones"
  }
}, {
  name: "searchZones",
  description: "get all the zones information",
  schema: z.object({
    name: z.string().describe("Fetch all the zones information")
  })
})



// Tool to find vehicles by name
export const getZoneInfoByType = tool(async ({ name }: { name: string }) => {
  try {
    const zone = await prisma.pointOfInterest.findFirst({
      where: {
        type: {
          contains: name,
           mode: 'insensitive'
        }
      }
    })
    
    return {
      zoneMaterial: zone.material,
      zoneMaterialQty: zone.quantity,
      zoneId: zone.id,
    }
  } catch (error) {
    console.error("Error searching vehicles by name:", error);
    return "Failed to search vehicles by name";
  }
}, {
  name: "getZoneByType",
  description: "Search for zone by name",
  schema: z.object({
    name: z.string().describe("Search for zone by name")
  })
})


// Tool to get a vehicle by their ID
export const getZoneInfoById = tool(async ({ id }: { id: number }) => {
    try {
      const zone = await prisma.pointOfInterest.findUnique({
        where: { id }
      })
      
      return {
        zoneMaterial: zone.material,
        zoneMaterialQty: zone.quantity,
        zoneId: zone.id,
      }
    } catch (error) {
      console.error("Error fetching vehicle by ID:", error)
      return "Failed to fetch vehicle by ID";
    }
  }, {
    name: "getZoneById",
    description: "Get a zone by their ID",
    schema: z.object({
      id: z.number().describe("The ID of the zone to fetch")
    })
  })

