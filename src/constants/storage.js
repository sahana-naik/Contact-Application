

export const _storeData = async (key, data) => {
    try {
      console.log("vdvd", key, data);
      await localStorage.setItem(key, data);
    } catch (e) {
      console.log("\nError while saving data");
    }
  };

  export const _retrieveData =  (key) => {
    try {
      const value = JSON.parse( localStorage.getItem(key));
      if (value !== null) {
        return value;
      }
      return null;
    } catch (error) {
      // Error retrieving data
      console.log(`Error: Getting ${key} value rom storage`);
      throw new Error(`Error: Getting ${key} value rom storage`);
    }
  };

//   export const _retrieveData = async (key) => {
//     try {
//       const value = await localStorage.getItem(key);
//       if (value !== null) {
//         return value;
//       }
//       return null;
//     } catch (error) {
//       // Error retrieving data
//       console.log(`Error: Getting ${key} value rom storage`);
//       throw new Error(`Error: Getting ${key} value rom storage`);
//     }
//   };
  export const _removeData = async (key) => {
      try {
        await localStorage.removeItem(key);
      } catch (e) {
        console.log("\nError while deleting data");
      }
    };