import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../loader/Loader";

const PopularInstructor = () => {
  const axiosSecure = useAxiosSecure();
  const { data: classes = [], isLoading } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="myContainer md:pb-12">
      <SectionTitle
        title="Popular Instructor Section"
        subTitle="Introducing our popular instructor, known for their expertise and engaging teaching style. With years of experience in the field, they bring a wealth of knowledge to every class. Students love their dynamic and interactive approach."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {classes?.slice(0, 6)?.map((sc) => (
          <div
            className="flex gap-6 rounded-md items-center p-6 bg-[#571ce011] border-[#571ce0] shadow-blue-100 shadow"
            key={sc._id}
          >
            <div className="bg-[#571ce036] rounded-md">
              <img
                className="h-40 w-40 rounded-md"
                src={sc.instructorImage}
                alt="Instructor Image"
              />
            </div>
            <div className="text-white space-y-2">
              <p className="text-lg">
                <strong>Name: {sc.name}</strong>
              </p>
              <p>Email: {sc.email}</p>
              <p className="pt-4">
                <strong>Total Students: {sc.enrolled}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularInstructor;
