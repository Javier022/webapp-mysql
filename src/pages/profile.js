import React, { useContext, useState } from "react";
import { DataContext } from "../context/dataContext";

// components
import Navigation from "../components/navigation/nav";

// utils
import { capitalizeText } from "../utilities/regExp";

const Profile = () => {
  const { dataProfile } = useContext(DataContext);
  const { error, setError } = useState(true);
  // validar que la data Profile, para que no de error

  // para empezar si al obtener la data de la navegacion me da un error entonces
  // no deberia ni siquiera nada ni la barra de navegacion ni las vistas, si no una pantalla
  // de error interno status 500

  if (Object.values(dataProfile).length === 0) {
    console.log("error");
    return setError(true);
  }

  const { username, email } = dataProfile;

  return (
    <>
      <Navigation />
      <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-16 md:my-14 lg:my-0">
        <div className="w-full rounded-xl border border-t-0 shadow mx-6 lg:mx-0">
          <div className="p-4 md:p-12  text-center ">
            <div className="bg-white rounded-full border shadow-md mx-auto -mt-16 h-48 w-48  flex items-center justify-center">
              <h1 className="text-8xl text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
                {username[0].toUpperCase()}
              </h1>
            </div>

            <h1 className="text-3xl font-bold pt-8 lg:pt-0">
              {capitalizeText(username)}
            </h1>
            <div className="mx-auto  w-4/5 pt-3 border-b-2 border-blue-500 opacity-25"></div>
            <p className="pt-4 text-base font-bold flex items-center justify-center ">
              {email}
            </p>
            <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center ">
              Your Location
            </p>
            <p className="pt-8 text-sm">About you</p>

            <div className="pt-12 pb-8">
              <button className="bg-blue-900  text-white font-bold py-2 px-10 rounded">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
