import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../context/dataContext";

// components
import Navigation from "../components/navigation/nav";
import Form from "../components/form";
import Input from "../components/Utils/input";
import Button from "../components/Utils/button";
import Screen from "../components/Utils/screen";
import Spinner from "../components/Utils/spinner";

// utils
import { capitalizeText } from "../utilities/regExp";
import { notify } from "../utilities/toast";

const Profile = () => {
  const { setDataProfile, dataProfile, editProfile, loading, setLoading } =
    useContext(DataContext);

  const { username, fullname, location: place, bio: about } = dataProfile;

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [edit, setEdit] = useState(false);
  const [resize, setResize] = useState(false);

  console.log(fullname, place, about, "DataEditProfile");

  const handleChangeComponent = (changeState) => {
    setEdit(changeState);
    setResize(changeState);
  };

  const clearInputs = () => {
    setName("");
    setLocation("");
    setBio("");
  };

  const sendData = async (e) => {
    e.preventDefault();

    let body = {};

    // const inputValidate = (text, property, value) => {
    //   let obj = {};
    //   if (text.trim()) {
    //     obj[property] = value;
    //   }

    //   return obj;
    // };

    // let any = inputValidate(name, "fullname", name);

    // console.log(any, "ANY");

    if (name.trim()) {
      body.fullname = name;
    }
    if (location.trim()) {
      body.location = location;
    }
    if (bio.trim()) {
      body.bio = bio;
    }

    try {
      setLoading(true);
      console.log(body);
      const request = await editProfile(body);

      if (request.success === true) {
        setLoading(false);

        const response = request.data;

        let dataProfileUpdated = {
          fullname: response?.fullname,
          location: response?.location,
          bio: response?.bio,
        };

        // primero ago una copia del estado anterior
        // y luego ese objeto lo sobre escribo con las nuevas propiedades
        // actualizadas de la request
        setDataProfile({ ...dataProfile, ...dataProfileUpdated });

        let noChangesInDataProfile =
          (dataProfileUpdated.fullname ||
            dataProfileUpdated.location ||
            dataProfileUpdated.bio) === undefined;

        if (noChangesInDataProfile) {
          clearInputs();
          return handleChangeComponent(false);
        }

        // solucionar con un useEffect para limpiar lo que sea que se haya
        // agrgado en los input

        //porque lo que está pasando es que los inputs quedan con
        // el value ingrado entonces eso es lo que semuestra, simpre necesitaria
        // limpiarlos por si quedan espacios en blanco y al monstarse el form volver
        // a setear los valor si existen!

        // clearInputs();
        handleChangeComponent(false);

        return notify("success", request.message);
      }
    } catch (error) {
      setLoading(false);
      notify("error", error);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    if (fullname) setName(fullname);
    if (place) setLocation(place);
    if (about) setBio(about);
  }, [fullname, place, about]);

  return (
    <>
      <Navigation />
      {loading && <Screen children={<Spinner />} />}
      <div
        className={`max-w-4xl flex items-center h-auto bg-scroll lg:h-screen flex-wrap mx-auto my-16 md:my-14 
        ${resize ? "lg:my-14" : "lg:my-0"}`}
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
                  {fullname && capitalizeText(fullname)}
                </h1>
                <div className="mx-auto  w-4/5 pt-3 border-b-2 border-blue-500 opacity-25"></div>

                <p className="pt-4 text-base font-bold flex items-center justify-center ">
                  {username}
                </p>

                <p className="pt-2 text-gray-600 text-xs lg:text-sm flex items-center justify-center ">
                  {place ? place : "Location"}
                </p>
                <p className="pt-8 text-sm">{about ? about : "About you"}</p>

                <div className="pt-12 pb-8">
                  <button
                    onClick={() => handleChangeComponent(true)}
                    className="bg-blue-900  text-white font-bold py-2 px-20 rounded"
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
                      placeHolder="fullname"
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
                      fn={() => handleChangeComponent(false)}
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
