const Logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("-------start log--------", action);
  console.log("--The Action: ", action);
  const returnValue = next(action);
  console.log("--The new state: ", store.getState());
  console.log("--------end log-------", action);
  console.groupEnd();
  return returnValue;
};

export default Logger;
