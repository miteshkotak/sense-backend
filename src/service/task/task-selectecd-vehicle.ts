import { Request, Response } from "express"
import redis from '../../redisClient'  


export const setSelectedVehicle = async (req: Request, res: Response) => {

    const { vehicle, userId } = req.body
    
    try {
        if (!userId) {
             res.status(400).send({ error: 'userId is required' })
        }

        await redis.set(`selectedVehicle:${userId}`, JSON.stringify(vehicle))
        res.status(200).send({ message: 'Selected vehicle updated!' })

    } catch (error) {
        console.error('Error: Setting selected vehicle ', error)
        res.status(500).send({ error: 'Internal Server Error' })
    }

}

