import api from "../API";

class dispatchOBJ {
  //get all driver
  getAll = async () => {
    let response: any;
    try {
      response = await api.get(`dispatch-officer/byOwner`);

      if (response?.data?.success) {
        const flattenedData = response.data.data.map((officer: any) => ({
          ...officer.user,
          ...officer,
          parkName: officer.park.name,
        }));

        return flattenedData;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };
  getParkById = async (parkId: string) => {
    try {
      let response: any;
      response = await api.get(`dispatch-officer/park/${parkId}`);
      if (response?.data?.success) {
        return response?.data?.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };
  //get all driver
  getAllCreated = async (pageNu?: Number) => {
    let response: any;
    try {
      if (pageNu) {
        response = await api.get(`dispatch-officer/created`);
      } else {
        response = await api.get(`dispatch-officer/created`);
      }

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
  restPassword = async (id: string, data: any) => {
    let response: any;
    try {
      response = await api.patch(`auth/reset-dispatch/${id}`, data);
      if (response?.data?.success) {
        return response.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };
  //get one driver
  getOne = async (id: string) => {
    try {
      const response: any = await api.get(`dispatch-officer/${id}`);
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
  update = async (id: string, data: any) => {
    try {
      const response: any = await api.patch(`dispatch-officer/${id}`, data);
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
  delete = async (id: string) => {
    try {
      let response: any;
      response = await api.delete(`dispatch-officer/${id}`);
      if (response?.data?.success) {
        //store response in redux
        return response?.data;
      } else {
        throw new Error("something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };
}

const dispatch = new dispatchOBJ();
export default dispatch;
