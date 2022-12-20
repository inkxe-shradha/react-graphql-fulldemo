import { createRoutesFromElements } from "react-router";
import { createBrowserRouter, Route } from "react-router-dom";
import App from "../App";
import SignIn from "../Pages/Auth/SignIn";
import { Welcome } from "../Pages/Welcome/Welcome";
// https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Welcome />} />
      <Route path="auth" element={<SignIn />} />
    </Route>
  )
);

export default router;
