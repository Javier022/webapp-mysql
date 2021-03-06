import React, { useState, useContext } from "react";
import { DataContext } from "context/dataContext";
import api from "services/api";

// components
import Spinner from "components/Utils/spinner/index";
// utils
import { notify } from "utilities/toast";

const Users = ({ id, username, email, rol, state }) => {
  const [loading, setLoading] = useState(false);

  const { users, setUsers } = useContext(DataContext);

  const deleteUser = async (e) => {
    const userId = parseInt(e.target.dataset.id);

    try {
      setLoading(true);
      const request = await api.delete(`/admin/delete-user/${userId}`);
      if (request.status === 200 && request.data.success === true) {
        setLoading(false);
        const activeUsers = users.map((item) => {
          if (item.id === userId) return {};
          return item;
        });

        setUsers(activeUsers);
        return notify("success", "user disabled");
      }
    } catch (error) {
      setLoading(false);
      notify("error", error.message);
    }
  };

  return (
    <div className="flex flex-col space-y-1 sm:space-y-0 sm:flex sm:flex-row border bg-white rounded-lg shadow p-4 mb-8">
      <div className="flex-1 sm:flex flex-col items-center">
        <div className="flex items-center justify-between sm:block">
          <p className="text-blue-900 text-lg font-medium text-black">
            username
          </p>

          <p className="text-gray-500">{username}</p>
        </div>
      </div>
      <div className="flex-1 sm:flex flex-col items-center">
        <div className="flex items-center justify-between sm:block">
          <p className="text-blue-900 text-lg font-medium text-black">email</p>

          <p className="text-gray-500">{email}</p>
        </div>
      </div>
      <div className="flex-1 sm:flex flex-col items-center">
        <div className="flex items-center justify-between sm:block">
          <p className="text-blue-900 text-lg font-medium text-black">rol</p>

          <p className="text-gray-500">{rol}</p>
        </div>
      </div>

      <div className="flex-1 sm:flex flex-col items-center">
        <div className="flex items-center justify-between sm:block">
          <p className="text-blue-900 text-lg font-medium text-black">state</p>

          <div className="text-gray-500 flex justify-between items-center">
            <p className="text-gray-500 pr-1">{state ? "active" : "deleted"}</p>
            <p
              className={`
              ${state ? "bg-green-400" : "bg-red-500"} rounded-full h-3 w-3`}
            ></p>
          </div>
        </div>
      </div>

      {state ? (
        <div className="flex-1 flex justify-center pt-3 sm:pt-0 sm:flex justify-center items-center">
          {loading ? (
            <Spinner size={6} mb={0} border={2} />
          ) : (
            <button
              data-id={id}
              onClick={(e) => deleteUser(e)}
              className=" w-full py-2 sm:w-auto sm:px-7 sm:py-1.5  text-white text-xs font-bold rounded-lg bg-red-600"
            >
              eliminar
            </button>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Users;
