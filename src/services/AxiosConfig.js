import axios from "axios";

const axiosConfig = async (method, url, reqBody,reqHeader) => {
  let configObj = {
    method: method,
    url: url,
    data: reqBody,
    headers:reqHeader
  };

  return await axios(configObj)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};
export default axiosConfig;
