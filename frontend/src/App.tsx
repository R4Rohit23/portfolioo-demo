import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Landing-Page/Home";
import ArtistOnboardingPage from "./pages/Onboarding/ArtistOnboarding";
import ClientOnboardingPage from "./pages/Onboarding/ClientOnboarding";
import Navbar from "./components/Landing-Page/Navbar";
import StartOnborading from "./common/StartOnborading";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import { APIHandler } from "./server/API";
import ROUTES from "./server/Routes";
import { useDispatch, useSelector } from "react-redux";
import { setUserData, setUserLoading } from "./redux/user.slice";
import Loader from "./common/Loader";
import UpdatePassword from "./components/Auth/ResetPassword/ResetPassword";
import LoginPage from "./pages/LoginPage";
import ArtistListing from "./pages/Artist-Listing/Artist-Listing";
import OverlayFragment from "./common/OverlayFragment";
import CongulationPage from "./components/Auth/Register/Congratulations";
import ClientProfile from "./pages/Client-Profile/Client-Profile";
import {
    ArtistRoute,
    ClientRoute,
    OpenRoute,
    UserRoute,
} from "./components/Auth/Authorised";
import ArtistProfilePage from "./pages/Artist-Profile/Artist-Profile-Page";
import ClientSubscription from "./pages/Subscription/Client-Subscription";
import Create_Job from "./pages/Create-Job/Create_Job";
import JobListing from "./pages/Job-Listing/Job-Listing";
import Invitations from "./pages/Invitations";
import AdminLogin from "./pages/Admin/AdminPage";

function App() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cookie] = useCookies(["accessToken"]);

    // used for handling asynchronous issue
    const { userLoading } = useSelector(
        (store: any) => store.store.userDetails
    );
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            await dispatch(setUserLoading(true));
            const response = await APIHandler(
                "GET",
                ROUTES.AUTH.VALIDATE_USER,
                {},
                {
                    Authorization: "Bearer " + cookie?.accessToken,
                }
            );

            console.log("cookies ", cookie);
            console.log("response", response);
            if (response?.status) {
                await dispatch(setUserData(response?.data?.user));
            }
            await dispatch(setUserLoading(false));
        };

        fetchDetails();
    }, [cookie?.accessToken]);

    return (
        <>
            {userLoading ? (
                <Loader />
            ) : (
                <Routes>
                    <Route
                        element={
                            <div>
                                <Navbar />
                                <OverlayFragment
                                    isOpen={isOpen}
                                    setIsOpen={setIsOpen}
                                    children={
                                        <CongulationPage
                                            setIsOpen={setIsOpen}
                                        />
                                    }
                                    size="5xl"
                                />
                                <Outlet />
                            </div>
                        }
                    >
                        <Route
                            path="client-subscription"
                            element={<ClientSubscription />}
                        />
                        <Route path="/" element={<Home />} />

                        <Route
                            path="/account-verified"
                            element={
                                <UserRoute>
                                    <StartOnborading />
                                </UserRoute>
                            }
                        />
                        <Route
                            path="/update-password/:id"
                            element={
                                <OpenRoute>
                                    <UpdatePassword />
                                </OpenRoute>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <OpenRoute>
                                    <LoginPage />
                                </OpenRoute>
                            }
                        />

                        <Route
                            path="/artist-onboarding"
                            element={
                                <UserRoute>
                                    <ArtistOnboardingPage />
                                </UserRoute>
                            }
                        />
                        <Route
                            path="/client-onboarding"
                            element={
                                <UserRoute>
                                    <ClientOnboardingPage />
                                </UserRoute>
                            }
                        />
                        {/* <Route path="/congratulation" element={<CongratulationPage />} /> */}
                        <Route
                            path="/find-talent"
                            element={<ArtistListing />}
                        />
                        <Route path="/find-work" element={<JobListing />} />
                        <Route path="/post-job" element={<Create_Job />} />
                        <Route
                            path="/my-invitations"
                            element={
                                <ArtistRoute>
                                    <Invitations />
                                </ArtistRoute>
                            }
                        />
                    </Route>

                    <Route
                        path="/client-profile"
                        element={
                            <ClientRoute>
                                <ClientProfile />
                            </ClientRoute>
                        }
                    />

                    <Route
                        path="/artist-profile"
                        element={
                            <ArtistRoute>
                                <ArtistProfilePage />
                            </ArtistRoute>
                        }
                    />
                </Routes>
            )}
        </>
    );
}

export default App;
