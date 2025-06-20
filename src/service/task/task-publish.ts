
import { Response, Request } from 'express'

export const publishTask = async (req: Request, res: Response) => {
    try {
        console.log(req.body.task)
        res.status(200).json({ success: true, message: "Message published successfully" })
    } catch (error: any) {
        res.status(500).json({ error: error.message })
    }
 
}