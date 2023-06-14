import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import UpdateClass from "./UpdateClass";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const MyClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myClasses = [] } = useQuery({
    queryKey: ["myClasses", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/classes/${user?.email}`);
      return res.data;
    },
  });

  const [modalData, setModalData] = useState({});

  const handleUpdateModal = (sc) => {
    setModalData(sc);
  };

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
            {myClasses?.map((myClass) => (
              <tr key={myClass._id} className="border-b border-[#571ce0]">
                <td>{myClass.className}</td>
                <td>{myClass.status}</td>
                <td>0</td>
                <td className="py-2 px-4">{myClass.feedback}</td>
                <td
                  className="py-2 px-4"
                  onClick={() => window.my_modal_4.showModal(myClass)}
                >
                  <button
                    onClick={() => handleUpdateModal(myClass)}
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
