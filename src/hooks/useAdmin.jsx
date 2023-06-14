import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loader } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isAdmin = [], isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin"],
    enabled: !loader && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/role/${user?.email}`);
      return res.data;
    },
  });

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
