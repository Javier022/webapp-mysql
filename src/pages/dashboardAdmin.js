import React, { useEffect, useState } from "react";

import api from "../services/api";
// components
import Screen from "../components/Utils/screen";
import Spinner from "../components/Utils/spinner/index";
import Navigation from "../components/navigation/nav";
import UserCard from "../components/user";

// utils
import { notify } from "../utilities/toast";
import { parseData } from "../utilities/parseData";

const DashboardAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const deleteUser = async (e) => {
    const userId = e.target.dataset.id;
    try {
      // setSpinner(true);

      // const request = await api.delete(`/admin/delete-user/${userId}`);
      // request.status === 200 && request.data.success === true

      setTimeout(() => {
        if (true) {
          // setSpinner(false);

          const users = parseData(data);
          delete users[userId];
          const newState = Object.values(users);

          setData(newState);
          return notify("success", "usuario desabilitado");
        }
      }, 2000);
    } catch (error) {
      // setSpinner(false);
      notify("error", error.message);
    }
  };

  const getDataAdmin = async (state = 1) => {
    try {
      setLoading(true);
      const request = await api.get("/admin/users");
      if (request.status === 200 && request.data.success === true) {
        setLoading(false);
        const data = request.data.data;
        const users = data.filter((user) => user.state === state);
        return setData(users);
      }
    } catch (error) {
      setLoading(false);
      notify("error", error.message);
    }
  };

  useEffect(() => {
    console.log("useEffect dashboard");
    getDataAdmin();
  }, []);

  return (
    <>
      <Navigation />
      {loading && <Screen children={<Spinner />} />}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0 w-full space-x-4">
            <button
              onClick={() => getDataAdmin()}
              className="rounded-lg bg-blue-900 py-1 px-5"
            >
              <p className="text-white font-semibold">active users</p>
            </button>
            <button
              onClick={() => getDataAdmin(0)}
              className="border border-blue-900 rounded-lg py-1 px-5"
            >
              <p className="text-blue-900 font-semibold">deleted users</p>
            </button>
          </div>
          <div className="px-4 py-6 sm:px-0">
            {/* here end layout */}
            {data.map((item) => {
              return (
                <UserCard key={item.id} {...item} fn={(e) => deleteUser(e)} />
              );
            })}
            {/*  */}
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardAdmin;
