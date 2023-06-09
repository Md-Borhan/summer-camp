import SectionTitle from "../../components/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await axiosSecure.get("/users");
    return res.data;
  });

  const handleMakeInstructor = (user) => {
    fetch(`${import.meta.env.VITE_api_url}/users/instructor/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: `${user.name} is now an Instructor!`,
            showConfirmButton: false,
            timer: 1000,
            icon: "success",
          });
          refetch();
        }
      });
  };

  const handleMakeAdmin = (user) => {
    fetch(`${import.meta.env.VITE_api_url}/users/admin/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: `${user.name} is now an Admin!`,
            showConfirmButton: false,
            timer: 1000,
            icon: "success",
          });
          refetch();
        }
      });
  };

  return (
    <div className="text-white">
      <SectionTitle title="Manage Users" />
      <div className="overflow-x-auto bg-[#322a71] p-10 rounded-md">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white border-[#571ce0]">
              <th>S/L</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id} className="border-b border-[#571ce0]">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="rounded-full  border-[#571ce057] shadow-blue-100 shadow border w-12 h-12">
                        <img src={user.photo} alt="Avatar" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="py-2 px-4">
                  <button
                    className="btn btn-sm bg-[#1F2340] text-xs text-white hover:bg-[#1F2340]"
                    onClick={() => handleMakeAdmin(user)}
                    disabled={user.role === "admin"}
                  >
                    Make Admin
                  </button>
                </td>
                <td className="py-2 px-4">
                  <button
                    className="btn btn-sm bg-[#1F2340] text-xs text-white hover:bg-[#1F2340]"
                    onClick={() => handleMakeInstructor(user)}
                    disabled={user.role === "instructor"}
                  >
                    Make Instructor
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

export default AllUsers;
