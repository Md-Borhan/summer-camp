import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../components/SectionTitle";
import Button from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";

const Class = () => {
  const { user } = useAuth;
  const axiosSecure = useAxiosSecure();
  const { data: classes = [] } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });
  return (
    <div className="text-white">
      <div className="grid grid-cols-1 mb-10 md:grid-cols-2 lg:grid-cols-3 gap-8 myContainer">
        {classes?.map((sc) => (
          <div
            key={sc._id}
            className="card w-full text-white border-[#571ce0] shadow-blue-100 shadow bg-base-100 "
          >
            <figure>
              <img src={sc.imageUrl} alt="sport" />
            </figure>
            <div className="card-body bg-[#1F2340]">
              <h2 className="card-title font-bold">{sc.className}</h2>
              <p className="font-medium">Instructor Name: {sc.name}</p>
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  Available Seats:
                  <span className="font-normal"> {sc.seats}</span>
                </p>
                <p className="font-medium">
                  Price: <span className="font-normal"> {sc.price}</span>
                </p>
              </div>
              <div className="border mt-4 w-full p-1 rounded-full inline-block border-[#571ce0] shadow-blue-100 shadow">
                <button className="btn btn-block rounded-full border-transparent bg-[#571ce0] hover:bg-transparent px-5 text-white hover:border-[#571ce0]">
                  Select Button
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Class;
