import Loader from "../../loader/Loader";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Instructor = () => {
  const { loading } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_api_url}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const instructor = users?.filter((user) => user.role === "instructor");
  return (
    <div>
      {loading && <Loader />}
      <div className="overflow-x-auto bg-[#322a71] p-10 rounded-md">
        <table className="table text-white">
          {/* head */}
          <thead>
            <tr className="text-white border-[#571ce0]">
              <th>S/L</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {instructor?.map((user, index) => (
              <tr key={user._id} className="border-b border-[#571ce0]">
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="rounded-md  border-[#571ce057] shadow-blue-100 shadow border w-24 h-24">
                        <img src={user.photo} alt="Avatar" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Instructor;
