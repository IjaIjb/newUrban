import api from "../API";

class managerOBJ {
  getAll = async (pageNu?: any) => {
    try {
      let response: any;
      if (pageNu) {
        response = await api.get(`manager?page=${pageNu}`);
      } else {
        response = await api.get(`manager`);
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
  delete = async (id: string) => {
    try {
      let response: any;
      response = await api.delete(`manager/${id}`);
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
  getByParkOwner = async (pageNu?: any) => {
    try {
      let response: any;
      response = await api.get(`manager/byOwner`);
      console.log("response from get by park owner", response);
      if (response?.data?.success) {
        const flattenedData = response.data.data.map((manager: any) => ({
          ...manager?.parkManager,
          ...manager?.userInfo,
          parkName: manager?.parkInfo?.name,
          parkId: manager?.parkInfo?.id,
          fullName:
            manager?.parkManager?.firstName +
            " " +
            manager?.parkManager?.lastName,
        }));
        console.log("flattenedData", flattenedData);
        return flattenedData;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };

  getParkOwnerManagerHistory = async (pageNu?: any) => {
    try {
      let response: any;
      response = await api.get(`manager-history/owner`);
      if (response?.data?.success) {
        const flattenedData = response.data.data.map((history: any) => ({
          ...history,
          ...history?.manager,
          ...history?.userInfo,
          parkName: history?.park?.name,
          createdAt: new Date(history?.createdAt).toLocaleDateString(),
          endDate: new Date(history?.endDate).toLocaleDateString(),
        }));
        console.log("flattenedData", flattenedData);
        return flattenedData;
      } else {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      throw err;
    }
  };

  getOne = async (urbanId: any) => {
    try {
      let response: any = await api.get(`manager/getParkManager/${urbanId}`);

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
  getParkByManager = async () => {
    try {
      let response: any = await api.get(`manager/getManagersPark`);

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

  getManagerDashboarddata = async () => {
    try {
      let response: any = await api.get(`manager/dashboard`);

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

const manager = new managerOBJ();
export default manager;
