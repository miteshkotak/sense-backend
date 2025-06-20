-- CreateEnum
CREATE TYPE "Status" AS ENUM ('MOVING', 'LOADING', 'UNLOADING', 'IDLE', 'STALLED');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('TRUCK', 'EXCAVATOR', 'BULLDOZER', 'SCRAPER');

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "load_capacity" INTEGER NOT NULL,
    "fuel_capacity" INTEGER NOT NULL,
    "type" "VehicleType" NOT NULL DEFAULT 'TRUCK',
    "status" "Status" NOT NULL DEFAULT 'IDLE',
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PointOfInterest" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PointOfInterest_pkey" PRIMARY KEY ("id")
);
