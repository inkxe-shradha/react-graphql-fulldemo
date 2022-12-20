import React from "react";

const LogOnForm = () => {
  return (
    <form className="mt-2">
      <input
        type="text"
        id="name"
        className="fadeIn second"
        name="name"
        placeholder="Your First Name"
      />
      <input
        type="text"
        id="lname"
        className="fadeIn second"
        name="lname"
        placeholder="Your Last Name"
      />
      <input
        type="email"
        id="email"
        className="fadeIn second"
        name="email"
        placeholder="Your email address"
      />
      <input
        type="text"
        id="password"
        className="fadeIn third"
        name="login"
        placeholder="password"
      />
      <input type="submit" className="fadeIn fourth" value="Sign Up" />
    </form>
  );
};

export default LogOnForm;
