import api from "../API";
import { USER_TYPE } from "../types";

class tripOBJ {
  getAll = async ({
    userType,
    query,
  }: {
    userType?: string;
    query?: {
      fromState?: string;
      toState?: string;
      vehicleType?: string;
      travelDate?: string;
    };
  } = {}) => {
    try {
      let response;
      if (userType) {
        response = await api.get(`/trip/${userType}`, { params: query });
      } else {
        response = await api.get(`/trip`, { params: query });
      }
      if (response?.data?.success) {
        const transformedData = response.data.data.map((trip: any) => {
          const startLocation = trip?.park?.city;
          const parkName = trip?.park?.name;
          const availableSeats =
            (+trip?.totalSeats || 0) - (+trip?.bookedSeats || 0);

          return {
            ...trip,
            startLocation,
            parkName,
            availableSeats,
            date: new Date(trip?.date).toLocaleDateString(),
          };
        });
        return transformedData;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };

  getAlByParkId = async ({
    userType,
    query,
    parkId,
  }: {
    parkId?: string;
    userType?: string;
    query?: {
      fromState?: string;
      toState?: string;
      vehicleType?: string;
      travelDate?: string;
    };
  } = {}) => {
    try {
      let response;
      if (userType) {
        response = await api.get(`/trip/${userType}/park/${parkId}`, {
          params: query,
        });
      } else {
        response = await api.get(`/trip/park/${parkId}`, { params: query });
      }
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
        throw new Error("Something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };

  getForDriverRequest = async (parkId?: string) => {
    try {
      const response = await api.get(`/trip/request-driver/${parkId}`);

      if (response?.data?.success) {
        return response?.data?.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };

  getAllByUserPark = async (userType: USER_TYPE) => {
    try {
      const response = await api.get(`/trip/${userType}?status=pending`);

      if (response?.data?.success) {
        return response?.data?.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };

  //create trip
  create = async (data: any) => {
    try {
      const response: any = await api.post("trip", data);
      return response;
    } catch (err) {
      throw err;
    }
  };

  update = async (data: any, tripId: string) => {
    try {
      const response: any = await api.patch(`trip/${tripId}`, data);
      return response;
    } catch (err) {
      throw err;
    }
  };
  //assign Vechicle
  assignVechicle = async (data: any, id: any) => {
    try {
      const response: any = await api.post(`trip/${id}/assign-vehicle`, data);
      return response;
    } catch (err) {
      throw err;
    }
  };
  //get all trip
  get = async (data: string) => {
    try {
      const response: any = await api.get(`trip/${data}`);
      if (response?.data?.success) {
        return response?.data?.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };

  //get all trip
  getByTripCode = async (data: string) => {
    try {
      const response: any = await api.get(`trip/tripCode/${data}`);
      if (response?.data?.success) {
        return response?.data?.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };

  filter = async (user: string, status: string) => {
    try {
      let response;
      response = await api.get(`trip/${user}/filter/${status}`);
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

  managerRecords = async ({
    parkId,
    status,
    managerId,
  }: {
    parkId: string;
    managerId: string;
    status: string;
  }) => {
    try {
      let response;
      response = await api.get(`trip/${parkId}/${status}/${managerId}`);
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

  getRecords = async (
    user: string,
    startDate: any,
    endDate: any,
    park?: any
  ) => {
    let filterParams: any;
    if (park) {
      filterParams = {
        startDate: startDate,
        endDate: endDate,
        park: park,
      };
    } else {
      filterParams = {
        startDate: startDate,
        endDate: endDate,
      };
    }

    const queryString = new URLSearchParams(filterParams).toString();
    try {
      let response;
      response = await api.get(`trip/${user}/records?${queryString}`);
      if (response?.data?.success) {
        const transformedData = response.data.data.map((trip: any) => {
          const startLocation = trip?.park?.state;
          return {
            ...trip,
            startLocation,
            parkName: trip?.park?.name,
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

  //get all trip
  getByDispatchId = async (id: string) => {
    try {
      const response: any = await api.get(`trip/get-all-by-dispatch/${id}`);
      if (response?.data?.success) {
        return response?.data?.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };

  getByDispatchMainId = async (id: string) => {
    try {
      const response = await api.get(`trip/get-all-by-dispatchid/${id}`);
      if (response.data.success) {
        return response.data.data;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (error: any) {
      throw new Error(error);
    }
  };

  //create trip
  requestDriver = async (data: any) => {
    try {
      const response: any = await api.post(
        "driver-request/request-driver",
        data
      );
      return response;
    } catch (err) {
      throw err;
    }
  };

  //Book trip
  book = async (data: any) => {
    try {
      const response: any = await api.post("booking/create", data);
      return response;
    } catch (err) {
      throw err;
    }
  };
  //get booking by dispatch or park
  getBooking = async ({ id, byPark }: { id: string; byPark?: boolean }) => {
    try {
      const response: any = byPark
        ? await api.get(`/booking/customer-booking/park/${id}`)
        : await api.get(`/booking/customer-booking/dispatch/${id}`);
      if (response?.data?.success) {
        const data = response?.data?.data;

        const transformedData = data.map((booking: any) => {
          return {
            passengerName: booking.passenger.user.fullName,
            passengerEmail: booking.passenger.user.email,
            passengerPhone: "+234" + booking.passenger.user.phoneNumber,
            bookingCode: booking.bookingCode,
            status: booking.status,
            date: booking?.travelDate?.split("GMT")[0],
            ...booking,
          };
        });

        // return response?.data?.data;
        return transformedData;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };

  getBookingByCode = async (bookingCode: string, status?: string) => {
    try {
      let url = `/booking/customer-booking/${bookingCode}`;
      if (status) {
        url += `?status=${status}`;
      }
      const response: any = await api.get(url);
      if (response?.data?.success) {
        return response?.data?.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };

  getBookingByPark = async (parkId: string) => {
    try {
      const response: any = await api.get(`/booking/by-park/${parkId}`);
      if (response?.data?.success) {
        return response?.data?.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };

  getAllBookedSeatsByTripId = async ({ tripId }: { tripId: string }) => {
    try {
      const response = await api.get(`/booking/booked-seats/${tripId}`);

      if (response?.data?.success) {
        return response.data.data;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };
}
const tripOBJs = new tripOBJ();
export default tripOBJs;
