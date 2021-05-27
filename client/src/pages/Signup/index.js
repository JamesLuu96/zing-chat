import React, { useState } from "react";

import { useMutation } from "@apollo/react-hooks";
import Auth from "../../utils/auth";
import { ADD_USER } from "../../utils/mutations";
import { Link, Redirect } from "react-router-dom";

function Signup() {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        username: userInfo.username,
        password: userInfo.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <h2>Signup</h2>
      <form onSubmit={handleFormSubmit}>
        <input
          placeholder="username"
          name="username"
          value={userInfo.username}
          onChange={handleChange}
        />

        <input
          placeholder="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
        />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
