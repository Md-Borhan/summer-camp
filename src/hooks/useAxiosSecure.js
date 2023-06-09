import axios from "axios";

const axiosSecure = axios.create({
  baseURL: `http://localhost:5500`,
});

// axios.get()
const useAxiosSecure = () => {
  axiosSecure.interceptors.request.use((req) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  });

  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response &&
        (error?.response.status === 403 || error?.response.status === 401)
      ) {
        console.log(error?.response?.data.error);
      }
    }
  );
  // },[])
  return axiosSecure;
};

export default useAxiosSecure;
