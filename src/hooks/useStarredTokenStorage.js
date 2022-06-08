import { useState, useEffect } from "react";
let key = "starredToken";
let defaultValue = [];
function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = JSON.parse(localStorage.getItem(key));
  if (saved) return saved;
  if (defaultValue instanceof Function) return defaultValue();
  return defaultValue;
}

export const useStarredTokenStorage = () => {
  const [starredToken, setStarredToken] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(starredToken));
  }, [key, starredToken]);

  return [starredToken, setStarredToken];
};
