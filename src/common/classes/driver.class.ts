import api from "../API";

class driverOBJ {
  //create driver
  create = async (data: any) => {
    try {
      const response: any = await api.post("driver", data);
      return response;
    } catch (err) {
      throw err;
    }
  };
  //get all driver
  getAll = async () => {
    try {
      const response: any = await api.get("driver");
      if (response?.data?.success) {
        //store response in redux
        return response.data.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };
  //get one driver
  getdriver = async (id: string) => {
    try {
      const response: any = await api.get(`driver/${id}`);
      if (response?.data?.success) {
        //store response in redux
        return response;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };

}

const driverOBJs = new driverOBJ();
export default driverOBJs;
