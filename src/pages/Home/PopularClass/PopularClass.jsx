import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../loader/Loader";

const PopularClass = () => {
  const axiosSecure = useAxiosSecure();
  const { data: classes = [], isLoading } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });
  console.log(classes);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="py-4 md:pt-12 myContainer">
      <SectionTitle
        title="Popular Class Section"
        subTitle="Experience our popular class that has captivated students worldwide. Led by expert instructors, this class offers a unique blend of theory and practical skills. From interactive discussions to hands-on exercises, you'll gain valuable knowledge and practical insights. "
      />
      <div className="grid grid-cols-1 my-14 md:grid-cols-2 lg:grid-cols-3 gap-8 myContainer">
        {classes?.slice(0, 6)?.map((sc) => (
          <div
            key={sc._id}
            className="card w-full text-white border-[#571ce0] shadow-blue-100 shadow bg-base-100 "
          >
            <figure>
              <img src={sc.imageUrl} alt="sport" />
            </figure>
            <div
              className={`card-body rounded-b-2xl text-center bg-[#1F2340] }`}
            >
              <h2 className="card-title mx-auto font-bold">
                Class Name: {sc.className}
              </h2>
              <p className="font-medium">Instructor Name: {sc.name}</p>
              <p className="font-medium">
                Total Enrolled:
                <span className="font-normal"> {sc.enrolled} Students</span>
              </p>
              <p className="font-medium">
                Price: $<span className="font-normal"> {sc.price}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularClass;
