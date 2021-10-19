import React, { useContext, useState } from "react";
import { DataContext } from "../../context/dataContext";

// components
import Navigation from "../../components/navigation/nav";
import Screen from "../../components/Utils/screen";
import Spinner from "../../components/Utils/spinner";

import EditProfile from "./editProfile";

// utils
import { capitalizeText } from "../../utilities/regExp";

const Profile = () => {
  const { dataProfile, loading, setLoading } = useContext(DataContext);

  const { username, fullname, location, bio } = dataProfile;

  const [edit, setEdit] = useState(false);
  const [resize, setResize] = useState(false);

  const handleChangeComponent = (changeState) => {
    setEdit(changeState);
    setResize(changeState);
  };

  let propsToeEditProfile = {
    setLoading,
    handleChangeComponent,
  };

  return (
    <>
      <Navigation />
      {loading && <Screen children={<Spinner />} />}
      <div
        className={`max-w-4xl flex items-center h-auto bg-scroll lg:h-screen flex-wrap mx-auto my-16 md:my-14 
        ${resize ? "lg:my-14" : "lg:my-0"}`}
      >
        <div className="w-full rounded-lg border border-t-0 shadow mx-6 lg:mx-0">
          <div className="p-4 md:p-12 text-center">
            <div className="bg-white rounded-full border shadow-md mx-auto -mt-16 h-48 w-48  flex items-center justify-center">
              <h1 className="text-8xl text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
                {username[0].toUpperCase()}
              </h1>
            </div>

            {edit === false ? (
              <>
                <h1 className="text-3xl font-bold pt-3 ">
                  {fullname && capitalizeText(fullname)}
                </h1>
                <div className="mx-auto  w-4/5 pt-3 border-b-2 border-blue-500 opacity-25"></div>

                <p className="pt-4 text-base font-bold flex items-center justify-center ">
                  {username}
                </p>

                <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center ">
                  {location ? location : "Your location"}
                </p>
                <p className="pt-8 text-sm">{bio ? bio : "About you"}</p>

                <div className="pt-12 pb-8">
                  <button
                    onClick={() => handleChangeComponent(true)}
                    className="p-2 px-14 sm:py-2 sm:px-20  bg-blue-900  text-white font-bold  rounded"
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <EditProfile {...propsToeEditProfile} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
