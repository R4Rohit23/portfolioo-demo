import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  StarIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Listing from "./Listing";
import {
  Accordion,
  AccordionItem,
  Radio,
  RadioGroup,
  Slider,
} from "@nextui-org/react";
import InputField from "../../common/InputField";

const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function JobSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [talentType, setTalentType] = useState("freelancer");
  const [successRate, setSuccessRate] = useState("any");

  const ratings = ["5", "4", "3", "2", "1"];

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-indigo-600"
                                        : "text-gray-400 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Your teams
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      team.current
                                        ? "text-indigo-600 border-indigo-600"
                                        : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed top-[100px] lg:z-50 lg:flex lg:w-72 lg:flex-col h-[85vh]">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border border-gray-200 bg-white px-6 rounded-lg">
            <nav className="flex flex-1 flex-col py-5">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <Accordion selectionMode="multiple">
                  {/* Location  */}
                  <AccordionItem
                    key="1"
                    aria-label="Location"
                    title="Location"
                    className="py-3"
                  >
                    <InputField
                      type="text"
                      label="Location"
                      name="location"
                      placeholder="Filter By Location"
                      className="outline-none"
                    />
                  </AccordionItem>

                  {/* Talent Type  */}
                  <AccordionItem
                    key="2"
                    aria-label="Talent Type"
                    title="Talent Type"
                    className="py-3"
                  >
                    <RadioGroup
                      label="Select Talent Type"
                      value={talentType}
                      onValueChange={setTalentType}
                      size="sm"
                    >
                      <Radio value="freelancer_and_agencies">
                        Freelancer And Agencies
                      </Radio>
                      <Radio value="freelancer">Freelancer</Radio>
                      <Radio value="agencies">Agencies</Radio>
                    </RadioGroup>
                  </AccordionItem>

                  {/* Success Rate  */}
                  <AccordionItem
                    key="3"
                    aria-label="Job Success Rate"
                    title="Job Success Rate"
                    className="py-3"
                  >
                    <RadioGroup
                      value={successRate}
                      onValueChange={setSuccessRate}
                      size="sm"
                    >
                      <Radio value="any">Any Job Success</Radio>
                      <Radio value="80_and_up">80% & up</Radio>
                      <Radio value="90_and_up">90% & up</Radio>
                    </RadioGroup>
                  </AccordionItem>

                  {/* Rates  */}
                  <AccordionItem
                    key="4"
                    aria-label="Hourly Rates"
                    title="Hourly Rates"
                    className="py-3"
                  >
                    <Slider
                      label="Price Range"
                      step={100}
                      maxValue={1000}
                      minValue={0}
                      defaultValue={[0, 800]}
                      showSteps={true}
                      showTooltip={true}
                      showOutline={true}
                      disableThumbScale={true}
                      formatOptions={{ style: "currency", currency: "INR" }}
                      tooltipValueFormatOptions={{
                        style: "currency",
                        currency: "INR",
                        maximumFractionDigits: 0,
                      }}
                      classNames={{
                        base: "max-w-md",
                        filler: "gradient-button",
                        labelWrapper: "mb-2",
                        label: "font-medium text-default-700 text-medium",
                        value: "font-medium text-default-500 text-small",
                        thumb: [
                          "transition-size",
                          "gradient-button",
                          "data-[dragging=true]:shadow-lg data-[dragging=true]:shadow-black/20",
                          "data-[dragging=true]:w-7 data-[dragging=true]:h-7 data-[dragging=true]:after:h-6 data-[dragging=true]:after:w-6",
                        ],
                        step: "data-[in-range=true]:bg-black/30 dark:data-[in-range=true]:bg-white/50",
                      }}
                      tooltipProps={{
                        offset: 10,
                        placement: "bottom",
                        classNames: {
                          base: [
                            // arrow color
                            "before:bg-gradient-to-r before:from-secondary-400 before:to-primary-500",
                          ],
                          content: [
                            "py-2 shadow-xl",
                            "text-white gradient-button",
                          ],
                        },
                      }}
                    />
                  </AccordionItem>

                  {/* Rating  */}
                  <AccordionItem
                    key="5"
                    aria-label="Rating"
                    title="Rating"
                    className="py-3"
                  >
                    <RadioGroup
                      value={successRate}
                      onValueChange={setSuccessRate}
                      size="sm"
                    >
                      {ratings.map((rating, indx) => (
                        <Radio key={indx} value={rating}>
                          <div className="flex gap-2 items-center">
                            {Array.from({ length: 5 })?.map((ele, idx) => (
                              <StarIcon
                                key={idx}
                                className={classNames(
                                  idx < parseInt(rating)
                                    ? "fill-main text-main"
                                    : "text-gray-300",
                                  "h-5 w-5 flex-shrink-0"
                                )}
                                aria-hidden="true"
                              />
                            ))}
                            {indx !== 0 ? <p className="text-xs"> & Up</p> : ""}
                          </div>
                        </Radio>
                      ))}
                    </RadioGroup>
                  </AccordionItem>
                </Accordion>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-50"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
            <Listing />
          </div>
        </main>
      </div>
    </>
  );
}
