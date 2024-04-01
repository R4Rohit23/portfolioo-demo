import { useEffect, useState } from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function ClientSidebar({
    basicRef,
    companyRef,
    passwordRef,
    socialRef,
}) {
    const tabs = [
        { name: "Basic Details", href: basicRef, current: true },
        { name: "Company Details", href: companyRef, current: false },

        { name: "password & security", href: passwordRef, current: false },

        { name: "Payment Terms", href: "/user/posts", current: false },

        { name: "Social Links ", href: socialRef, current: false },
        // { name: "Saved", href: "#", current: false },
    ];
    const [openTab, setOpenTab] = useState<string>(tabs[0]?.name);

    const handleClick = (ref, tabName) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
        setOpenTab(tabName);
    };
    return (
        <div className="fixed p-4 w-fit min-h-[400px] bg-[#FFFFFF] rounded-md border border-slate-200">
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    className="block p-3 w-full rounded-md border border-gray-300  outline-none"
                    defaultValue={tabs.find((tab) => tab.current).name}
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="  hidden sm:block">
                <nav
                    className=" w-full flex flex-row md:flex-col   md:space-y-2 "
                    aria-label="Tabs"
                >
                    <h3 className="px-3 py-2 text-xl font-medium text-[#0073E6] capitalize">
                        My Info
                    </h3>
                    {tabs.map((tab) => (
                        <div
                            onClick={() => handleClick(tab.href, tab.name)}
                            key={tab.name}
                            //   href={tab.href}
                            className={classNames(
                                openTab === tab.name
                                    ? "bg-main-light bg-opacity-25 [#FCEFDA] text-main"
                                    : "text-gray-500 hover:text-gray-700",
                                "rounded-md px-3 py-2 text-sm  mt-0 cursor-pointer capitalize"
                            )}
                            aria-current={tab.current ? "page" : undefined}
                        >
                            {tab.name}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    );
}
