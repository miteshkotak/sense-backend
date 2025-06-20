
import prisma  from "../../lib/prisma"
import { Request, Response } from "express"


export const allZoneInfo = async (req: Request, res: Response) => {

      try {
         const zone = await prisma.pointOfInterest.findMany()
         res.json(zone)
  
      } catch (error) {
        console.error('Error: Fetching  all zone information from the Database ', error)
      }
}



export const zoneInfoById = async (req: Request, res: Response) => {
    try {
       const zone = await prisma.pointOfInterest.findFirst({
        where: {
          id: req.body.id
        }
      })
      
      res.json(zone)

    } catch (error) {
      console.error(`Error: Fetching ${req.body.id}  zone information from the Database`, error)
    }
  }


