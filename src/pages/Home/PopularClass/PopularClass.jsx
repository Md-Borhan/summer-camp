import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../loader/Loader";
import { useAuth } from "../../../hooks/useAuth";
import { Fade, Slide } from "react-awesome-reveal";

const PopularClass = () => {
  const axiosSecure = useAxiosSecure();
  const { theme } = useAuth();
  const { data: classes = [], isLoading } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className={`bg-[#1f2340] py-4 md:pt-12 ${theme}`}>
      <Slide>
        <SectionTitle
          title="Popular Class Section"
          subTitle="Experience our popular class that has captivated students worldwide. Led by expert instructors, this class offers a unique blend of theory and practical skills. From interactive discussions to hands-on exercises, you'll gain valuable knowledge and practical insights. "
        />
      </Slide>
      <div className=" grid grid-cols-1 my-14 sm:grid-cols-2 xl:grid-cols-3 gap-8 myContainer">
        {classes?.slice(0, 6)?.map((sc) => (
          <Fade key={sc._id}>
            <div className="card w-full text-white border-[#571ce0] shadow-blue-100 shadow bg-base-100 ">
              <figure>
                <img src={sc.imageUrl} alt="sport" />
              </figure>
              <div
                className={`card-body rounded-b-2xl text-center bg-[#322a71] ${theme}`}
              >
                <h2 className="card-title mx-auto font-bold">
                  Class Name: {sc.className}
                </h2>
                <p className="font-medium">Instructor Name: {sc.name}</p>
                <p className="font-medium">
                  Total Enrolled:
                  <span className="font-normal"> {sc.enrolled}</span>
                </p>
                <p className="font-medium">
                  Price: $<span className="font-normal"> {sc.price}</span>
                </p>
              </div>
            </div>
          </Fade>
        ))}
      </div>
    </div>
  );
};

export default PopularClass;
