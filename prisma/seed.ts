import prisma from '../src/lib/prisma'

async function seedVehicles() {
  console.log('🌱 Starting database seeding...')

    // Vehicle seed data
    const vehicleData = [
        {
          name: 'Vehicle A',
          load_capacity: 100, // 100ton
          fuel_capacity: 300,  // 300 liters
          type: 'TRUCK' as const,
          status: 'IDLE' as const,
          latitude: 52.5200,
          longitude: 13.4050
        },
        {
          name: 'Vehicle B',
          load_capacity: 80, // 8 tons
          fuel_capacity: 400,  // 400 liters
          type: 'TRUCK' as const,
          status: 'IDLE' as const,
          latitude: 52.5170,
          longitude: 13.3888
        },
        {
          name: 'Vehicle C',
          load_capacity: 80, // 6 tons
          fuel_capacity: 350,  // 350 liters
          type: 'TRUCK' as const,
          status: 'IDLE' as const,
          latitude: 52.5244,
          longitude: 13.4105
        },
        {
          name: 'Vehicle D',
          load_capacity: 70, // 7.5 tons
          fuel_capacity: 380,  // 380 liters
          type: 'TRUCK' as const,
          status: 'IDLE' as const,
          latitude: 52.4797,
          longitude: 13.4467
        },
        {
          name: 'Vehicle E',
          load_capacity: 100, // 4.5 tons
          fuel_capacity: 280,  // 280 liters
          type: 'TRUCK' as const,
          status: 'IDLE' as const,
          latitude: 52.5482,
          longitude: 13.4078
        }
      ]

 try {
    console.log('🗑️  Clearing existing vehicles...');
    await prisma.vehicle.deleteMany({});

    console.log('📝 Creating vehicles...');

    //create vehicle entry to DB

    const createdVehicles = await prisma.vehicle.createMany({
        data: vehicleData,
        skipDuplicates: true
    })

    console.log(`✅ Created ${createdVehicles.count} vehicles`);



    // Verify the created vehicles
    const totalVehicles = await prisma.vehicle.count();
    console.log(`📊 Total vehicles in database: ${totalVehicles}`);

    // Display created vehicles
    const vehicles = await prisma.vehicle.findMany({
      orderBy: { name: 'asc' }
    });

    console.log('\n📋 Created Vehicles:');
    console.table(vehicles.map(v => ({
      ID: v.id,
      Name: v.name,
      'Load Capacity (kg)': v.load_capacity,
      'Fuel Capacity (L)': v.fuel_capacity,
      Type: v.type,
      Status: v.status,
      Latitude: v.latitude,
      Longitude: v.longitude,
      Created: v.createdAt.toLocaleDateString()
    })));

 }catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}


async function seedPOIs() {
    console.log('🏗️ Starting POI seeding...');
  
    const poiData = [
      {
        type: 'crusher',
        latitude: 52.4885,
        longitude: 13.3400, 
      },
        {
        type: 'zone A',
        material: 'zinc',
        quantity: 500,
        latitude: 52.5200,
        longitude: 13.4050, 
      },
      {
        type: 'zone B',
        material: 'iron',
        quantity: 200,
        latitude: 52.5244,
        longitude: 13.4105, 
      },

      {
        type: 'zone C',
        material: 'lithium',
        quantity: 700,
        latitude: 52.5100,
        longitude: 13.3200, 
      },
      {
        type: 'parking',
        latitude: 52.5000,
        longitude: 13.3500, 
      }
    ];
  
    try {
      console.log('🗑️  Clearing existing POIs...');
      await prisma.pointOfInterest.deleteMany({});
  
      console.log('📍 Creating POIs...');
      
        
      const createdPOI = await prisma.pointOfInterest.createMany({
        data: poiData,
        skipDuplicates: true
      });
        
      console.log(`📊 Total POIs in database: ${createdPOI.count}`);
  
      const pois = await prisma.pointOfInterest.findMany({
        orderBy: [{ type: 'asc' }, { material: 'asc' }]
      });
  
      console.log('\n📋 Created POIs:');
      console.table(pois.map(p => ({
        ID: p.id,
        Type: p.type.toUpperCase(),
        Material: p.material,
        Latitude: p.latitude,
        Longitude: p.longitude,
        Created: p.createdAt.toLocaleDateString()
      })));
  
      // Summary by type
      const poiSummary = pois.reduce((acc, poi) => {
        acc[poi.type] = (acc[poi.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
  
      console.log('\n📈 POI Summary by Type:');
      console.table(poiSummary);
  
    } catch (error) {
      console.error('❌ Error seeding POIs:', error);
      throw error;
    }
  }


  async function seedAll() {
    console.log('🚀 Starting complete database seeding...');
    
    try {
      await seedVehicles(); // Seed vehicles
      await seedPOIs(); // Seed POIs
      console.log('🎉 Complete seeding finished successfully!');
    } catch (error) {
      console.error('💥 Complete seeding failed:', error);
      throw error;
    }
  }
  
  seedAll()


  