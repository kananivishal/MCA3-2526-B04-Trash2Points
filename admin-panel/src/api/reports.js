const API_URL = "http://localhost:8080/adminreport"
const token = localStorage.getItem("token");

export async function getAllReports() {
    try {
        const response = await fetch(`${API_URL}/reports`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                token: token
            }
        })
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch reports:", error);
        throw error;
    }
}

export async function updateReport(reportId, status) {
    try {
        const response = await fetch(`${API_URL}/updatereport/${reportId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
            body: JSON.stringify({ status })
        })
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to update report:", error);
        throw error;
    }
}

export async function deleteReport(reportId) {
    try {
        const response = await fetch(`${API_URL}/deletereport/${reportId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                token: token
            },
        })
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to delete report:", error);
        throw error;
    }
}