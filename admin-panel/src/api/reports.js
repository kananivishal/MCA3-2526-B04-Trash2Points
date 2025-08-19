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