import React, { useEffect, useState, useContext } from "react";
import { DataContext } from "../../context/dataContext";

// components
import Form from "../../components/form";
import Input from "../../components/Utils/input";
import Button from "../../components/Utils/button";

// utils
import { notify } from "../../utilities/toast";

const EditProfile = ({ setLoading, handleChangeComponent }) => {
  const { editProfile, dataProfile, setDataProfile } = useContext(DataContext);

  const [fullname, setFullname] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");

  const sendData = async (e) => {
    e.preventDefault();

    const validate = (value) => {
      if (value.trim()) {
        return value;
      }

      return null;
    };

    let userFullName = validate(fullname);
    let userLocation = validate(location);
    let userBio = validate(bio);

    let body = {
      fullname: userFullName,
      location: userLocation,
      bio: userBio,
    };

    try {
      setLoading(true);

      const request = await editProfile(body);

      if (request.success === true) {
        setLoading(false);

        const data = request.data;

        let dataProfileUpdated = {
          fullname: data.fullname,
          location: data.location,
          bio: data.bio,
        };

        // primero ago una copia del estado anterior
        // y luego ese objeto lo sobre escribo con las nuevas propiedades
        // actualizadas de la request
        setDataProfile({ ...dataProfile, ...dataProfileUpdated });

        let noChangesInDataProfile =
          (dataProfileUpdated.fullname ||
            dataProfileUpdated.location ||
            dataProfileUpdated.bio) === null;

        if (noChangesInDataProfile) {
          return handleChangeComponent(false);
        }

        handleChangeComponent(false);

        return notify("success", request.message);
      }
    } catch (error) {
      setLoading(false);
      notify("error", error);
    }
  };

  useEffect(() => {
    if (dataProfile.fullname) {
      setFullname(dataProfile.fullname);
    }
    if (dataProfile.location) {
      setLocation(dataProfile.location);
    }
    if (dataProfile.bio) {
      setBio(dataProfile.bio);
    }
  }, [dataProfile.fullname, dataProfile.location, dataProfile.bio]);

  return (
    <Form handleSubmit={(e) => sendData(e)}>
      <div className="mb-6">
        <Input
          placeHolder="fullname"
          value={fullname}
          handleChange={(e) => setFullname(e.target.value)}
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
  );
};

export default EditProfile;
