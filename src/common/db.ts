import Dexie, { Table } from "dexie";

export interface Trip {
  startLocation: string;
  startCity: string;
  arrivalCity: string;
  fare: number;
  isPublic: string;
  date: string; // If using a date object, consider Date type instead
  time: string; // If using a time object, consider a different type
  vehicleType: string;
  arrivalState?: string;
}

export interface ExtendedTrip extends Trip {
  tripId?: string;
  parkId?: string;
  departureTime: string;
  departureDate: string;
  endLocation: string;
}

export interface EditTrip {
  tripId: string;
  parkId: string;
  departureTime: string;
  departureDate: string;
  endLocation: string;
  isPublic: boolean;
  arrivalCity: string;
  vehicleType: string;
  fare: number;
  arrivalState?: string;
}

export class MySubClassedDexie extends Dexie {
  trips!: Table<ExtendedTrip>;
  editTrips!: Table<EditTrip>;
  constructor() {
    super("urbandb");
    this.version(2).stores({
      trips:
        "&tripId, parkId, departureTime, departureDate, endLocation, isPublic, arrivalState, arrivalCity, vehicleType, fare",
      editTrips:
        "&tripId, parkId, departureTime, departureDate, endLocation, isPublic, arrivalState, arrivalCity, vehicleType, fare",
    });
  }
}

export const db = new MySubClassedDexie();

async function updateTrip(
  tripId: string,
  newDepartureTime: string,
  newFare: number
) {
  await db.trips.update(tripId, {
    departureTime: newDepartureTime,
    fare: newFare,
  });
}

export async function updateEditTrip(tripId: string, data: any) {
  await db.editTrips.update(tripId, {
    tripId: data?.tripId, // Assuming tripId is a string, you can change its type accordingly
    parkId: data?.startLocation, // Assuming parkId is a string, you can change its type accordingly
    departureTime: data?.time, // You may want to use a Time object or a specific time format instead of string
    departureDate: data?.date, // You may want to use a Date object or a specific date format instead of string
    isPublic: data?.isPublic, // Assuming isPublic is a boolean, you can change its type accordingly
    arrivalCity: data?.arrivalCity,
    vehicleType: data?.vehicleType,
    fare: data?.fare,
  });
}

export async function addTrip(trip: ExtendedTrip) {
  await db.trips.add(trip);
}

export async function addEditTrip(trip: any) {
  await db.editTrips.add(trip);
}

export async function deleteTrip(tripId: string) {
  await db.trips.delete(tripId);
}
export async function deleteEditTrip(tripId: string) {
  await db.editTrips.delete(tripId);
}

export async function getAllTrips(): Promise<ExtendedTrip[]> {
  return await db.trips.toArray();
}

// Function to get a trip by tripId
export async function getTripById(
  tripId: string
): Promise<ExtendedTrip | undefined> {
  return await db.trips.get(tripId);
}

export async function getEditTripById(
  tripId: string
): Promise<EditTrip | undefined> {
  return await db.editTrips.get(tripId);
}
