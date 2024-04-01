import { useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { APIHandler } from "../server/API";

import { useCookies } from "react-cookie";
import ROUTES from "../server/Routes";
import { useField } from "formik";
import ErrorText from "./ErrorText";

const people = [
    { id: 1, name: "Leslie Alexander" },
    // More users...
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

interface ILocation {
    formatted_address: string;
}

interface PropILocation {
    value: string;
    setLocation: (value: string) => void;
    data: string;
    name: string;
}

export default function LocationSearch(props: PropILocation) {
    const { name, data } = props;
    const [, { value, error }, { setValue: setLocation }] = useField(name);

    console.log("data", data);
    useEffect(() => {
        if (data) {
            setLocation(data);
        }
    }, []);

    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<ILocation[]>([]);
    const [selectedPerson, setSelectedPerson] = useState<string>(value || "");
    const [cookie, setCookies] = useCookies(["accessToken"]);

    const filteredPeople =
        query === ""
            ? people
            : people.filter((person) => {
                  return person.name
                      .toLowerCase()
                      .includes(query.toLowerCase());
              });
    useEffect(() => {
        const locations = async () => {
            const data = await APIHandler(
                "POST",
                ROUTES.DASHBOARD.SUGGEST_LOCATION,
                {
                    search: query,
                },
                {
                    Authorization: `Bearer ` + cookie?.accessToken,
                }
            );
            setSuggestions(data?.data?.places);
        };
        locations();
    }, [query, cookie.accessToken]);

    useEffect(() => {
        if (selectedPerson != null) {
            //   setLat(selectedPerson.geometry?.location.lat);
            //   setLng(selectedPerson.geometry?.location.lng);
            setLocation(selectedPerson.formatted_address);
        }
    }, [selectedPerson]);
    return (
        <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
            {/* <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">Location</Combobox.Label> */}
            <div className="relative">
                <Combobox.Input
                    className="w-[300px] h-[55px] sm:w-full rounded-[10px] border-0 bg-white p-4 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset text-xs sm:text-sm sm:leading-6 placeholder:text-gray-500"
                    onChange={(event) => setQuery(event.target.value)}
                    displayValue={(person) =>
                        person?.formatted_address
                            ? person.formatted_address
                            : value
                    }
                    placeholder="Location"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </Combobox.Button>
                {error && (
                    <div className=" absolute top-16 ml-2 text-xs tracking-wide text-pink-200">
                        <ErrorText text={error} />
                    </div>
                )}
                {suggestions?.length > 0 && (
                    <Combobox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-xs shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {suggestions?.map((person, id) => (
                            <Combobox.Option
                                key={id}
                                value={person}
                                className={({ active }) =>
                                    classNames(
                                        "relative cursor-default select-none py-2 pl-3 pr-9",
                                        active
                                            ? "bg-main-light bg-opacity-20 text-main"
                                            : "text-gray-900"
                                    )
                                }
                            >
                                {({ active, selected }) => (
                                    <>
                                        <span
                                            className={classNames(
                                                "block truncate",
                                                selected && "font-semibold"
                                            )}
                                        >
                                            {person.name}
                                        </span>

                                        {selected && (
                                            <span
                                                className={classNames(
                                                    "absolute inset-y-0 right-0 flex items-center pr-4",
                                                    active
                                                        ? "text-white"
                                                        : "text-indigo-600"
                                                )}
                                            >
                                                <CheckIcon
                                                    className="h-5 w-5"
                                                    aria-hidden="true"
                                                />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Combobox.Option>
                        ))}
                    </Combobox.Options>
                )}
            </div>
        </Combobox>
    );
}
