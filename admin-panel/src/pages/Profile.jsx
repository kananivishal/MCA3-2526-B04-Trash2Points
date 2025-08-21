import React, { useState } from "react";

export default function Profile() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phoneno: "",
        address: "",
    });

    // Open modal and set user values
    const openModal = () => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phoneno: user.phoneno || "",
                address: user.address || "",
            });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Save button handler
    const handleSave = () => {
        localStorage.setItem("user", JSON.stringify(formData)); // save updated values
        setIsModalOpen(false);
        window.location.reload(); // refresh to show updated profile
    };


    if (!user) {
        return (
            <div className="flex items-center justify-center h-64">
                <p className="text-lg text-gray-700 dark:text-gray-200">No user data found.</p>
            </div>
        );
    }

    return (
        <>
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Profile
            </h2>

            {/* <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 dark:bg-gray-900">
                <div className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8">
                    <div className="flex flex-col items-center">
                        <div className="w-28 h-28 mb-4 rounded-full bg-gradient-to-tr from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-700 flex items-center justify-center text-5xl font-bold text-white shadow-lg">
                            {user.name[0]}
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-1">{user.name}</h2>
                        <span className="text-sm text-gray-500 dark:text-gray-400 mb-4">{user.email}</span>
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-4">
                        <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
                            <svg className="w-6 h-6 text-purple-500 dark:text-purple-300 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M3 10a7 7 0 0114 0v4a7 7 0 01-14 0v-4z" />
                                <path d="M8 21h8" />
                            </svg>
                            <div>
                                <span className="block text-xs text-gray-500 dark:text-gray-400">Phone</span>
                                <span className="text-base font-medium text-gray-700 dark:text-gray-200">{user.phoneno}</span>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
                            <svg className="w-6 h-6 text-purple-500 dark:text-purple-300 mr-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M21 10.5a8.38 8.38 0 01-.9 3.8c-.6 1.2-1.5 2.2-2.6 2.9-1.1.7-2.4 1.1-3.8 1.1s-2.7-.4-3.8-1.1c-1.1-.7-2-1.7-2.6-2.9a8.38 8.38 0 01-.9-3.8c0-2.2.8-4.2 2.2-5.7C7.8 3.8 9.8 3 12 3s4.2.8 5.7 2.3c1.4 1.5 2.3 3.5 2.3 5.7z" />
                            </svg>
                            <div>
                                <span className="block text-xs text-gray-500 dark:text-gray-400">Address</span>
                                <span className="text-base font-medium text-gray-700 dark:text-gray-200">{user.address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div> */}



            <div className="grid gap-6 mb-8">
                {/* <div
                    className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
                >
                    <div className="relative">
                        <img
                            src="https://modernize-nextjs.adminmart.com/images/kanban/kanban-img-4.jpg"
                            alt="Report evidence"
                            className="w-full h-32 object-cover rounded-lg"
                        />
                        <div className="flex mt-12 mb-4">
                            <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                            />
                        </div>
                        <div className="flex items-center text-sm">
                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                <img className="object-cover w-full h-full rounded-full"
                                    src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                    alt="" loading="lazy" />
                                <div className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                            </div>
                        </div>
                    </div>


                    <h4 className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                        Revenue
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Fuga, cum commodi a omnis numquam quod? Totam exercitationem
                        quos hic ipsam at qui cum numquam, sed amet ratione! Ratione,
                        nihil dolorum.
                    </p>
                </div> */}


                <div
                    className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
                >
                    {/* <h4 className="mb-4 font-semibold text-gray-600 dark:text-gray-300">
                        Revenue
                    </h4> */}
                    <div className="flex mt-12 mb-4">
                        <img
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                            alt="Profile"
                            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
                        />
                    </div>
                    {/* <p className="text-gray-600 dark:text-gray-400">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                        Fuga, cum commodi a omnis numquam quod? Totam exercitationem
                        quos hic ipsam at qui cum numquam, sed amet ratione! Ratione,
                        nihil dolorum.
                    </p> */}
                    <div className="grid gap-6 mt-4 md:grid-cols-2 xl:grid-cols-2">
                        {/* Location */}
                        <div className="space-y-1">
                            <div className="flex gap-2 items-center font-medium text-muted-foreground">
                                <svg className="w-5 h-5 mr-1" viewBox="0 -960 960 960" fill="#757575">
                                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
                                </svg>
                                <span className="mb-1 text-gray-600 dark:text-gray-400">
                                    Username
                                </span>
                            </div>
                            <p className="text-foreground dark:text-gray-400">{user.name}</p>
                        </div>

                        {/* User */}
                        <div className="space-y-1">
                            <div className="flex gap-2 items-center font-medium text-muted-foreground">
                                <svg className="w-5 h-5 mr-1" viewBox="0 -960 960 960" fill="#757575">
                                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                                </svg>
                                <span className="mb-1 text-gray-600 dark:text-gray-400">
                                    Email
                                </span>
                            </div>
                            <p className="text-foreground dark:text-gray-400">{user.email}</p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex gap-2 items-center font-medium text-muted-foreground">
                                <svg className="w-5 h-5 mr-1" viewBox="0 -960 960 960" fill="#757575">
                                    <path d="M162-120q-18 0-30-12t-12-30v-162q0-13 9-23.5t23-14.5l138-28q14-2 28.5 2.5T342-374l94 94q38-22 72-48.5t65-57.5q33-32 60.5-66.5T681-524l-97-98q-8-8-11-19t-1-27l26-140q2-13 13-22.5t25-9.5h162q18 0 30 12t12 30q0 125-54.5 247T631-329Q531-229 409-174.5T162-120Zm556-480q17-39 26-79t14-81h-88l-18 94 66 66ZM360-244l-66-66-94 20v88q41-3 81-14t79-28Zm358-356ZM360-244Z" />
                                </svg>
                                <span className="mb-1 text-gray-600 dark:text-gray-400">
                                    Phone No
                                </span>
                            </div>
                            <p className="text-foreground dark:text-gray-400">{user.phoneno}</p>
                        </div>

                        <div className="space-y-1">
                            <div className="flex gap-2 items-center font-medium text-muted-foreground">
                                <svg className="w-5 h-5 mr-1" viewBox="0 -960 960 960" fill="#757575">
                                    <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                                </svg>
                                <span className="mb-1 text-gray-600 dark:text-gray-400">
                                    Address
                                </span>
                            </div>
                            <p className="text-foreground dark:text-gray-400">{user.address}</p>
                        </div>

                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 transition"
                            onClick={openModal}
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-30 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
                    onClick={closeModal}
                >
                    {/* Modal */}
                    <div
                        className="w-full px-6 py-4 overflow-hidden bg-white rounded-t-lg dark:bg-gray-800 sm:rounded-lg sm:m-4 sm:max-w-xl transition duration-150"
                        role="dialog"
                        onClick={(e) => e.stopPropagation()} // prevent overlay click
                    >
                        {/* Header */}
                        <header className="flex justify-between">
                            <p className="mb-2 text-2xl font-semibold text-gray-700 dark:text-gray-300">
                                Edit Profile
                            </p>
                            <div className="flex justify-end">
                                <button
                                    className="inline-flex items-center justify-center w-6 h-6 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                    aria-label="close"
                                    onClick={closeModal}
                                >
                                    <svg
                                        className="w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>

                        </header>

                        {/* Body */}
                        <div className="mt-4 mb-6">
                            <div className="grid gap-6 mt-4  ">
                                <label class="block text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Name</span>
                                    <input
                                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Jane Doe"
                                    />
                                </label>
                                <label class="block text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Phone No</span>
                                    <input
                                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                        value={formData.phoneno}
                                        onChange={handleChange}
                                        placeholder="0000000000"
                                    />
                                </label>
                                <label class="block text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Email</span>
                                    <input
                                        class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="abc@gmail.com"
                                    />
                                </label>
                                <label class="block text-sm">
                                    <span class="text-gray-700 dark:text-gray-400">Phone No</span>
                                    <textarea
                                        class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                        rows="3"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter Your Address"
                                    ></textarea>
                                </label>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer className="flex flex-col items-center justify-end px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-6 sm:flex-row bg-gray-50 dark:bg-gray-800">
                            <button
                                onClick={closeModal}
                                className="w-full px-5 py-3 text-sm font-medium text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg dark:text-gray-400 sm:w-auto sm:px-4 sm:py-2 hover:border-gray-500 focus:outline-none focus:shadow-outline-gray"
                            >
                                Cancel
                            </button>
                            <button
                                className="w-full px-5 py-3 text-sm font-medium text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg sm:w-auto sm:px-4 sm:py-2 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </footer>
                    </div>
                    {/* {isImageModalOpen && (
                        <div
                            className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-70"
                            onClick={() => setIsImageModalOpen(false)}
                        >
                            <div
                                className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg"
                                onClick={e => e.stopPropagation()}
                            >
                                <img
                                    src={selectedReport.image}
                                    alt="Full size report evidence"
                                    className="max-w-full max-h-[80vh] rounded"
                                />
                                <button
                                    className="mt-4 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                                    onClick={() => setIsImageModalOpen(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )} */}
                </div>
            )}


        </>
    );
}