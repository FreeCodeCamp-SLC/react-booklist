import { loadAuthToken } from "./local-storage";

const authHeaders = {
headers: {
    Authorization: `Bearer ${loadAuthToken()}`,
}};

export default authHeaders