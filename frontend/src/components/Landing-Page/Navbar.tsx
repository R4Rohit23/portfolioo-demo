import { FaChevronDown, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import OverlayFragment from "../../common/OverlayFragment";
import StepComponent from "../Auth/StepComponent";
import { useEffect, useState } from "react";
import Logo from "../../assets/Logo.svg";

// const Navbar = () => {
//   const [isLoginClick, setIsLoginClick] = useState<boolean>(false);
//   const navBarList = [
//     {
//       title: "Find Talent",
//       link: "/",
//     },
//     {
//       title: "Find Work",
//       link: "/",
//     },
//   ];

//   return (
//     <div className="sticky top-0 z-20 bg-main-light">
//       <div className="bg-main text-black shadow-lg">
//         <nav className=" flex w-11/12 mx-auto justify-between items-center px-4 lg:px-0 py-4">
//           <Link to={"/"}>
//             <span className="text-lg sm:text-3xl font-semibold leading-normal">
//               Portfolioo
//             </span>
//           </Link>

//           <div className="flex items-center sm:space-x-[32px] space-x-5">
//             {navBarList.map((item) => (
//               <Link to={item.link} key={item.title}>
//                 <span className="text-sm sm:text-lg  leading-normal">
//                   {item.title}
//                 </span>
//               </Link>
//             ))}
//             {/* <Menu as="div" className="relative ml-4 flex-shrink-0">
//               {isUserLoggedIn ? (
//                 <div>
//                   <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
//                     <span className="absolute -inset-1.5" />
//                     <span className="sr-only">Open user menu</span>
//                     <img
//                       className="h-8 w-8 sm:h-8 sm:w-8 rounded-full "
//                       src={
//                         professionalData?.isProfesssional
//                           ? professionalData?.professionalDetails?.profileImg
//                           : professionalData?.userDetails?.profileImgUrl
//                           ? professionalData?.userDetails?.profileImgUrl
//                           : `https://api.dicebear.com/5.x/initials/svg?seed=${professionalData?.userDetails?.firstName}%20${professionalData?.userDetails?.lastName}`
//                       }
//                       alt=""
//                     />
//                   </Menu.Button>
//                 </div>
//               ) : (
//                 <ButtonElement
//                   text="Sign In"
//                   bgColor="bg-[#FFFFFF]"
//                   textColor="text-base"
//                   handleFunction={() => setIsLoginClick(true)}
//                 />
//               )}
//               <Transition
//                 as={Fragment}
//                 enter="transition ease-out duration-100"
//                 enterFrom="transform opacity-0 scale-95"
//                 enterTo="transform opacity-100 scale-100"
//                 leave="transition ease-in duration-75"
//                 leaveFrom="transform opacity-100 scale-100"
//                 leaveTo="transform opacity-0 scale-95"
//               >
//                 <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                   <Menu.Item>
//                     {({ active }) => (
//                       <a
//                         href={
//                           professionalData?.isProfesssional
//                             ? "/profile"
//                             : "/user/dashboard"
//                         }
//                         className={classNames(
//                           active ? "bg-gray-100" : "",
//                           "block px-4 py-2 text-sm text-gray-700 w-full text-start"
//                         )}
//                       >
//                         Your Profile
//                       </a>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <a
//                         href="/profile"
//                         className={classNames(
//                           active ? "bg-gray-100" : "",
//                           "block px-4 py-2 text-sm text-gray-700"
//                         )}
//                       >
//                         Switch To Professional
//                       </a>
//                     )}
//                   </Menu.Item>
//                   <Menu.Item>
//                     {({ active }) => (
//                       <a
//                         href="#"
//                         className={classNames(
//                           active ? "bg-gray-100" : "",
//                           "block px-4 py-2 text-sm text-gray-700"
//                         )}
//                         onClick={handleSignOut}
//                       >
//                         Sign out
//                       </a>
//                     )}
//                   </Menu.Item>
//                 </Menu.Items>
//               </Transition>
//             </Menu> */}

//             <Button
//               variant="bordered"
//               className="bg-white"
//               onClick={() => setIsLoginClick(true)}
//             >
//               Sign In
//             </Button>
//           </div>
//         </nav>
//       </div>

// <OverlayFragment
//   isOpen={isLoginClick}
//   setIsOpen={setIsLoginClick}
//   children={<StepComponent />}
//   size="5xl"
// />
//     </div>
//   );
// };

// export default Navbar;

import React from "react";
import {
  Navbar as NextNavbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import { signout } from "../../redux/user.slice";
import ButtonElement from "../../common/Button";
import { CiCirclePlus } from "react-icons/ci";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoginClick, setIsLoginClick] = useState<boolean>(false);

  const { userData, userLoading } = useSelector(
    (store) => store?.store?.userDetails
  );

  console.log(userData?.profileImage);

  const navBarList = [
    {
      title: "Find Talent",
      link: "/find-talent",
    },
    {
      title: "Find Work",
      link: "/find-work",
    },
  ];
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState<boolean>(
    JSON.stringify(userData)?.length > 3 ? true : false
  );

  useEffect(() => {
    if (!userLoading)
      setLogin(JSON.stringify(userData)?.length > 3 ? true : false);
  }, [cookie?.accessToken, userLoading]);
  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  const logout = () => {
    removeCookie("accessToken");
    dispatch(signout());
    navigate("/");
  };
  return (
    <>
      <NextNavbar
        isBordered
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="w-full"
        maxWidth="2xl"
      >
        <div className=" flex  items-center w-[96%] mx-auto   ">
          <NavbarContent className="sm:hidden" justify="start">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
            <NavbarBrand>
              <Link to={"/"}>
                {/* <p className="font-bold text-inherit">
                                    Portfoliooo
                                </p> */}
                <img src={Logo} alt="Logo" className="w-32 h-32" />
              </Link>
            </NavbarBrand>
          </NavbarContent>

          {/* <NavbarContent className="sm:hidden pr-3" justify="center">
            <NavbarBrand>
              <Link to={"/"}>
                {/* <p className="font-bold text-inherit">
                                    Portfoliooo
                                </p> */}
                {/* <img src={Logo} alt="Logo" className="w-10 h-10" />
              </Link>
            </NavbarBrand>
          </NavbarContent>  */}

          {/* logo */}
          <NavbarContent
            className="hidden sm:flex gap-4 w-full"
            justify="start"
          >
            <NavbarBrand>
              <Link to={"/"}>
                {/* <p className="font-bold text-inherit">
                                    Portfoliooo
                                </p> */}
                <img src={Logo} alt="Logo" className="w-40 h-40" />
              </Link>
            </NavbarBrand>
          </NavbarContent>

          {/* middle element */}
          <NavbarContent className="hidden sm:flex gap-4 " justify="center">
            {navBarList?.map((ele, idx) => (
              <NavbarItem key={idx}>
                <Link color="foreground" to={ele.link}>
                  {ele.title}
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>

          {isLogin ? (
            <NavbarContent as="div" justify="end">
              {userData?.accountType === "Client" && (
                <Link to="/post-job">
                  <ButtonElement
                    text="Post Job"
                    className="gradient-button"
                    Icon={CiCirclePlus}
                  />
                </Link>
              )}

              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  {!userLoading && (
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform"
                      color="secondary"
                      name="Jason Hughes"
                      size="sm"
                      src={
                        userData?.profileImage
                          ? userData.profileImage
                          : "https://i.pravatar.cc/150?u=a042581f4e29026704d"
                      }
                    />
                  )}
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{userData?.email}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">
                    <Link
                      to={
                        userData?.accountType === "Client"
                          ? "/client-profile"
                          : "/artist-profile"
                      }
                    >
                      <p> My Profile</p>
                    </Link>
                  </DropdownItem>

                  {userData?.accountType === "Artist" && (
                    <DropdownItem key="invites">
                      <Link to="/my-invitations">
                        <p>Job Invitations</p>
                      </Link>
                    </DropdownItem>
                  )}

                  <DropdownItem key="logout" color="danger" onClick={logout}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarContent>
          ) : (
            <NavbarContent justify="end">
              <NavbarItem>
                <Button
                  as={Link}
                  color="warning"
                  onClick={() => setIsLoginClick(true)}
                  variant="flat"
                >
                  Sign Up
                </Button>
              </NavbarItem>
            </NavbarContent>
          )}
        </div>

        {/* mobile view  */}
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                to={"/"}
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </NextNavbar>
      <OverlayFragment
        isOpen={isLoginClick}
        setIsOpen={setIsLoginClick}
        children={<StepComponent setIsLoginClick={setIsLoginClick} />}
        size="5xl"
      />
    </>
  );
}
