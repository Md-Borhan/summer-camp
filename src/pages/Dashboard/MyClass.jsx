import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UpdateClass from "./UpdateClass";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const MyClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: classes = [] } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  const [modalData, setModalData] = useState({});

  const handleUpdateModal = (sc) => {
    setModalData(sc);
  };
  const instructorClass = classes.filter((sc) => sc.email === user?.email);

  return (
    <div className="text-white">
      <SectionTitle title="My Classes" />
      <div className="overflow-x-auto bg-[#322a71]  p-10 rounded-md">
        <table className="table overflow-hidden">
          {/* head */}
          <thead>
            <tr className="text-white border-[#571ce0]">
              <th>Class Name</th>
              <th>Status</th>
              <th>Enrolled</th>
              <th>Feedback</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody className="">
            {instructorClass?.map((sc) => (
              <tr key={sc._id} className="border-b border-[#571ce0]">
                <td>{sc.className}</td>
                <td>{sc.status}</td>
                <td>0</td>
                <td className="py-2 px-4">{sc.feedback}</td>
                <td
                  className="py-2 px-4"
                  onClick={() => window.my_modal_4.showModal(sc)}
                >
                  <button
                    onClick={() => handleUpdateModal(sc)}
                    className="btn btn-sm bg-[#1F2340] text-xs text-white hover:bg-[#1F2340]"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <UpdateClass modalData={modalData} />
    </div>
  );
};

export default MyClass;
