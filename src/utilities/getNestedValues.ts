interface NestedObject {
  [key: string]: any;
}

export function getAllNestedValues(obj: NestedObject): any[] {
  const values: any[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      if (typeof value === "object" && value !== null) {
        if (Array.isArray(value)) {
          // Handle arrays by recursively calling the function for each item
          value.forEach((item: any) => {
            values.push(...getAllNestedValues(item));
          });
        } else {
          // Handle nested objects by recursively calling the function
          values.push(...getAllNestedValues(value));
        }
      } else {
        // Add non-object values to the result array
        values.push(value);
      }
    }
  }

  return values;
}

// export function getAllNestedKeys(obj: NestedObject, parentKey = ""): string[] {
//   let keys: string[] = [];

//   for (const key in obj) {
//     if (obj.hasOwnProperty(key)) {
//       const currentKey = parentKey ? `${parentKey}.${key}` : key;
//       keys.push(currentKey);

//       if (typeof obj[key] === "object" && obj[key] !== null) {
//         keys = keys.concat(getAllNestedKeys(obj[key], currentKey));
//       }
//     }
//   }

//   return keys;
// }

export function getAllNestedKeys(obj: NestedObject, parentKey = ""): string[] {
  let keys: string[] = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const currentKey = parentKey ? `${parentKey}.${key}` : key;

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key]) &&
        Object.keys(obj[key]).length > 0
      ) {
        keys = keys.concat(getAllNestedKeys(obj[key], currentKey));
      } else {
        keys.push(currentKey);
      }
    }
  }

  return keys;
}
