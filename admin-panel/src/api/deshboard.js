const API_URL = "http://localhost:8080/admin"
const token = localStorage.getItem("token");

export async function getHomeData() {
    try {
        const response = await fetch(`${API_URL}/home`, {
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
        console.error("Failed to fetch deshboard data:", error);
        throw error;
    }
}