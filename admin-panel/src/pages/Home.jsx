import { useEffect, useState } from "react";
import { getHomeData } from "../api/deshboard";

export default function Home() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboard() {
            try {
                const data = await getHomeData();
                setDashboard(data);
            } catch (err) {
                // handle error
            } finally {
                setLoading(false);
            }
        }
        fetchDashboard();
    }, []);


    return (
        <>
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Dashboard
            </h2>
            {/* <!-- CTA --> */}
            {/* <a className="flex items-center justify-between p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
                href="https://github.com/estevanmaito/windmill-dashboard">
                <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
                        </path>
                    </svg>
                    <span>Star this project on GitHub</span>
                </div>
                <span>View more &RightArrow;</span>
            </a> */}
            {/* <!-- Cards --> */}
            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
                {/* <!-- Card --> */}
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 -960 960 960">
                            <path
                                d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            Total reports
                        </p>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            {dashboard?.totalReports ?? 0}
                        </p>
                    </div>
                </div>
                {/* <!-- Card --> */}
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 -960 960 960">
                            <path fill-rule="evenodd"
                                d="m787-145 28-28-75-75v-112h-40v128l87 87Zm-587 25q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v268q-19-9-39-15.5t-41-9.5v-243H200v560h242q3 22 9.5 42t15.5 38H200Zm0-120v40-560 243-3 280Zm80-40h163q3-21 9.5-41t14.5-39H280v80Zm0-160h244q32-30 71.5-50t84.5-27v-3H280v80Zm0-160h400v-80H280v80ZM720-40q-83 0-141.5-58.5T520-240q0-83 58.5-141.5T720-440q83 0 141.5 58.5T920-240q0 83-58.5 141.5T720-40Z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            Panding reports
                        </p>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            {dashboard?.statusCounts?.pending ?? 0}
                        </p>
                    </div>
                </div>
                {/* <!-- Card --> */}
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 -960 960 960">
                            <path
                                d="m424-318 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm280-590q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z">
                            </path>
                        </svg>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            Cleaned reports
                        </p>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            {dashboard?.statusCounts?.cleaned ?? 0}
                        </p>
                    </div>
                </div>
                {/* <!-- Card --> */}
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 -960 960 960">
                            <path fill-rule="evenodd"
                                d="M240-800v200-200 640-9.5 9.5-640Zm0 720q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v174q-19-7-39-10.5t-41-3.5v-120H520v-200H240v640h254q8 23 20 43t28 37H240Zm396-20-56-56 84-84-84-84 56-56 84 84 84-84 56 56-83 84 83 84-56 56-84-83-84 83Z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            Rejected reports
                        </p>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            {dashboard?.statusCounts?.rejected ?? 0}
                        </p>
                    </div>
                </div>
                <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                                d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
                                clip-rule="evenodd"></path>
                        </svg>
                    </div>
                    <div>
                        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                            Total user
                        </p>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                            {dashboard?.totalUsers ?? 0}
                        </p>
                    </div>
                </div>
            </div>

            {/* <!-- New Table --> */}
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                        <thead>
                            <tr
                                className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
                            >
                                <th className="px-4 py-3">#</th>
                                <th className="px-4 py-3">User</th>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Address</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">VerifiedBy</th>
                                {/* <th className="px-4 py-3">Actions</th> */}
                            </tr>
                        </thead>
                        <tbody
                            className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                        >
                            {!dashboard || !dashboard.latestReports ? (
                                <td colSpan={8} className="py-4 px-4 text-center text-gray-500 dark:text-gray-400">Loading...</td>
                            ) : dashboard.latestReports.length === 0 ? (
                                <td colSpan={8} className="py-4 px-4 text-center text-gray-500 dark:text-gray-400">No reports found.</td>
                            ) : (
                                dashboard.latestReports.map((report, idx) => (
                                    <tr key={report._id || idx} className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="px-4 py-3 text-sm">
                                            {idx + 1}
                                        </td>
                                        <td className="py-3 px-4 text-sm">{report.user}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center text-sm">
                                                {/* <div
                                                        className="relative w-24 h-24 mr-3 md:block"
                                                    > */}
                                                <img
                                                    className="object-cover"
                                                    style={{ width: "80px", height: "80px" }}
                                                    src={report.image}
                                                    alt="Report"
                                                    loading="lazy"
                                                />
                                                {/* </div> */}
                                            </div>
                                        </td>
                                        {/* <td className="py-3 px-4 text-gray-700 dark:text-gray-200">{report.image}</td> */}
                                        <td className="py-3 px-4 text-sm">{report.location.address.split('', 15).join("") + "..."}</td>
                                        <td className="py-3 px-4 text-sm">{report.description.split('', 15).join("") + "..."}</td>
                                        <td className="px-4 py-3 text-xs">
                                            {report.status === "cleaned" ? (
                                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                                                    Cleaned
                                                </span>
                                            ) : report.status === "pending" ? (
                                                <span className="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600">
                                                    Pending
                                                </span>
                                            ) : report.status === "rejected" ? (
                                                <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                                                    Rejected
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700">
                                                    {report.status}
                                                </span>
                                            )}
                                        </td>
                                        <td className="py-3 px-4 text-sm">{report.updatedAt}</td>
                                        <td className="py-3 px-4 text-sm">
                                            {report.verifiedBy ? report.verifiedBy : "Not Verified"}
                                        </td>
                                        {/* <td className="px-4 py-3">
                                            <div className="flex items-center space-x-4 text-sm">
                                                <button
                                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                    aria-label="Edit"
                                                    onClick={() => { setSelectedReport(report); setIsModalOpen(true); setStatus(report.status); }}
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                                                        ></path>
                                                    </svg>
                                                </button>
                                                <button
                                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                                                    aria-label="Delete"
                                                    onClick={() => handleDelete(report)}
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                                            clip-rule="evenodd"
                                                        ></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </td> */}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>

            {/* <!-- Charts --> */}
            {/* <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Charts
            </h2>
            <div className="grid gap-6 mb-8 md:grid-cols-2">
                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Revenue
                    </h4>
                    <canvas id="pie"></canvas>
                    <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                            <span className="inline-block w-3 h-3 mr-1 bg-blue-500 rounded-full"></span>
                            <span>Shirts</span>
                        </div>
                        <div className="flex items-center">
                            <span className="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"></span>
                            <span>Shoes</span>
                        </div>
                        <div className="flex items-center">
                            <span className="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full"></span>
                            <span>Bags</span>
                        </div>
                    </div>
                </div>
                <div className="min-w-0 p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                    <h4 className="mb-4 font-semibold text-gray-800 dark:text-gray-300">
                        Traffic
                    </h4>
                    <canvas id="line"></canvas>
                    <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center">
                            <span className="inline-block w-3 h-3 mr-1 bg-teal-600 rounded-full"></span>
                            <span>Organic</span>
                        </div>
                        <div className="flex items-center">
                            <span className="inline-block w-3 h-3 mr-1 bg-purple-600 rounded-full"></span>
                            <span>Paid</span>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}