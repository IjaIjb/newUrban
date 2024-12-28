import api from "../API";
import { DriverRequestStatus } from "../types";

class DriverRequestApi {
  filter = async (parkId: string, status: string) => {
    try {
      const response = await api.get(
        `driver-request/park/${parkId}/?${status}`
      );
      if (response?.data?.success) {
        const transformedData = response.data.data.map((trip: any) => {
          const startLocation = trip?.park?.state;
          return {
            ...trip,
            startLocation,
            date: new Date(trip?.date).toLocaleDateString(),
          };
        });
        return transformedData;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };

  getOwnerDriverRequest = async (status?: DriverRequestStatus) => {
    try {
      const response = await api.get(
        status ? `driver-request/park-owner/${status}` : `driver-request/park/`
      );
      if (response?.data?.success) {
        const transformedData = response.data.data.map((data: any) => {
          const startLocation = data?.park?.state;

          return {
            ...data,
            providerAgency: data.providerAgency.companyName,
            departureState: data?.park?.state,
            destinationState: data?.trip?.endState,
            tripCode: data?.trip?.tripCode,
            departureTime: data?.trip?.time,
            time: data?.time,
            vehicleType: data?.trip?.vehicleType,
            status: data?.status,
            region: data.providerAgency.region,
            date: new Date(data?.trip?.date).toLocaleDateString(),
            tripCreatedAt: new Date(data?.trip?.createdAt).toLocaleDateString(),
          };
        });
        return transformedData;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {}
  };

  getManagerDriverRequest = async () => {
    try {
      const response = await api.get("driver-request/park-manager/");
      if (response?.data?.success) {
        const transformedData = response.data.data.map((data: any) => {
          const startLocation = data?.park?.state;

          return {
            ...data,
            providerAgency: data.providerAgency.companyName,
            departureState: data?.park?.state,
            destinationState: data?.trip?.endState,
            tripCode: data?.trip?.tripCode,
            departureTime: data?.trip?.time,
            time: data?.time,
            vehicleType: data?.trip?.vehicleType,
            status: data?.status,
            region: data.providerAgency.region,
            date: new Date(data?.trip?.date).toLocaleDateString(),
            tripCreatedAt: new Date(data?.trip?.createdAt).toLocaleDateString(),
          };
        });
        return transformedData;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {}
  };

  cancelRequest = async (id: string) => {
    try {
      const response = await api.post(`driver-request/cancel/${id}`);
      if (response?.data?.success) {
        return response.data.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };
}

const driverRequestApi = new DriverRequestApi();
export default driverRequestApi;
