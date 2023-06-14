import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../components/SectionTitle";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const MySelectedClass = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: bookedClasses = [], refetch } = useQuery(
    ["BookedClasses"],
    async () => {
      const res = await axiosSecure.get(`/booked`);
      return res.data;
    }
  );

  const handleDelete = (classId) => {
    axiosSecure.delete(`/booked/${classId}`).then((data) => {
      console.log(data);
      refetch();
    });
  };
  const handlePay = (bookedClass) => {
    console.log(bookedClass);
  };
  const myBookedClass = bookedClasses.filter(
    (bookedClass) => bookedClass.email === user?.email
  );
  return (
    <div className="text-white">
      <SectionTitle title="My Selected Class" />
      <div className="overflow-x-auto bg-[#322a71] p-10 rounded-md">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white border-[#571ce0]">
              <th>S/L</th>
              <th>Image</th>
              <th>Class Name</th>
              <th>Instructor Name</th>
              <th>Seats</th>
              <th>Price</th>
              <th>Pay</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {myBookedClass?.map((bookedClass, index) => (
              <tr key={bookedClass._id} className="border-b border-[#571ce0]">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="rounded-full  border-[#571ce057] shadow-blue-100 shadow border w-12 h-12">
                        <img src={bookedClass.imageUrl} alt="Avatar" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{bookedClass.className}</td>
                <td>{bookedClass.name}</td>
                <td>{bookedClass.seats}</td>
                <td className="text-right">$ {bookedClass.price}</td>
                <td className="py-2 px-4">
                  <Link to={`/dashboard/payment/${bookedClass._id}`}>
                    <button
                      className="btn btn-sm bg-[#1F2340] text-xs text-white hover:bg-[#1F2340]"
                      onClick={() => handlePay(bookedClass)}
                    >
                      Pay
                    </button>
                  </Link>
                </td>
                <td className="py-2 px-4">
                  <button
                    className="btn btn-sm bg-red-500 text-xs text-white hover:bg-[#1F2340]"
                    onClick={() => handleDelete(bookedClass._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySelectedClass;
