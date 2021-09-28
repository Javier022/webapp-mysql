import React, { useContext, useState } from "react";
import { DataContext } from "../context/dataContext";

// components
import Navigation from "../components/navigation/nav";
import Form from "../components/form";

// utils
import { capitalizeText } from "../utilities/regExp";
import Input from "../components/Utils/input";
import Button from "../components/Utils/button";

const Profile = () => {
  const { dataProfile } = useContext(DataContext);

  console.log(dataProfile);

  const { username, fullName } = dataProfile;

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [flag, setFlag] = useState(false);

  const changeToForm = () => {
    setEdit(true);
    setFlag(true);
  };

  const changeToProfile = () => {
    setEdit(false);
    setFlag(false);
  };

  const sendData = (e) => {
    e.preventDefault();

    console.log("no se envio");
  };

  return (
    <>
      <Navigation />
      <div
        className={`max-w-4xl flex items-center h-auto bg-scroll lg:h-screen flex-wrap mx-auto my-16 md:my-14 
        ${flag ? "lg:my-14" : "lg:my-0"}`}
      >
        <div className="w-full rounded-xl border border-t-0 shadow mx-6 lg:mx-0">
          <div className="p-4 md:p-12 text-center ">
            <div className="bg-white rounded-full border shadow-md mx-auto -mt-16 h-48 w-48  flex items-center justify-center">
              <h1 className="text-8xl text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-700">
                {username[0].toUpperCase()}
              </h1>
            </div>

            {edit === false ? (
              <>
                <h1 className="text-3xl font-bold pt-3 ">
                  {fullName && capitalizeText(fullName)}
                </h1>
                <div className="mx-auto  w-4/5 pt-3 border-b-2 border-blue-500 opacity-25"></div>

                <p className="pt-4 text-base font-bold flex items-center justify-center ">
                  {username}
                </p>

                <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center ">
                  Your Location
                </p>
                <p className="pt-8 text-sm">About you</p>

                <div className="pt-12 pb-8">
                  <button
                    onClick={() => changeToForm()}
                    className="bg-blue-900  text-white font-bold py-2 px-10 rounded"
                  >
                    Edit Profile
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-center">
                <Form handleSubmit={(e) => sendData(e)}>
                  <div className="mb-6">
                    <Input
                      placeHolder="name"
                      value={name}
                      handleChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <Input
                      placeHolder="location"
                      value={location}
                      handleChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <textarea
                      className="resize-none shadow border rounded appearance-none w-full py-2 px-3 text-gray-700 leading-tight focus:border-blue-500 focus:outline-none focus:shadow-outline"
                      placeholder="add a bio"
                      maxLength="175"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-6">
                    <Button name="Save" />
                  </div>
                  <div>
                    <Button
                      fn={() => changeToProfile()}
                      name="Cancel"
                      color="bg-gray-200"
                      textColor="text-gray-400"
                      type="button"
                    />
                  </div>
                </Form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
