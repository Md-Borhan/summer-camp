import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PopularInstructor = () => {
  const { loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });
  console.log(classes);

  return (
    <div className="myContainer">
      <SectionTitle title="Popular Instructor Section" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes?.map((sc) => (
          <div
            className="flex gap-6 items-center p-6 bg-[#571ce036] border-[#571ce0] shadow-blue-100 shadow"
            key={sc._id}
          >
            <div className="bg-[#571ce036]">
              <img
                className="h-40 w-40"
                src={sc.instructorImage}
                alt="Instructor Image"
              />
            </div>
            <div className="text-white space-y-3">
              <p className="text-xl">
                <strong>Name: {sc.name}</strong>
              </p>
              <p>Email: {sc.email}</p>
              <p>Total Students: {sc.enrolled}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructor;
