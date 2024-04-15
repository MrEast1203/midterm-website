import React, { useState } from "react";
import { useUser } from "../hooks/userHooks";
import services from "../services";
// services.user.createOne({ name: formData.username }).then((data) => {
//     setMessage(JSON.stringify(data, null, 2));
//   });

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { user, setUser, isLoggedIn, setIsLoggedIn, setImage } = useUser();

  // Placeholder functions for handling form submission and registration click
  const handleLogin = (e) => {
    e.preventDefault();
    // console.log("Logging in with:", username, password);
    if (username === "" || password === "") {
      setMessage("Please enter username and password");
      return;
    }
    services.user
      .getOneUser(username, password)
      .then((data) => {
        // console.log(data.message);
        setUser({ username: username, password: password });
        setImage(data.image);
        setIsLoggedIn(true);
        setMessage(`Welcome back, ${username}`);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 401) {
          setMessage("Invalid username or password");
        }
      });

    // Add login logic here
  };
  const handleLogout = (e) => {
    e.preventDefault();
    // console.log("Logging out...");
    setUser({});
    setIsLoggedIn(false);
    setMessage("");
    // Add logout logic here
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // console.log("Redirecting to register page...");
    if (username === "" || password === "") {
      setMessage("Please enter username and password");
      return;
    }
    services.user
      .createOne({ name: username, password: password })
      .then((data) => {
        // console.log(JSON.stringify(data, null, 2));
        setIsLoggedIn(true);
        setUser({ username: username, password: password });
        setMessage("User created successfully");
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        // console.error("Failed to create user:", JSON.stringify(error, null, 2));
        if (error.response.status === 409) {
          setMessage("This username has been used");
        }
      });

    // Add redirect to registration page logic here
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white p-16 rounded-lg shadow-md max-w-4xl mx-auto">
        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
          />
          <p>{message}</p>
          <div className="flex justify-between">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={handleRegister}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600">
                  Register
                </button>
                <button
                  onClick={handleLogin}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                  Login
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                Logout
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
