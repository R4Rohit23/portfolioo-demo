import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

//  login , signup , forgot password
export const OpenRoute = ({ children }) => {
  const { userData, userLoading } = useSelector(
    (store) => store.store.userDetails
  );
  const navigate = useNavigate();
  const [cookie] = useCookies(["accessToken"]);

  useEffect(() => {
    if (!userLoading) {
      if (userData?.accountType === "Client") {
        navigate("/client-profile");
      } else if (userData?.accountType === "Artist") {
        navigate("/artist-profile");
      } else if (userData?.accountType === "User") {
        navigate("/account-verified");
      }
    }
  }, [userLoading, cookie.accessToken]);
  console.log(JSON.stringify(userData));
  return (
    <>{!userLoading && JSON.stringify(userData).length === 2 && children}</>
  );
};

// client routes
export const ClientRoute = ({ children }) => {
  const { userData, userLoading } = useSelector(
    (store) => store.store.userDetails
  );
  const navigate = useNavigate();
  const [cookie] = useCookies(["accessToken"]);

  useEffect(() => {
    if (!userLoading) {
      if (userData?.accountType === "Artist") {
        navigate("/artist-profile");
      } else if (userData?.accountType === "User") {
        navigate("/account-verified");
      } else if (JSON.stringify(userData).length === 2) {
        navigate("/login");
      }
    }
  }, [userLoading, cookie.accessToken]);

  return <>{!userLoading && children}</>;
};

// artist routes
export const ArtistRoute = ({ children }) => {
  const { userData, userLoading } = useSelector(
    (store) => store.store.userDetails
  );
  const navigate = useNavigate();
  const [cookie] = useCookies(["accessToken"]);

  useEffect(() => {
    if (!userLoading) {
      if (userData?.accountType === "Client") {
        navigate("/client-profile");
      } else if (userData?.accountType === "User") {
        navigate("/account-verified");
      } else if (JSON.stringify(userData).length === 2) {
        navigate("/login");
      }
    }
  }, [userLoading, cookie.accessToken]);

  return <>{!userLoading && children}</>;
};

//  client and artist routes
export const PrivateRoute = ({ children }) => {
  const { userData, userLoading } = useSelector(
    (store) => store.store.userDetails
  );
  const navigate = useNavigate();
  const [cookie] = useCookies(["accessToken"]);

  useEffect(() => {
    if (!userLoading) {
      if (JSON.stringify(userData).length === 2) {
        navigate("/login");
      }
    }
  }, [userLoading, cookie.accessToken]);

  return <>{!userLoading && children}</>;
};

// new user loged in route ( before staring onboarding process)
export const UserRoute = ({ children }) => {
  const { userData, userLoading } = useSelector(
    (store) => store.store.userDetails
  );
  const navigate = useNavigate();
  const [cookie] = useCookies(["accessToken"]);

  useEffect(() => {
    if (!userLoading) {
      if (userData?.accountType === "Client") {
        navigate("/client-profile");
      } else if (userData?.accountType === "Artist") {
        navigate("/artist-profile");
      } else if (JSON.stringify(userData).length === 2) {
        navigate("/login");
      }
    }
  }, [userLoading, cookie.accessToken]);

  return <>{!userLoading && children}</>;
};
