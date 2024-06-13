import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { EditProducts } from "./pages/EditProducts";
import { AllProducts } from "./pages/AllProducts";
import { useEffect, useState } from "react";
import { LoginForm } from "./pages/Login";
import { RegisterForm } from "./pages/Register";
import { Toaster } from "./components/ui/toaster";
import { getMethod } from "./utils/ApiMethods";
import { useStore } from "./context/storeContext";
import { LoadingPage } from "./components/LoadingPage";
import { Show } from "./utils/Show";
import { AddProducts } from "./pages/AddProducts";
import { Sidebar } from "./components/SideBar";
import { Profile } from "./pages/Profile";
import { ThemeProvider } from "./components/theme-provider";

function App() {
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const { setState } = useStore();
  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      getMethod("/users", token).then((res) => {
        console.log(res);
        setLoading(false);
        setState({
          name: res.data.user.name,
          email: res.data.user.email,
          phone: res.data.user.phone,
          address: res.data.user.address,
          role: res.data.user.role,
          avatar: res.data.user.photo,
          loggedIn: true,
        });
      });
    }
  }, []);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Show>
          <Show.When isTrue={isLoggedIn && loading} children={<LoadingPage></LoadingPage>}></Show.When>

          <Show.When
            isTrue={isLoggedIn && !loading}
            children={
              <div>
                <Sidebar />
                <Routes>
                  <Route path="/" exact Component={AllProducts} />
                  <Route path="/products/edit/:id" Component={EditProducts}></Route>
                  <Route path="/products/add-product" Component={AddProducts}></Route>
                  <Route path="/profile" exact element={<Profile />} />
                  <Route path="*" element={<Navigate to={"/"} />} />
                </Routes>
              </div>
            }
          ></Show.When>
          <Show.Else
            children={
              <Routes>
                <Route
                  path="/login"
                  element={
                    <div className="flex justify-center items-center h-full">
                      <LoginForm />
                    </div>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <div className="flex justify-center items-center h-full">
                      <RegisterForm />
                    </div>
                  }
                />
                <Route path="*" element={<Navigate to={"/login"} />} />
              </Routes>
            }
          ></Show.Else>
        </Show>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
