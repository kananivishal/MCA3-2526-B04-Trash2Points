import React, { useEffect, useState } from "react";
import { getAllReports, updateReport, deleteReport } from "../api/reports";

export default function Reports() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedReport, setSelectedReport] = useState(null);
    const [status, setStatus] = useState("");
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [statusChangedAlert, setStatusChangedAlert] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [deleteErrorAlert, setDeleteErrorAlert] = useState("");

    useEffect(() => {
        async function fetchReports() {
            try {
                const data = await getAllReports();
                setReports(data.reports || []);
            } catch (err) {
                setError("Failed to fetch reports.");
            } finally {
                setLoading(false);
            }
        }
        fetchReports();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);
    const [statusError, setStatusError] = useState("");

    const handleSave = async () => {
        setStatusError("");
        if (selectedReport && status !== selectedReport.status) {
            try {
                await updateReport(selectedReport.id, status);
                const data = await getAllReports();
                setReports(data.reports || []);
                setStatusChangedAlert(true);
                setTimeout(() => setStatusChangedAlert(false), 2500);
                closeModal();
            } catch (err) {
                setStatusError("Failed to update status.");
            }
        } else {
            closeModal();
        }
    };

    const handleDelete = async (report) => {
        if (window.confirm("Are you sure you want to delete this report?")) {
            try {
                await deleteReport(report.id); // or report._id if that's your backend property
                setDeleteAlert(true);
                setTimeout(() => setDeleteAlert(false), 2500);
                const data = await getAllReports();
                setReports(data.reports || []);
            } catch (err) {
                setDeleteErrorAlert(err.message || "Failed to delete report.");
                setTimeout(() => setDeleteErrorAlert(""), 3500);
            }
        }
    };

    return (
        <>
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                All Reports
            </h2>
            {statusChangedAlert && (
                <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-800 text-center font-semibold shadow">
                    Status changed successfully!
                </div>
            )}
            {deleteAlert && (
                <div className="mb-4 px-4 py-2 rounded bg-green-100 text-green-800 text-center font-semibold shadow">
                    Report deleted successfully!
                </div>
            )}
            {loading ? (
                <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500">{error}</div>
            ) : (
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
                                    <th className="px-4 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody
                                className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
                            >
                                {reports.length === 0 ? (
                                    <td colSpan={8} className="py-4 px-4 text-center text-gray-500 dark:text-gray-400">No reports found.</td>
                                ) : (
                                    reports.map((report, idx) => (
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
                                            <td className="px-4 py-3">
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
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal Overlay */}
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
                                        Report Details
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
                                    <div className="relative">
                                        <img
                                            src={selectedReport.image}
                                            alt="Report evidence"
                                            className="w-full h-32 sm:h-80 object-cover rounded-lg border shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                                            onClick={() => setIsImageModalOpen(true)}
                                        />
                                        {/* <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                            Click to view full size
                                        </div> */}
                                    </div>

                                    <div className="grid gap-6 mt-4 md:grid-cols-2 xl:grid-cols-2">
                                        {/* Location */}
                                        <div className="space-y-1">
                                            <div className="flex gap-2 items-center text-sm font-medium text-muted-foreground">
                                                <svg className="w-4 h-4 mr-1" viewBox="0 -960 960 960" fill="#757575">
                                                    <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                                                </svg>
                                                <span className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                    Location
                                                </span>
                                            </div>
                                            <p className="text-foreground text-sm dark:text-gray-400">{selectedReport.location.address}</p>
                                        </div>

                                        {/* User */}
                                        <div className="space-y-1">
                                            <div className="flex gap-2 items-center text-sm font-medium text-muted-foreground">
                                                <svg className="w-4 h-4 mr-1" fill="#757575" stroke="currentColor" viewBox="0 -960 960 960">
                                                    <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"></path>
                                                </svg>
                                                <span className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                    Reported By
                                                </span>
                                            </div>
                                            <p className="text-foreground text-sm dark:text-gray-400">{selectedReport.user}</p>
                                        </div>

                                        {/* Created At */}
                                        <div className="space-y-1">
                                            <div className="flex gap-2 items-center text-sm font-medium text-muted-foreground">
                                                <svg className="w-4 h-4 mr-1" fill="#757575" viewBox="0 -960 960 960">
                                                    <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"></path>
                                                </svg>
                                                <span className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                    CreatedAt
                                                </span>
                                            </div>
                                            <p className="text-foreground text-sm dark:text-gray-400">{selectedReport.createdAt}</p>
                                        </div>
                                        {/* {format(report.createdAt, "PPP")} at {format(report.createdAt, "p")} */}

                                        {/* Updated At */}
                                        <div className="space-y-1">
                                            <div className="flex gap-2 items-center text-sm font-medium text-muted-foreground">
                                                <svg className="w-4 h-4 mr-1" fill="#757575" viewBox="0 -960 960 960">
                                                    <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"></path>
                                                </svg>
                                                <span className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                    UpdatedAt
                                                </span>
                                            </div>
                                            <p className="text-foreground text-sm dark:text-gray-400">{selectedReport.updatedAt}</p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-1 mt-4">
                                        <div className="flex gap-2 items-center text-sm font-medium text-muted-foreground">
                                            {/* <svg className="w-4 h-4 mr-1" aria-hidden="true" fill="none"
                                                    strokeLinejoin="round" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                </svg> */}
                                            <span className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Description
                                            </span>
                                        </div>
                                        <p className="text-foreground text-sm dark:text-gray-400">
                                            {selectedReport.description}
                                        </p>
                                    </div>

                                    {/* Status */}
                                    <div className="space-y-1 mt-4">
                                        <div className="flex gap-2 items-center text-sm font-medium text-muted-foreground">
                                            {/* <svg className="w-4 h-4 mr-1" aria-hidden="true" fill="none"
                                                    strokeLinejoin="round" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                                </svg> */}
                                            <span className="mb-1 text-sm font-medium text-gray-600 dark:text-gray-400">
                                                Update Status
                                            </span>
                                        </div>
                                        <select
                                            className="block w-56 mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                                            value={status || (selectedReport && selectedReport.status) || "pending"} onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="cleaned">Cleaned</option>
                                            <option value="rejected">Rejected</option>
                                        </select>
                                        {statusError && (
                                            <div className="text-red-500 text-sm mt-2">{statusError}</div>
                                        )}
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
                            {isImageModalOpen && (
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
                            )}
                        </div>
                    )}

                    {/* <div
                    className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
                >
                    <span className="flex items-center col-span-3">
                        Showing 21-30 of 100
                    </span>
                    <span className="col-span-2"></span>
                    <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                        <nav aria-label="Table navigation">
                            <ul className="inline-flex items-center">
                                <li>
                                    <button
                                        className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                                        aria-label="Previous"
                                    >
                                        <svg
                                            className="w-4 h-4 fill-current"
                                            aria-hidden="true"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                clip-rule="evenodd"
                                                fill-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                                    >
                                        1
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                                    >
                                        2
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md focus:outline-none focus:shadow-outline-purple"
                                    >
                                        3
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                                    >
                                        4
                                    </button>
                                </li>
                                <li>
                                    <span className="px-3 py-1">...</span>
                                </li>
                                <li>
                                    <button
                                        className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                                    >
                                        8
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
                                    >
                                        9
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                                        aria-label="Next"
                                    >
                                        <svg
                                            className="w-4 h-4 fill-current"
                                            aria-hidden="true"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clip-rule="evenodd"
                                                fill-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </span>
                </div> */}
                </div >
            )
            }
        </>
    )
}