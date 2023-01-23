import React from "react";
export const NavBar = (props) => {
  const logout = () => Meteor.logout();

  return (
    <div>
      <div className="navbar bg-blue-500 text-white absolute z-30 left-0 right-0 rounded-md">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost normal-case text-xl">PomyBara</a>
        </div>
        <div className="navbar-end">
          <button onClick={logout} className="btn btn-ghost btn-circle">
            Exit
          </button>
        </div>
      </div>
      {props.children}
    </div>
  );
};
