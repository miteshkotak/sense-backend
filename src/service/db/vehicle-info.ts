
import prisma  from "../../lib/prisma"
import { Request, Response } from "express"


export const allVehicleInfo = async (req: Request, res: Response) => {
    try {
       const vehicle = await prisma.vehicle.findMany()
      res.json(vehicle)

    } catch (error) {
      console.error('Error: Fetching all vehicle information from the Database ', error)
    }
  }

export const vehicleInfoById = async (req: Request, res: Response) => {

    try {
       const vehicle = await prisma.vehicle.findFirst({
        where: {
          id: req.body.id
        }
      });
      
      res.json(vehicle)

    } catch (error) {
      console.error(`Error: Fetching ${req.body.id}  vehicle information from the Database`, error)
    }
  }
