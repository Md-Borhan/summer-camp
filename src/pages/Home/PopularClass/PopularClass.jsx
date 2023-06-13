import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PopularClass = () => {
  const axiosSecure = useAxiosSecure();
  const { data: classes = [] } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });
  console.log(classes);
  return (
    <div>
      <SectionTitle title="Popular Class Section" />
    </div>
  );
};

export default PopularClass;
