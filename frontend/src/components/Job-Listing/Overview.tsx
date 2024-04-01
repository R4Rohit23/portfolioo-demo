import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IGigCard } from "../../interfaces/ClientData";
import { convertToNormalString, formatDate } from "../../utils/UsefulFunctions";

interface IProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: IGigCard;
}

export default function GigOverview(props: IProps) {
  const { open, setOpen, data } = props;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-5xl">
                  <div className="flex h-full justify-between overflow-y-scroll bg-white shadow-xl divide-x-2">
                    <div className="py-10 w-[70%]">
                      <div className="flex items-start justify-between px-4 sm:px-6">
                        <Dialog.Title className="text-2xl font-medium leading-10 text-gray-900 capitalize">
                          {data.title}
                        </Dialog.Title>
                        <div className="absolute left-0 top-0  flex  pt-4 ">
                          <button
                            type="button"
                            className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                      <div className="relative mt-2 flex-1">
                        <div className="text-sm font-light text-gray-400 pb-5 border-b-2 px-4 sm:px-6">
                          Posted At: <span>{formatDate(data.createdAt)}</span>
                        </div>
                        <div className="px-6 mt-4 flex flex-col gap-5">
                          <div className="text-base font-light">
                            Project Timeline :{" "}
                            <span className="font-medium">
                              {convertToNormalString(data.deadline)}
                            </span>{" "}
                          </div>

                          <div className="text-base font-light">
                            Scope Of Work :{" "}
                            <span className="font-medium">
                              {convertToNormalString(data.scopeOfWork)}
                            </span>{" "}
                          </div>

                          <div className="text-base font-light">
                            Level Of Experience Required :{" "}
                            <span className="font-medium">
                              {convertToNormalString(data.jobLevel)}
                            </span>{" "}
                          </div>

                          {data?.fixedBudget ? (
                            <div>
                              <div className="text-base font-light">
                                Fixed Budget :{" "}
                                <span className="font-medium">
                                  Rs.{data?.fixedBudget}
                                </span>{" "}
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="text-base font-light">
                                Hourly Budget Range :{" "}
                                <span className="font-medium">
                                  Rs.{data?.hourlyBudgetRange?.from} - Rs.
                                  {data?.hourlyBudgetRange?.to}
                                </span>{" "}
                              </div>
                            </div>
                          )}

                          <div className=" text-base font-normal">
                            <span className="font-light">
                              Project Description : <br />
                            </span>
                            {data.description}
                          </div>
                          <div></div>
                        </div>
                      </div>
                    </div>

                    <div className="w-[30%] flex flex-col gap-5 px-10 py-10">
                        <button className="bg-[#FFCC00] text-main-blue-light px-4 py-2 rounded-full text-center">
                            Apply Now
                        </button>
                        <button className="text-main-blue-light px-4 py-2 rounded-full text-center border-main-blue-light border-1">
                            Save Job
                        </button>
                        <div>
                            <h1>About the Client</h1>
                        </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
