import { createContext, useContext, useState } from "react";
const UserContext = createContext({
  user: {},
  setUser: () => {},
  userImage: "",
  setUserImage: () => {},
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  image: null,
  setImage: () => {},
});
const UserProvider = (props) => {
  const [user, setUser] = useState({});
  const [userImage, setUserImage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [image, setImage] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userImage,
        setUserImage,
        isLoggedIn,
        setIsLoggedIn,
        image,
        setImage,
      }}
      {...props}
    />
  );
};

function useUser() {
  return useContext(UserContext);
}

export { UserProvider, useUser };
