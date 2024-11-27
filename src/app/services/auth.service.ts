import http from "../../http-common";

interface Login {
    email: string;
    password: string;
};

interface ReturnLoginData {
    result: {accessToken: string};
    user: {email: string; username: string; id: number};
};

interface SaveUserLogin {
    accessToken: string;
    user: {email: string; username: string; id: number};
};

const authService = {
    async autenticate(data: Login) {
        const response = await http.post<ReturnLoginData>("/login", data);
        return response.data;
    },

    setLoggedUser(data: ReturnLoginData) {
        const parsedData = JSON.stringify(data);
        localStorage.setItem("user", parsedData);
    },

    getLoggedUser() {
        const data = localStorage.getItem("user");
        if (!data) return null;

        try {
            const parsedData: SaveUserLogin = JSON.parse(data);
            return parsedData;
        } catch (error) {
            console.log(error)
            return null;
        }
    },

    cleanLoggedUser() {
        localStorage.clear();
    },
}

export default authService;