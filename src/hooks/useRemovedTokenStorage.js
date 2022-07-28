import { useState, useEffect } from "react";
let key = "removedToken";
let defaultValue = [];
function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = JSON.parse(localStorage.getItem(key));
  if (saved) return saved;
  if (defaultValue instanceof Function) return defaultValue();
  return defaultValue;
}
export const useRemovedTokenStorage = () => {
  const [removedToken, setRemovedToken] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(removedToken));
  }, [removedToken]);

  return [removedToken, setRemovedToken];
};
