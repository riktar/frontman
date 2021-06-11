import useRequest from "./useRequest";
import useSWR from "swr";
const useUser = (params = {}) => {
  const { data, error } = useSWR(
    `https://jsonplaceholder.typicode.com/users${
      params.id ? `/${params.id}` : ""
    }`,
    useRequest
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
};
export { useUser };
