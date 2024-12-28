import api from "../API";
import { SetAllParkData } from "../hooks/token";

class ParkOBJ {
  //create park
  create = async (data: any) => {
    try {
      const response: any = await api.post("park", data);
      return response;
    } catch (err) {
      throw err;
    }
  };
  update = async (data: any) => {
    try {
      const response: any = await api.patch("park/update-park", data);
      return response;
    } catch (err) {
      throw err;
    }
  };
  //get all park
  getAll = async (pageNu?: any) => {
    try {
      let response: any;
      if (pageNu) {
        response = await api.get(`park?page=${pageNu}`);
      } else {
        response = await api.get(`park`);
      }

      if (response?.data?.success) {
        //store response in redux
        console.log(response.data, "from park api ");
        return response.data.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };
  //get one park
  getPark = async (id: string) => {
    try {
      const response: any = await api.get(`park/${id}`);
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
  //create manager
  parkManager = async (data: any) => {
    try {
      const response: any = await api.post("park/add-manager", data);
      return response;
    } catch (err) {
      throw err;
    }
  };
  //get all park by user
  getAllByUser = async (pageNu?: any) => {
    try {
      let response: any;
      if (pageNu) {
        response = await api.get(`park/getAllByUser?page=${pageNu}`);
      } else {
        response = await api.get(`park/getAllByUser`);
      }

      if (response?.data?.success) {
        //store response in redux

        return response?.data?.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };
}

const parkOBJ = new ParkOBJ();
export default parkOBJ;
