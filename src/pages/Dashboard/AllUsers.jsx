import { useEffect, useState } from "react";
import SectionTitle from "../../components/SectionTitle";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectRole, setSelectRole] = useState("");
  console.log(users);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_api_url}/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleSelect = (e) => {
    setSelectRole(e.target.value);
  };
  return (
    <div className="text-white">
      <SectionTitle title="All Users" />
      <div className="overflow-x-auto bg-[#322a71] p-10 rounded-md">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-white">
              <th>S/L</th>
              <th>Image</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="rounded-full border-[#571ce057] shadow-blue-100 shadow border w-12 h-12">
                        <img src={user.photo} alt="Avatar" />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <th>
                  <select
                    onChange={handleSelect}
                    className="select text-white select-info bg-[#322a71]"
                  >
                    <option disabled selected>
                      Select Role
                    </option>
                    <option>Admin</option>
                    <option>Instructor</option>
                    <option>Student</option>
                  </select>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
