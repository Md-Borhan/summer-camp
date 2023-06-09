import { useEffect, useState } from "react";

const useRole = () => {
  const [role, setRole] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_api_url}/users`)
      .then((res) => res.json())
      .then((data) => setRole(data));
  }, []);
  return role;
};

export default useRole;
