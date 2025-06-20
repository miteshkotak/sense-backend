"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedVehicles = seedVehicles;
exports.seedPOIs = seedPOIs;
exports.seedAll = seedAll;
const prisma_1 = __importDefault(require("../src/lib/prisma"));
function seedVehicles() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🌱 Starting database seeding...');
        // Vehicle seed data
        const vehicleData = [
            {
                name: 'Vehicle A',
                load_capacity: 5000, // 5 tons  //Assuming 1000kg is 1 ton 
                fuel_capacity: 300, // 300 liters
                type: 'TRUCK',
                status: 'IDLE',
                latitude: 52.5200,
                longitude: 13.4050
            },
            {
                name: 'Vehicle B',
                load_capacity: 8000, // 8 tons
                fuel_capacity: 400, // 400 liters
                type: 'TRUCK',
                status: 'IDLE',
                latitude: 52.5170,
                longitude: 13.3888
            },
            {
                name: 'Vehicle C',
                load_capacity: 6000, // 6 tons
                fuel_capacity: 350, // 350 liters
                type: 'TRUCK',
                status: 'IDLE',
                latitude: 52.5244,
                longitude: 13.4105
            },
            {
                name: 'Vehicle D',
                load_capacity: 7500, // 7.5 tons
                fuel_capacity: 380, // 380 liters
                type: 'TRUCK',
                status: 'IDLE',
                latitude: 52.4797,
                longitude: 13.4467
            },
            {
                name: 'Vehicle E',
                load_capacity: 4500, // 4.5 tons
                fuel_capacity: 280, // 280 liters
                type: 'TRUCK',
                status: 'IDLE',
                latitude: 52.5482,
                longitude: 13.4078
            }
        ];
        try {
            console.log('🗑️  Clearing existing vehicles...');
            yield prisma_1.default.vehicle.deleteMany({});
            console.log('📝 Creating vehicles...');
            //create vehicle entry to DB
            const createdVehicles = yield prisma_1.default.vehicle.createMany({
                data: vehicleData,
                skipDuplicates: true
            });
            console.log(`✅ Created ${createdVehicles.count} vehicles`);
            // Verify the created vehicles
            const totalVehicles = yield prisma_1.default.vehicle.count();
            console.log(`📊 Total vehicles in database: ${totalVehicles}`);
            // Display created vehicles
            const vehicles = yield prisma_1.default.vehicle.findMany({
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
        }
        catch (error) {
            console.error('❌ Error seeding database:', error);
            throw error;
        }
    });
}
function seedPOIs() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🏗️ Starting POI seeding...');
        // Berlin area coordinates for different POI types
        const poiData = [
            // Crushers - Heavy machinery locations
            {
                type: 'crusher',
                material: 'concrete',
                latitude: 52.4885,
                longitude: 13.3400, // Southwest Berlin industrial area
            },
            {
                type: 'crusher',
                material: 'asphalt',
                latitude: 52.5600,
                longitude: 13.2900, // Northwest Berlin industrial zone
            },
            {
                type: 'crusher',
                material: 'mixed_debris',
                latitude: 52.4300,
                longitude: 13.5200, // Southeast Berlin
            },
            // Zone A - High priority work areas
            {
                type: 'zone A',
                material: 'construction_waste',
                latitude: 52.5200,
                longitude: 13.4050, // Berlin Center
            },
            {
                type: 'zone A',
                material: 'steel_rebar',
                latitude: 52.5170,
                longitude: 13.3888, // Near Brandenburg Gate
            },
            // Zone B - Medium priority areas
            {
                type: 'zone B',
                material: 'wood_waste',
                latitude: 52.5244,
                longitude: 13.4105, // Alexanderplatz area
            },
            {
                type: 'zone B',
                material: 'brick_rubble',
                latitude: 52.4950,
                longitude: 13.4400, // South central Berlin
            },
            {
                type: 'zone B',
                material: 'glass_waste',
                latitude: 52.5350,
                longitude: 13.3700, // Tiergarten area
            },
            // Zone C - Lower priority areas
            {
                type: 'zone C',
                material: 'soil_dirt',
                latitude: 52.4797,
                longitude: 13.4467, // Tempelhof area
            },
            {
                type: 'zone C',
                material: 'general_debris',
                latitude: 52.5100,
                longitude: 13.3200, // Western Berlin
            },
            // Storage facilities
            {
                type: 'storage',
                material: 'aggregates',
                latitude: 52.5482,
                longitude: 13.4078, // Wedding District
            },
            {
                type: 'storage',
                material: 'recycled_materials',
                latitude: 52.4600,
                longitude: 13.3800, // South Berlin
            },
            {
                type: 'storage',
                material: 'sand_gravel',
                latitude: 52.5700,
                longitude: 13.4200, // North Berlin
            },
            // Parking areas
            {
                type: 'parked',
                material: 'vehicle_staging',
                latitude: 52.5000,
                longitude: 13.3500, // West central Berlin
            },
            {
                type: 'parked',
                material: 'equipment_storage',
                latitude: 52.5300,
                longitude: 13.4500, // East central Berlin
            }
        ];
        try {
            // Clear existing POIs (optional)
            console.log('🗑️  Clearing existing POIs...');
            yield prisma_1.default.pOI.deleteMany({});
            console.log('📍 Creating POIs...');
            // Create POIs with detailed logging
            for (let i = 0; i < poiData.length; i++) {
                const poi = poiData[i];
                const createdPOI = yield prisma_1.default.pOI.create({
                    data: poi
                });
                console.log(`✅ Created ${poi.type.toUpperCase()} POI for ${poi.material} at (${poi.latitude}, ${poi.longitude})`);
            }
            // Verify the created POIs
            const totalPOIs = yield prisma_1.default.pOI.count();
            console.log(`📊 Total POIs in database: ${totalPOIs}`);
            // Display created POIs grouped by type
            const pois = yield prisma_1.default.pOI.findMany({
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
            }, {});
            console.log('\n📈 POI Summary by Type:');
            console.table(poiSummary);
        }
        catch (error) {
            console.error('❌ Error seeding POIs:', error);
            throw error;
        }
    });
}
// Combined seeding function for both Vehicles and POIs
function seedAll() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🚀 Starting complete database seeding...');
        try {
            yield seedVehicles(); // Seed vehicles
            yield seedPOIs(); // Seed POIs
            console.log('🎉 Complete seeding finished successfully!');
        }
        catch (error) {
            console.error('💥 Complete seeding failed:', error);
            throw error;
        }
    });
}
//# sourceMappingURL=seed.js.map