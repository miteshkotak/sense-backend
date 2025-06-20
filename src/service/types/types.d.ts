import 'express-session';

declare module 'express-session' {
  interface SessionData {
    selectedVehicle?: {
      id: string;
      name: string;
      status: string;
      load_capacity: number;
      fuel_capacity: number;
      type: string;
      latitude: number;
      longitude: number;
    };
  }
}