import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeUsersAction } from "../reducers/users";
import { Link } from "react-router-dom";

const Users = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    // dispatch(initializeBlogsAction());
    dispatch(initializeUsersAction());
  }, [state.blogs, dispatch]);

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>Blogs</th>
          </tr>
        </thead>
        <tbody>
          {state.users.map((user) => {
            return (
              <tr key={user.id}>
                <th>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </th>
                <th>{user.blogs.length}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
