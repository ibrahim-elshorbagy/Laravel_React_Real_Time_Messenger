import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
// import axios from "axios";
import {
    EllipsisVerticalIcon,
    LockOpenIcon,
    LockClosedIcon,
    UserIcon,
    ShieldCheckIcon,
} from "@heroicons/react/24/solid";

export default function UserOptionsDropdown({ conversation }) {
    const changeUserRole = () => {
        console.log("change user role");
        if (!conversation.is_user) {
            return;
        }

        axios
            .post(route("user.chageRole", conversation.id))
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onBlockUser = () => {
        console.log("Block User");
        if (!conversation.is_user) {
            return;
        }

        axios
            .post(route("user.blockUnblock", conversation.id))
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-black/40">
                        <EllipsisVerticalIcon className="w-5 h-5" />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Item>
                        <div className="absolute right-0 z-50 w-48 mt-2 origin-top-right bg-gray-800 rounded-md shadow-lg ">
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={onBlockUser}
                                            className={`
                                        ${
                                            active
                                                ? "bg-black/30 text-white"
                                                : "text-gray-100"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm `}
                                        >
                                            {conversation.blocked_at && (
                                                <>
                                                    <LockOpenIcon className="w-4 h-4 mr-2" />
                                                    Unblock User
                                                </>
                                            )}
                                            {!conversation.blocked_at && (
                                                <>
                                                    <LockClosedIcon className="w-4 h-4 mr-2" />
                                                    Block User
                                                </>
                                            )}
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                            <div className="px-1 py-1">
                                <Menu.Item>
                                    {({ active }) => {
                                        <button
                                            onClick={changeUserRole}
                                            className={` ${
                                                active
                                                    ? "bg-block/30 text-white"
                                                    : "text-gray-100 "
                                            } group flex w-full item-center rounded-md px-2 py-2 text-sm `}
                                        >
                                            {conversation.is_admin && (
                                                <>
                                                    <UserIcon className="w-4 h-4 mr-2" />
                                                    Make Regualr User
                                                </>
                                            )}
                                            {!conversation.is_admin && (
                                                <>
                                                    <ShieldCheckIcon className="w-4 h-4 mr-2" />
                                                    Make Admin
                                                </>
                                            )}
                                        </button>;
                                    }}
                                </Menu.Item>
                            </div>
                        </div>
                    </Menu.Item>
                </Transition>
            </Menu>
        </div>
    );
}