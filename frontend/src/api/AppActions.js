import { observable, action } from "mobx";

const AppStore = observable({
    authToken: null,
});

const AppActions = {
    setAuthToken: action((token) => {
        AppStore.authToken = token;
        localStorage.setItem("token", token);
    }),
    getLocalStorageAuthToken: action(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            return null;
        }
        AppActions.setAuthToken(token);
        return token;
    }),
};

export {AppActions, AppStore};
