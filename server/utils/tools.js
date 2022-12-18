const isValidUser = (req, value) => {
  if (String(req.id) !== String(value)) {
    return false;
  }
  return true;
};

export const sortByHelper = (sort) => {
  let args = { sortBy: "_id", orderBy: "desc", limit: 10, skip: 0 };
  return { ...args, ...sort };
};

export default isValidUser;
