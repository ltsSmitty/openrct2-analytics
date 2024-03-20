export function areObjectValuesEqual(obj1: any, obj2: any): boolean {
  // Check if the objects are the same type
  if (typeof obj1 !== typeof obj2) {
    // console.log(`types don't match`);
    return false;
  }

  // Check if the objects have the same number of properties
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    // console.log(`number of properties don't match`);
    return false;
  }

  // Compare the values of each property
  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) {
      //   console.log(`values don't match`, key, obj1[key], obj2[key]);
      return false;
    }
  }

  // The objects are equal
  //   console.log(`objects are equal`);
  return true;
}
