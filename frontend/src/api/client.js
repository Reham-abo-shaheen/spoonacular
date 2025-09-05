const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export async function apiFetch(path, { method = "GET", body, token } = {}) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers.Authorization = `Bearer ` + token;
    const res = await fetch(`${API_BASE}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,

    });
    if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try {
            msg = await res.text();
        } catch (error) {
            console.log(error);

        }
        throw new Error(msg);
    }
    const ct = res.headers.get("content-type") || "";
    return ct.includes("application/json") ? res.json() : res.text();
}
