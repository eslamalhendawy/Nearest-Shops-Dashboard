import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { EditLecture } from "./pages/EditLecture"
import { AllCourses } from "./pages/AllCourses"
import { useEffect, useState } from "react"
import { LoginForm } from "./pages/Login"
import { RegisterForm } from "./pages/Register"
import { Toaster } from "./components/ui/toaster"
import { getMethod } from "./utils/ApiMethods"
import { useStore } from "./context/storeContext"
import { LoadingPage } from "./components/LoadingPage"
import { Show } from "./utils/Show"
import { AddLecture } from "./pages/AddLecture"
import { Sidebar } from "./components/SideBar"
import { Profile } from "./pages/Profile"
import { ThemeProvider } from "./components/theme-provider"
import DetailsCourse from "./pages/DetailsCourse"
import { DetailsLectrue } from "./pages/DetailsLectrue"

function App() {
    const isLoggedIn = Boolean(localStorage.getItem("token"))
    const [loading, setLoading] = useState(true)
    const { setState } = useStore()
    useEffect(() => {
        if (isLoggedIn) {
            const token = localStorage.getItem("token")
            getMethod("/teachers/me", token).then((res) => {
                console.log(res)
                setLoading(false)
                setState(res.data)
            })
        }
    }, [])
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
                                    <Route path="/" exact Component={AllCourses} />
                                    <Route path="/products/edit/:id" Component={EditLecture}></Route>
                                    <Route path="/course/add-lectrue/:id" Component={AddLecture}></Route>
                                    <Route path="/course/details/:id" Component={DetailsCourse}></Route>
                                    <Route path="/lecture/details/:id" Component={DetailsLectrue}></Route>
                                    {/* <Route path="/profile" exact element={<Profile />} /> */}
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
                                {/* <Route
                  path="/register"
                  element={
                    <div className="flex justify-center items-center h-full">
                      <RegisterForm />
                    </div>
                  }
                /> */}
                                <Route path="*" element={<Navigate to={"/login"} />} />
                            </Routes>
                        }
                    ></Show.Else>
                </Show>
                <Toaster />
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
