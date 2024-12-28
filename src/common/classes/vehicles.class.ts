import api from "../API";

class Vehicle {
  allvehicles = async () => {
    try {
      const response = await api.get(`/vehicle`);

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

const VehicleApi = new Vehicle();
export default VehicleApi;
