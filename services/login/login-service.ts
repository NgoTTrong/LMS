import toast from "react-hot-toast";
import { apiEndpoint } from "../api/endpoint";
import RequestAPI from "../api/request-api";
import { setCookie } from "cookies-next";

const loginRoutes = {
    loginClerk: apiEndpoint + "/auth/login-clerk",
};

export default class LoginService {
    static loginClerk = async (userId: string) => {
        try {
            const response = await fetch(loginRoutes.loginClerk, {
                method: "POST",
                body: JSON.stringify({ userId: userId }),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
            });
            // const _responseData = await response?.json();
            // if (_responseData?.user) {
            //     if (_responseData?.accessToken) {

            //     }
            //     return _responseData?.user;
            // }
        } catch (e) {
            toast.error("Something went wrong");
        }
        return null;
    };
}
