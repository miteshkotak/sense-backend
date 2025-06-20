import express, {Express} from 'express'
import allRoutes  from './routes'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import './redisClient'



export async function createApp(): Promise<Express>{
  
    const app = express()


    // CORS Configuration - Allow React frontend to make requests
    const corsOptions = {
      origin: [
        'http://localhost:3000',    // React dev server
        'http://localhost:3001',    // Alternative React port
        'http://localhost:5173',    // Vite dev server
      ],
      credentials: true,            // Allow cookies/auth headers
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept',
        'Origin',
        'Cache-Constrol',
        'X-File-Name'
      ],
      exposedHeaders: ['Content-Range', 'X-Content-Range'],
      optionsSuccessStatus: 200 // Some legacy browsers choke on 204

    }

      app.use(cors(corsOptions))
      
      
        //  Security middleware
      app.use(helmet({
        crossOriginEmbedderPolicy: false, // Needed for some frontend frameworks
      }))

      app.use(express.json({ limit: '10mb' }))
      app.use(express.urlencoded({ extended: true, limit: '10mb' }))
  
      
      app.use(morgan('combined'))

      app.use('/api/v1', allRoutes)

      app.get('/', (req, res) => {
      res.send('System is online')
    })

    return app
}




