/* import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../loader/Loader";
import { useEffect } from "react";

const Classes = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: classes = [] } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  const { data: users = [] } = useQuery(["users"], async () => {
    const res = await axiosSecure.get(`/users/${user?.email}`);
    return res.data;
  });

  const handleSelectButton = (user, sc) => {
    useEffect(()=>{
      fetch(`${import.meta.env.VITE_api_url}/bookedClasses`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(sc)
      });
    },[sc])
    if (!user) {
      Swal.fire({
        title: "Please login first to select button.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    }
  };
  return (
    <div className="text-white">
      {loading && <Loader />}
      <div className="grid grid-cols-1 my-14 md:grid-cols-2 lg:grid-cols-3 gap-8 myContainer">
        {classes?.map((sc) => (
          <div
            key={sc._id}
            className="card w-full text-white border-[#571ce0] shadow-blue-100 shadow bg-base-100 "
          >
            <figure>
              <img src={sc.imageUrl} alt="sport" />
            </figure>
            <div
              className={`card-body rounded-b-2xl ${
                sc.seats === 0 ? "bg-red-500" : "bg-[#1F2340]"
              }`}
            >
              <h2 className="card-title font-bold">{sc.className}</h2>
              <p className="font-medium">Instructor Name: {sc.name}</p>
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  Available Seats:
                  <span className="font-normal"> {sc.seats}</span>
                </p>
                <p className="font-medium">
                  Price: $<span className="font-normal"> {sc.price}</span>
                </p>
              </div>
              <div className="border mt-4 w-full p-1 rounded-full inline-block border-[#571ce0] shadow-blue-100 shadow">
                <button
                  disabled={
                    sc.seats === 0 ||
                    users.role === "admin" ||
                    users.role === "instructor"
                  }
                  onClick={() => handleSelectButton(user, sc)}
                  className="btn btn-block rounded-full border-transparent bg-[#571ce0] hover:bg-transparent px-5 text-white hover:border-[#571ce0]"
                >
                  Select Class
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
 */

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../loader/Loader";
import { toast } from "react-hot-toast";

const Classes = () => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: classes = [] } = useQuery(["classes"], async () => {
    const res = await axiosSecure.get("/classes");
    return res.data;
  });

  const { data: users = [] } = useQuery(["users"], async () => {
    const res = await axiosSecure.get(`/users/${user?.email}`);
    return res.data;
  });

  const handleSelectButton = (user, sc) => {
    if (!user) {
      Swal.fire({
        title: "Please login first to select button.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login now!",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login", { state: { from: location } });
        }
      });
    } else {
      fetch(`${import.meta.env.VITE_api_url}/booked`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sc),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Class Booked!");
          }
        });
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="text-white">
      <div className="grid grid-cols-1 my-14 md:grid-cols-2 lg:grid-cols-3 gap-8 myContainer">
        {classes?.map((sc) => (
          <div
            key={sc._id}
            className="card w-full text-white border-[#571ce0] shadow-blue-100 shadow bg-base-100 "
          >
            <figure>
              <img src={sc.imageUrl} alt="sport" />
            </figure>
            <div
              className={`card-body rounded-b-2xl ${
                sc.seats === 0 ? "bg-red-500" : "bg-[#1F2340]"
              }`}
            >
              <h2 className="card-title font-bold">{sc.className}</h2>
              <p className="font-medium">Instructor Name: {sc.name}</p>
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  Available Seats:
                  <span className="font-normal"> {sc.seats}</span>
                </p>
                <p className="font-medium">
                  Price: $<span className="font-normal"> {sc.price}</span>
                </p>
              </div>
              <div className="border mt-4 w-full p-1 rounded-full inline-block border-[#571ce0] shadow-blue-100 shadow">
                <button
                  disabled={
                    sc.seats === 0 ||
                    users?.role === "admin" ||
                    users?.role === "instructor"
                  }
                  onClick={() => handleSelectButton(user, sc)}
                  className="btn btn-block rounded-full border-transparent bg-[#571ce0] hover:bg-transparent px-5 text-white hover:border-[#571ce0]"
                >
                  Select Class
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Classes;
