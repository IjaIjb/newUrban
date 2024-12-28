import api from "../API";

class providerOBJ {
    //get all
    getAll = async (selectedRegion?:any) => {
      console.log(selectedRegion,'this is selected region')
        try {
          let response: any
          if(!selectedRegion){
            response= await api.get("provider");
          }else{
            response= await api.get(`provider?selectedRegion=${selectedRegion}`);
          }
        
          console.log(response,'provider api')
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

const providerOBJs = new providerOBJ()
export default providerOBJs