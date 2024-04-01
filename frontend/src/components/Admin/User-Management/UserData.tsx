import { CiCirclePlus } from "react-icons/ci";
import { APIHandler } from "../../../server/API";
import ROUTES from "../../../server/Routes";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Loader from "../../../common/Loader";
import { ArtistData } from "../../../interfaces/UserData";
import { FaCog } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function UserManagement() {
  const fetchAllUsers = async () => {
    const { data } = await APIHandler("GET", ROUTES.ADMIN.GET_ALL_USERS);
    return data.users;
  };

  const { isLoading, isError, data, error } = useQuery<ArtistData[]>({
    queryKey: ["allUsersData"],
    queryFn: fetchAllUsers,
  });

  if (isLoading) return <Loader />;
  if (isError) return toast.error(error.message || "Something went wrong");


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Date Created
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    User Type
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((person, personIdx) => (
                  <tr key={person.email}>
                    <td
                      className={classNames(
                        personIdx !== data.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8"
                      )}
                    >
                      {personIdx + 1}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== data.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900"
                      )}
                    >
                      <div className="flex gap-4 items-center">
                        <img
                          src={person.profileImage}
                          alt="profile_image"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <p>
                          {person.firstName} {person.lastName}
                        </p>
                      </div>
                    </td>
                    <td
                      className={classNames(
                        personIdx !== data.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                      )}
                    >
                      {formatDate(person.createdAt)}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== data.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "whitespace-nowrap pl-6 py-4 text-sm text-gray-500 lg:table-cell sm:table-cell"
                      )}
                    >
                      {person.accountType}
                    </td>
                    <td
                      className={classNames(
                        personIdx !== data.length - 1
                          ? "border-b border-gray-200"
                          : "",
                        "relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8"
                      )}
                    >
                      <div className="flex gap-4 justify-center">
                        <button>
                          <FaCog className="w-6 h-6 text-[#48ADF7]" />
                        </button>
                        <button>
                          <IoTrashOutline className="h-6 w-6 text-[#F7594D]" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
