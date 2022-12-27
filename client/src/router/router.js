import { createRoutesFromElements } from "react-router";
import { createBrowserRouter, Route } from "react-router-dom";
import App from "../App";
import Article from "../Pages/article";
import CreateArticle from "../Pages/article/CreateArticle";
import SignIn from "../Pages/Auth/SignIn";
import Profile from "../Pages/profile/Profile";
import ProfileSettings from "../Pages/profile/ProfileSettings";
import { Welcome } from "../Pages/Welcome/Welcome";
import { ProtectedRoute } from "./Auth/ProtectedRoutes";
// https://blog.logrocket.com/complete-guide-authentication-with-react-router-v6/
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Welcome />} />
      <Route path="auth" element={<SignIn />} />
      <Route path="library" element={<ProtectedRoute />}>
        <Route index element={<Article />} />
        <Route path="create" element={<CreateArticle />} />
      </Route>
      <Route path="profile" element={<ProtectedRoute />}>
        <Route index element={<Profile />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Route>
    </Route>
  )
);

export default router;
