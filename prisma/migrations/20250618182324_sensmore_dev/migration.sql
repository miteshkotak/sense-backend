-- AlterTable
ALTER TABLE "PointOfInterest" ADD COLUMN     "quantity" INTEGER,
ALTER COLUMN "material" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vehicle" ALTER COLUMN "fuel_capacity" DROP NOT NULL;
