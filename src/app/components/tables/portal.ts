export interface SideNavigation {
  name: string;
  url: string;
  iconUrl: string;
  hasChildren: boolean;
  hasSelector: boolean;
  children?: Children[];
  type?: string;
}

export interface Children {
  name: string;
  url: string;
  iconUrl: string;
}
export interface Column {
  key: string;
  header: string;
}

export interface RowData {
  id: string;
  [key: string]: any;
}
export interface IRole {
  id?: string;
  title: string;
  reportingTo: string;
  permissions: any[];
  status?: string;
}
export interface Permission {
  id: string;
  name: string;
}
export interface ITableToolBar {
  searchBy?: string;
  optionValue: string;
  handleChange: any;
  selectedRows: any[];
  dataset: any[];
  update?: any;
  onSearch?: any;
}
export interface MainTableProps {
  identifier: string;
  data: any;
  handleSearch: Function;
  handleFilter: Function;
  columns: { key: string; header: string }[];
  actionObject?: any;
  searchBy?: any;
  detailsProps?: any;
  onExport?: any;
  filterMenu?: any;
  apiSearch: Function;
  hideSearch?: boolean;
  hideExport?: boolean;
}

export interface ISubUser {
  name: string;
  email: string;
  password: string;
  phoneCode: string;
  phoneNumber: string;
  roleId: string;
}

export interface ICity {
  cityName: string;
  price: number;
  provider: {
    name: string;
    id: string;
  };
  destinationCode: string;
  minDay: number;
  maxDay: number;
  description: string;
}

export type IRoles = IRoleObject[];
export interface IRoleObject {
  id: string;
  title: string;
  orgId: number;
  status: string;
  permissions: string[];
  createdBy: CreatedBy;
  reportingTo: ReportingTo;
}

export interface CreatedBy {
  id: string;
  name: string;
}

export interface ReportingTo {
  id: string;
  name: string;
}

export type IUsersList = IUserDetails[];
export interface IUserDetails {
  id: string;
  name: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
  role: IRoleObject;
  meta: string;
}

export interface IAccount {
  user: IUser;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
  role: Role;
  organization: IOrganization;
  meta: Meta;
}

export interface IAuthData {
  statusCode?: any;
  data: IAuthUser;
}
export interface IAuthUser {
  id: string;
  name: string;
  email: string;
  phoneCode: string;
  phoneNumber: string;
  status: string;
  createdAt: string;
  role: _IRole;
  organization: _IOrganization;
  meta: string;
  orgId: number;
}
export interface Role {
  id: string;
  title: string;
  status: string;
  permissions: string[];
}
export interface _IRole {
  id: string;
  title: string;
  orgId: number;
  status: string;
  permissions: Permission[];
  createdBy: CreatedBy;
  createdAt: string;
}
export interface _IOrganization {
  id: string;
  name: string;
  location: Location;
  updatedAt: string;
  createdAt: string;
  meta: string;
}
export interface IOrganization {
  id: string;
  name: string;
  uuid: string;
  location: ILocation;
  updatedAt: string;
  createdAt: string;
}
export interface ILocation {
  address: string;
  city: string;
  country: string;
  state: string;
}
export interface Meta {
  termsCondition: string;
}
export interface IPermissionList {
  permission: Permission[];
}
export interface excelOptions {
  adjustColums: IAdjustColumns[];
}
interface IAdjustColumns {
  columnNumber: number;
  columWidth: number;
}

export interface IShipmentDashCount {
  allShipmentCount: number;
  pendingShipmentCount: number;
  assignedShipmentCount: number;
  inDeliveryShipmentCount: number;
  dispatchedShipmentCount: number;
  canceledShipmentCount: number;
  rejectedShipmentCount: number;
  acceptedhipmentCount: number;
  deliveredShipmentCount: number;
}
export type IShipmentList = IShipmentObject[];
export interface IShipmentObject {
  id: string;
  zone_id: number;
  created_by: string;
  assigned_to?: string;
  customer: ICustomer;
  status: string;
  integration_id: any;
  created_at: string;
  items: IItem[];
  pickup: IPickup;
  dropoff: IDropoff;
  logistic_type?: string;
  package_type: string;
  package_weight: number;
  amount: number;
  order_reference: any;
  tracking_id: string;
  logistics_partner?: number;
}
export interface InewShipment {
  items: any;
  logistic_type: string;
  package_type: string;
  package_weight: number;
  amount: number;
  pickup?: IPickup | any;
  dropoff: IDropoff;
  zone_id: string;
  pickup_option: boolean;
  type: string;
  customer_id: string;
  integration_id?: string;
  logistic_id: string;
}

export interface IShipmentStatus {
  shipment_id: string;
  logistic_id: string;
  status: number;
}
export interface ICustomer {
  id?: any;
  type?: string;
  name?: string;
  email_address?: string;
  phone_code?: any;
  phone_number?: any;
}
export interface INewCustomer {
  name: string;
  email: string;
  phone_number: string;
  phone_code?: string;
}

export interface IItem {
  name: string;
  price: number;
  qty?: number;
}
export interface IAttributes {
  items: IItem[];
  pickup: IPickup;
  dropoff: IDropoff;
  logistic_type: string;
  package_type: string;
  package_weight: number;
  amount: number;
  order_reference: any;
  tracking_id: string;
  logistics_partner: number;
}
export interface IPickup {
  address: string;
  latitude: any;
  longitude: any;
}

export interface IDropoff {
  address: string;
  region?: string;
  city?: string;
  latitude: number;
  longitude: number;
}

export interface IZone {
  name: string;
  id: string;
}

export type ICustomerList = ICustomerObject[];
export interface ICustomerObject {
  id: string;
  name: string;
  phone_number: any;
  email: string;
  phone_code: any;
  address?: string;
  statistics?: IStatistics;
  status?: string;
}

export interface IStatistics {
  completed: number;
  pending: number;
  cancelled: number;
}

export interface IZones {
  data: ZoneData[];
}

export interface ZoneData {
  id: string;
  logistic_provider: string;
  created_by: string;
  attributes: IZoneAttributes;
  meta: any;
  created_at: string;
}

export interface IZoneAttributes {
  location: IZoneLocation;
  delivery: IDelivery;
}

export interface IZoneLocation {
  city_name: string;
  price: number;
  destination_code: number;
}

export interface IDelivery {
  minimum: number;
  maximum: number;
  description: string;
}
export interface IZoneObject {
  statusCode: number;
  error: any;
  data: IDaum[];
}

export interface IDaum {
  id: string;
  logistic_provider: string;
  created_by: string;
  attributes: Attributes;
  meta: any;
  created_at: string;
}

export interface Attributes {
  location: Location;
  delivery: IDelivery;
}

export interface IDrivers {
  data: IDriverObject[];
}
export interface IDriverObject {
  id: string;
  status: string;
  rating: number;
  created_at: string;
  personal_identification: IPersonalIdentification;
  documentation: IDocumentation;
  other_details: IOtherDetails;
}

export interface IPersonalIdentification {
  name: string;
  gender: string;
  dob: string;
  phone_code: string;
  phone_number: string;
}

export interface IDocumentation {
  image: string;
  licence: string;
  fitness_certificate: string;
}

export interface IOtherDetails {
  licence_number: string;
  licence_expiry_date: string;
  first_guarantor_name: string;
  second_guarantor_name: string;
  partner_name: string;
  partner_phone_code: string;
  partner_phone_number: string;
}
