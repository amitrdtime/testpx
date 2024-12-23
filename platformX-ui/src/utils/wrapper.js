const toCamelCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1 $2')   // Add space before capital letters
      .replace(/[\s-_]+/g, ' ')               // Replace spaces, hyphens, underscores with space
      .toLowerCase()                          // Convert to lowercase
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase()
      )
      .replace(/\s+/g, '');                   // Remove spaces
  };
  
  // Wrapper method to convert all keys of an object to camel case
  const keysToCamelCase = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(item => keysToCamelCase(item));
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).reduce((result, key) => {
        result[toCamelCase(key)] = keysToCamelCase(obj[key]);
        return result;
      }, {});
    }
    return obj;
  };

  export default keysToCamelCase;