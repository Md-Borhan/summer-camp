import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import { toast } from "react-hot-toast";
import FeedbackModal from "./FeedbackModal";

const ManageClasses = () => {
  const axiosSecure = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });
  const [data, setData] = useState();
  console.log(data);
  // const [feedbackData, setFeedbackData] = useState("");

  const handleApproved = (sc) => {
    fetch(`${import.meta.env.VITE_api_url}/classes/approved/${sc._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Class Approved!");
          refetch();
        }
      });
  };
  const handleDeny = (sc) => {
    fetch(`${import.meta.env.VITE_api_url}/classes/deny/${sc._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Class Deny!");
          refetch();
        }
      });
  };

  return (
    <div className="text-white">
      <SectionTitle title="Manage Classes" />
      <div className="overflow-x-auto bg-[#322a71] p-10 rounded-md">
        <table className="table overflow-hidden">
          {/* head */}
          <thead>
            <tr className="text-white border-[#571ce0]">
              <th>Class Image</th>
              <th>Class Name</th>
              <th>Instructor name</th>
              <th>Instructor email</th>
              <th>Available seats</th>
              <th>Price</th>
              <th>Approved</th>
              <th>Deny</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody className="">
            {classes?.map((sc) => (
              <tr key={sc._id} className="border-b border-[#571ce0]">
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="rounded-full  border-[#571ce057] shadow-blue-100 shadow border w-12 h-12">
                        <img src={sc.imageUrl} alt="Avatar" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{sc.className}</td>
                <td>{sc.name}</td>
                <td>{sc.email}</td>
                <td className="py-2 px-4">{sc.seats}</td>
                <td className="py-2 px-4">{sc.price}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleApproved(sc)}
                    disabled={sc.status !== "pending"}
                    className="btn btn-sm bg-[#1F2340] text-xs text-white hover:bg-[#1F2340]"
                  >
                    Approved
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleDeny(sc)}
                    disabled={sc.status !== "pending"}
                    className="btn btn-sm bg-[#1F2340] text-xs text-white hover:bg-[#1F2340]"
                  >
                    Deny
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => window.my_modal_3.showModal(setData(sc))}
                    className="btn btn-sm bg-[#1F2340] text-xs text-white hover:bg-[#1F2340]"
                  >
                    Feedback
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FeedbackModal data={data} />
    </div>
  );
};

export default ManageClasses;
