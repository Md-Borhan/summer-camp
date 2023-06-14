import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useInstructor = () => {
  const { user, loader } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: isInstructor = [], isLoading: isInstructorLoading } = useQuery({
    queryKey: ["isInstructor"],
    enabled: !loader && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`users/role/${user?.email}`);
      return res.data;
    },
  });
  console.log(isInstructor);

  return [isInstructor, isInstructorLoading];
};

export default useInstructor;
