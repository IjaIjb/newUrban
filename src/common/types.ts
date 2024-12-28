import { ChangeEventHandler, FocusEventHandler, ReactNode } from "react";

export enum USER_TYPE {
  PARK_OWNER = "parkOwner",
  PARK_MANAGER = "parkManager",
  DISPATCH_OFFICER = "dispatchOfficer",
}
export enum TitleEnum {
  MR = "MR",
  MRS = "MRS",
  MISS = "MISS",
  MS = "MS",
  ME = "ME",
  DR = "DR",
  PROF = "PROF",
  OTHER = "OTHER",
}

export enum AccountType {
  INDIVIDUAL = "IND",
  COPORATE = "COPORATE",
  PARKMANAGER = "PARKMANAGER",
}

export enum AccountCategory {
  PARK = "PARK",
  PASSENGER = "PASSENGER",
  PROVIDER = "PROVIDER",
  FLEET = "FLEET",
  DISPATCH = "DISPATCH",
}

export enum CarCategory {
  SEDAN = "SEDAN",
  BUS = "BUS",
  OTHERS = "OTHERS",
  VAN = "VAN",
}

export enum LuggageCategory {
  NORMAL = "NORMAL",
  EXTRA = "EXTRA",
}

export enum LogsCategory {
  NEW_TRIP = "NEW_TRIP",
  NEW_TRIP_BOOKING = "NEW_TRIP_BOOKING",
  NEW_TRIP_COMPLETION = "NEW_TRIP_COMPLETION",
  NEW_PASSENGER_REG = "NEW_PASSENGER_REG",
  NEW_FLEET_REG = "NEW_FLEET_REG",
  NEW_PROVIDER_REG = "NEW_PROVIDER_REG",
  NEW_DRIVER_REG = "NEW_DRIVER_REG",
  NEW_PARKMANAGER_REG = "NEW_PARKMANAGER_REG",
  NEW_PARKOWNER_REG = "NEW_PARKOWNER_REG",
  NEW_PARK = "NEW_PARK",
}

export enum TripStats {
  CANCELLED = "CANCELLED",
  SCHEDULED = "SCHEDULED",
  SUCCESSFUL = "SUCCESSFUL",
  COMPLETED = "COMPLETED",
}

export enum AccountNotification {
  NEW_TRIP = "NEW_TRIP",
  NEW_TRIP_BOOKING = "NEW_TRIP_BOOKING",
  TRIP_MODIFICATION = "TRIP_MODIFICATION",
  NEW_DISPATCH_OFFICER = "NEW_DISPATCH_OFFICER",
  NEW_PARK_MANAGER = "NEW_PARK_MANAGER",
}

export enum IncomingVehicleRequest {
  PROCESSED = "PROCESSED",
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label?: string | ReactNode;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  containerStyle?: string;
  inputStyle?: string;
  icon?: React.ReactNode;
  error?: string | boolean | undefined | any;
  placeholder?: string;
  ignoreMinDate?: boolean;
}

export type RadioOption = {
  label: string;
  value: string;
};

export type RadioSelectProps = {
  name: string;
  options: RadioOption[];
  formik: any;
};
export type DropDownSelectProps = {
  className?: string;
  label?: string | ReactNode;
  containerStyle?: string;
  options: RadioOption[] | any;
  value?: string;
  onSelect?: (e: string) => void;
  setSelectedOption?: (value: RadioOption) => void;
  placeholder: string;
  error?: any;
};

export interface RadioProps {
  name: string;
  options: { label: string; value: string }[];
  className?: string;
  customContainerStyle?: string;
  customActiveStyle?: string;
  customInputWrapperStyle?: string;
  data: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
}

export interface ParkUserData {
  accountCategory: AccountCategory;
  accountStats: string;
  accountType: AccountType;
  companyAddress: string;
  companyName: string;
  companyRc: string;
  country_: string;
  deviceInfo_: string | null;
  earnings: number;
  email_: string;
  firstName: string;
  isAccountVerified: false;
  isEmailVerified_: false;
  lastName: string;
  lastSeen_: Date;
  online_: false;
  phone_: string;
  regDate_: Date;
  totalTrip: number;
  userType?: string;
}

export interface ParkManagerData {
  accountCategory: AccountCategory;
  accountStats: string;
  accountType: AccountType;
  country_: string;
  deviceInfo_: null | undefined;
  earnings: number;
  email_: string;
  firstName: string;
  isAccountVerified: boolean;
  isEmailVerified_: boolean;
  lastName: string;
  lastSeen_: Date;
  online_: boolean;
  parkToManage: string;
  parkManagerIdentity: string;
  phone_: string;
  regDate_: Date;
  totalTrip: number;
  userType?: string;
}

export type addParkData = {
  address: string;
  createdAt: string;
  dispatchOfficers?: undefined | null;
  earnings: number;
  isDeleted: boolean;
  managerId: string;
  manager_id: string;
  ownerEmail: string;
  ownerId: string;
  parkApproval: boolean;
  parkCity: string;
  parkNameSearch: string;
  parkRegion: string;
  parkState: string;
  phone: string;
  searchParamByID: string[];
  searchParamByName: string[];
  parkName: string;
  parkId: string;
  totalTrip: number;
  successfulTrip: number;
  scheduledTrip: number;
  cancelledTrip: number;
  regDate_: Date;
};

export type TripData = {
  assignToDriverId: string;
  assignToProviderAgencyID: string;
  assignToProviderAgencyName: string;
  bookedSeats: number;
  coupon: string;
  createdBy: string;
  dateCreated: Date;
  departureCity: string;
  departureDayInt: number;
  departureFullDate: string;
  departureHour: string;
  departureMin: string;
  departureMonth: string;
  departurePark: string;
  departureParkId: string;
  departureTimePeriod: string;
  departureYear: number;
  destinationCity: string;
  fare: number;
  isAssign: boolean;
  isAssignTo: string;
  isPublic: boolean;
  luggageType: string;
  numberOfSeats: number;
  parkOwnerId: string;
  status: string;
  time: Date;
  tripCode: string;
  tripStatus: string;
  vehicleType: string;
};

export interface Park {
  id: string;
  name: string;
  parkOwnerId: string;
  parkManagerId: string | null;
  state: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  fullAddress: string;
  approved: boolean;
  createdAt: string;
  updatedAt: string;
  parkOwner: ParkOwner; // reference to nested ParkOwner interface
  parkManager: ParkOwner | null; // reference to nested ParkOwner interface (can be null)
  totalTrip: number;
  successfulTrip: number;
  scheduledTrip: number;
  cancelledTrip: number;
}

export interface ParkOwner {
  id: string;
  accountType: AccountType;
  country: string;
  isAccountVerified: boolean | null; // nullable boolean
  isEmailVerified_: boolean | null; // nullable boolean with odd naming convention (use a consistent naming style)
  lastSeen: string | null;
  online: boolean | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  accountType: AccountType;
  country: string;
  createdAt: string;
  email: string;
  id: string;
  isAccountVerified: null;
  isEmailVerified_: null;
  lastSeen: null;
  online: null;
  phoneNumber: string;
  status: "ACTIVE";
  updatedAt: string;
  verifiedAt: null;
  firstName: string;
  lastName: string;
  city: string;
  address: string;
  parkId?: string;
  park?: Park;
}

export type ParkManager = {
  createdAt: string; // ISO 8601 date string (e.g., "2024-05-15T14:46:08.000Z")
  deviceToken: string;
  email: string;
  firstName: string;
  fullName: string;
  id: string;
  lastName: string;
  parkId: string;
  parkName: string;
  password: string; // Hashed password, avoid storing actual password in plain text
  phoneNumber: string;
  providerAgencyId: string | null; // Allow null value
  status: "ACTIVE"; // Enforce status to be "ACTIVE"
  updatedAt: string; // ISO 8601 date string (e.g., "2024-05-15T14:46:08.000Z")
  urbanId: string;
  userId: string;
  userType: USER_TYPE.PARK_MANAGER; // Enforce user type to be "parkManager"
  verifiedAt: string | null; // Allow null value;
  someProperty?: any;
};

export interface Trip {
  bookedSeats: number;
  totalSeats: number;
  createdAt: string;
  date: string;
  dispatchOfficerId: string;
  driver: any;
  driverId: string;
  endCity: string;
  endState: string;
  fare: string;
  id: string;
  isPublic: boolean;
  lugage: string;
  park: Park;
  parkOwnerId: string;
  state: string;
  updatedAt: string;
  userId: string;
  vehicleType: string;
  tripCode: string;
  time: string;
}

export interface VehicleType {
  id: string;
  vehicleType: string;
  color: string;
  createdAt: string;
  driverId: string;
  plateNumber: string;
  providerAgencyId: string;
  registrationDate: string;
  seatArrangement: string;
  totalSeats: number;
  updatedAt: string;
}

export enum DriverRequestStatus {
  Pending = "pending",
  Processed = "processed",
  Canceled = "canceled",
}
