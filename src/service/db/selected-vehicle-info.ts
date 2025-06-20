import redis from '../../redisClient'


export const getSelectedVehicle = async () => {
    try {
        const userId  = 'sensmore_dev_operator'
  
        if (!userId || typeof userId !== 'string') {
            return ({ error: 'userId is required' })
        }
    
        const vehicleData = await redis.get(`selectedVehicle:${userId}`);
    
        if (!vehicleData) {
            return ({ message: 'No selected vehicle found' })
        }
    
        const vehicle = JSON.parse(vehicleData)
        return vehicle
    } catch (error) {
        console.error('Error: Fetching selected vehicle ', error)
    }
  }