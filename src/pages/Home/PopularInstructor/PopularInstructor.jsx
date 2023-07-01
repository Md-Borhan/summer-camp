import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../loader/Loader";
import { useAuth } from "../../../hooks/useAuth";
import { Fade, Slide } from "react-awesome-reveal";

const PopularInstructor = () => {
  const { theme } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: classes = [], isLoading } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={`bg-[#1F2340] ${theme}`}>
      <div className={`myContainer md:pb-12  md:px-4 lg:px-12 2xl:px-0 `}>
        <Slide>
          <SectionTitle
            title="Popular Instructor Section"
            subTitle="Introducing our popular instructor, known for their expertise and engaging teaching style. With years of experience in the field, they bring a wealth of knowledge to every class. Students love their dynamic and interactive approach."
          />
        </Slide>
        <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 pt-2">
          {classes?.slice(0, 6)?.map((sc) => (
            <Fade key={sc._id}>
              <div
                className={`flex flex-col lg:flex-row gap-6 rounded-md items-center p-6 bg-[#322a71] border-[#571ce0] shadow-blue-100 shadow ${theme}`}
              >
                <div className={`bg-[#571ce036] rounded-md ${theme}`}>
                  <img
                    className="h-40 w-40 rounded-md"
                    src={sc.instructorImage}
                    alt="Instructor Image"
                  />
                </div>
                <div className={`text-white space-y-2 ${theme}`}>
                  <p className="text-lg">
                    <strong>Name: {sc.name}</strong>
                  </p>
                  <p>Email: {sc.email}</p>
                  <p className="pt-4">
                    <strong>Total Students: {sc.enrolled}</strong>
                  </p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularInstructor;
