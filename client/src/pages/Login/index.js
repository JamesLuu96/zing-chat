import React, { useState } from "react";
import { LOGIN } from "../../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../../utils/auth";
function Login() {
  const [userInfo, setUserInfo] = useState({ username: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const userInfoChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };
  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        variables: { username: userInfo.username, password: userInfo.password },
      });
      const token = response.data.login.token;
      Auth.login(token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={formSubmitHandler}>
        <label>username</label>
        <input name="username" onChange={userInfoChangeHandler} />
        <label>password</label>
        <input name="password" onChange={userInfoChangeHandler} />
        {error ? (
          <div>
            <p className="error-text">The user information are incorrect</p>
          </div>
        ) : null}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
