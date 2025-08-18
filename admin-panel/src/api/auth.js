let API_URL = "http://localhost:8080/auth";

export async function login(credentials) {
    const response = await fetch(`${API_URL}/login`,{
        method: "POST",
        headers:{
            "Content-type":"application/json"
        },
        body: JSON.stringify(credentials)
    })

    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || "Login failed")
    }
    return data;
}