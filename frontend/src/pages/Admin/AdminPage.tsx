import { useState } from "react";
import AdminLoginScreen from "../../components/Admin/AdminLoginScreen";
import OverlayFragment from "../../common/OverlayFragment";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import { useCookies } from "react-cookie";

export default function AdminLogin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookie] = useCookies(["adminToken"]);

  return (
    <>
      {cookie.adminToken && <AdminSidebar />}

      <OverlayFragment
        isOpen={!cookie.adminToken}
        setIsOpen={setIsLoggedIn}
        children={<AdminLoginScreen />}
        className=""
      />
    </>
  );
}
