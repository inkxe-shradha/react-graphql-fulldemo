import { Outlet } from "react-router";
import "./App.css";
import Header from "./Components/Header/Header";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./Hooks/useAuth";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Header isHide={false} />
      </AuthProvider>
      <main className="container mt-4">
        <Outlet />
      </main>
      <ToastContainer
        position="top-right"
        newestOnTop
        autoClose={5000}
        closeOnClick
        icon
        pauseOnHover
        closeButton={false}
        hideProgressBar
      />
    </Provider>
  );
}

export default App;
