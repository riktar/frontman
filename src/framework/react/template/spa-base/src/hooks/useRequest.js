import axios from "axios";
const useRequest = async (url, config) => {
  const oConfig = {
    method: "get",
    ...config,
  };
  return await axios(url, oConfig);
};

export default useRequest;
