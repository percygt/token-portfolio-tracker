import React, { createContext, useContext } from "react";
import { useStarredTokenStorage } from "../hooks/useStarredTokenStorage";
import { useCGWatchStorage } from "../hooks/useCGWatchStorage";

const Main = createContext();
const MainContext = ({ children }) => {
  const [starredToken, setStarredToken] = useStarredTokenStorage();
  const [watchCG, setWatchCG] = useCGWatchStorage();

  return (
    <Main.Provider
      value={{
        starredToken,
        setStarredToken,
        watchCG,
        setWatchCG,
      }}
    >
      {children}
    </Main.Provider>
  );
};

export default MainContext;

export const MainState = () => {
  return useContext(Main);
};
