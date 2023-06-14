import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useStudent = () => {
  const { user, loader } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isStudent = [], isLoading: isStudentLoading } = useQuery({
    queryKey: ["isStudent"],
    enabled: !loader && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/role/${user?.email}`);
      return res.data;
    },
  });

  return [isStudent, isStudentLoading];
};

export default useStudent;
