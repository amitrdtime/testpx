// Function to convert keys of an object to camelCase
const keysToCamelCase = (objectToConvert) => {
    var newObject, origKey, newKey, value
  if (objectToConvert instanceof Array) {
    return objectToConvert.map(function(value) {
        if (typeof value === "object") {
          value = keysToCamelCase(value)
        }
        return value
    })
  } else {
    newObject = {}
    for (origKey in objectToConvert) {
      if (objectToConvert.hasOwnProperty(origKey)) {
        newKey = (origKey.charAt(0).toLowerCase() + origKey.slice(1) || origKey).toString()
        value = objectToConvert[origKey]
        if (value instanceof Array || (value !== null && value.constructor === Object)) {
          value = keysToCamelCase(value)
        }
        newObject[newKey] = value
      }
    }
  }
  return newObject
  };

 export default {
    keysToCamelCase
};