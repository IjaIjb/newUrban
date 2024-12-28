import api from "../API";
import {
  StoreAuthToken,
  SetUserType,
  SetUserData,
  RemoveAllToken,
} from "../hooks/token";

class AUTH {
  //login
  login = async (data: any) => {
    try {
      const response: any = await api.post("auth/login", data);
      //store jwt
      StoreAuthToken(response?.data?.data?.token);
      return response;
    } catch (err) {
      throw err;
    }
  };

  //register
  register = async (data: any, user: String) => {
    try {
      const response: any = await api.post(`auth/register/${user}`, data);
      return response;
    } catch (err) {
      throw err;
    }
  };

  //set currently user
  currentUser = async () => {
    try {
      const response: any = await api.get("auth/me");
      if (response?.data?.success) {
        return response?.data?.data
      }else{
        throw new Error('something went wrong')
      }
    
    } catch (err) {
      throw err
    }
  };

  logOut = () => {
    RemoveAllToken();
  };

  
}

const authOBJ = new AUTH();
export default authOBJ;
