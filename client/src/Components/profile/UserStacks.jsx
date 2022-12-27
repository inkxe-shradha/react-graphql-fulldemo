import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoadingState, getUserDetails } from "../../store/slices/userSlice";
import { getUserStacks } from "../../store/slices/userThunk";
import { Loading } from "../Loading/Loading";

const UserStacks = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUserDetails);
  const isLoading = useSelector(getLoadingState) === "loading";
  React.useEffect(() => {
    if (user.id) {
      dispatch(getUserStacks(user.id));
    }
  }, [dispatch, user.id]);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="card-group">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Category Lists</h4>
        </div>
        <div className="card-body">
          {user.categories && user.categories.length === 0 ? (
            <div className="alert alert-warning text-center">
              You don't have any categories available
            </div>
          ) : (
            user.categories.map((ele) => (
              <div
                className="alert alert-light border-primary border-start border-5"
                key={ele.id}
              >
                {ele.name}
              </div>
            ))
          )}
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Post Lists</h4>
        </div>
        <div className="card-body">
          {user.categories && user.posts.length === 0 ? (
            <div className="alert alert-warning text-center">
              You don't have any posts available
            </div>
          ) : (
            user.posts.map((ele) => (
              <div
                className="alert alert-light border-info border-start border-5"
                key={ele.id}
              >
                {ele.title}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserStacks;
