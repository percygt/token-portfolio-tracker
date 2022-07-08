export const n6 = new Intl.NumberFormat("en-us", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 6,
});
export const n4 = new Intl.NumberFormat("en-us", {
  style: "decimal",
  minimumFractionDigits: 0,
  maximumFractionDigits: 4,
});

export const c2 = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`;
  }
  return "";
};

export const getEllipsisTxtRight = (str, n = 10) => {
  if (str.length > n) {
    return `${str.slice(0, n)}...`;
  }
  return str;
};

export const getRoundDown = (s) => {
  if (s) {
    let str = Math.floor(s).toString();
    if (s.length > 1 && parseFloat(s).toLocaleString() == 0) {
      return parseFloat(s).toPrecision(1);
    } else if (str.length === 6) {
      return `0.${str.slice(0, 1)} M`;
    } else if (str.length >= 7 && str.length <= 9) {
      if (str.slice(1, 2) == 0 && str.slice(2, 3) == 0) {
        return `${str.slice(0, 1)} M`;
      } else {
        return `${str.slice(0, 1)}.${str.slice(1, 3)} M`;
      }
    } else if (str.length >= 10 && str.length <= 12) {
      return `${str.slice(0, 1)}.${str.slice(1, 3)} B`;
    } else if (
      s.toString().slice(1, 2) === "." ||
      s.toString().slice(2, 3) === "." ||
      s.toString().slice(3, 4) === "." ||
      s.toString().slice(5, 6) === "."
    ) {
      return parseFloat(s).toLocaleString();
    } else return parseFloat(str).toLocaleString();
  } else return s;
};

export const tokenValue = (value, decimals) =>
  decimals ? value / Math.pow(10, decimals) : value;

/**
 * Return a formatted string with the symbol at the end
 * @param {number} value integer value
 * @param {number} decimals number of decimals
 * @param {string} symbol token symbol
 * @returns {string}
 */
export const tokenValueTxt = (value, decimals, symbol) =>
  `${n4.format(tokenValue(value, decimals))} ${symbol}`;
