import { useState, useEffect } from "react";
let key = "watchCG";
let defaultValue = [];
function getStorageValue(key, defaultValue) {
  // getting stored value
  const saved = JSON.parse(localStorage.getItem(key));
  if (saved) return saved;
  if (defaultValue instanceof Function) return defaultValue();
  return defaultValue;
}
export const useCGWatchStorage = () => {
  const [watchCG, setWatchCG] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(watchCG));
  }, [watchCG]);

  return [watchCG, setWatchCG];
};
