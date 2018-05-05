export const dasherize = string => {
  return string && string.replace(/[A-Z]/g, (char, index) => {
    return (index !== 0 ? '-' : '') + char.toLowerCase();
  });
};
