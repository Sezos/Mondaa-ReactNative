import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { instances } from "./services.path";

const printError = () => {
    // console.log(error);
    // if (error.response) {
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    // } else if (error.request) {
    //     console.log(error.request);
    // } else {
    //     console.log("Error", error.message);
    // }
    // console.log(error.config);
};

class UserServices {
    constructor() {
        this.client = axios.create({ baseURL: "https://api.mondaa.com.au/" });
        // this.client = axios.create({ baseURL: "http://localhost:3030/" });
        this.controller = new AbortController();
    }

    check = async (version) => {
        return await new Promise((resolve, reject) => {
            this.client
                .post(instances.check, { version })
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };

    login = async (data) => {
        const sth = await new Promise((resolve, reject) => {
            this.client
                .post(instances.login, data)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
        return sth;
    };

    forgotPassword = async (data) => {
        return new Promise((resolve, reject) => {
            this.client
                .post(instances.forgotPassword, data)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    resetPassword = async (data) => {
        return new Promise((resolve, reject) => {
            this.client
                .post(instances.resetPassword, data)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    getEmployees = async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        return new Promise((resolve, reject) => {
            this.client
                .get(instances.getEmployees, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(Error);
                    reject(error);
                });
        });
    };
    getOffEmployees = async (date) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        return new Promise((resolve, reject) => {
            this.client
                .get(instances.getEmployeesOff + "/" + date, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(Error);
                    reject(error);
                });
        });
    };

    countEmployees = async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        return new Promise((resolve, reject) => {
            this.client
                .get(instances.countEmployees, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(Error);
                    reject(error);
                });
        });
    };

    getAllUser = async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        return new Promise((resolve, reject) => {
            this.client
                .get(instances.getAllUser, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    getProjectByDate = async (data) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        return new Promise((resolve, reject) => {
            this.client
                .post(instances.getProjectByDate, data, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    getProjectWorker = async (param) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .get(instances.getProjectWorker + param, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    getUserInfo = async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .get(instances.getUserInfo, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    getAvatarURL = async (access_token) => {
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        return new Promise((resolve, reject) => {
            this.client
                .get(instances.avatarURL, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    getAvatar = async (url) => {
        console.log(url);
        const sth = await new Promise((resolve, reject) => {
            axios
                .get(url, { responseType: "arraybuffer" })
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
        return sth;
    };

    setAvatar = async (data) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "content-type": "application/x-www-form-urlencoded",
            },
        };
        const sth = await new Promise((resolve, reject) => {
            this.client
                .post(instances.setAvatar, data, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
        return sth;
    };

    uploadImage = async (data) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "content-type": "application/x-www-form-urlencoded",
            },
        };
        return new Promise((resolve, reject) => {
            this.client
                .post(instances.uploadImage, data, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    setUserInfo = async (data) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .patch(instances.setUserInfo, data, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    updateEmployeeInfo = async (id, data) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        return new Promise((resolve, reject) => {
            this.client
                .patch(instances.updateEmployeeInfo + id, data, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    register = async (data) => {
        return new Promise((resolve, reject) => {
            this.client
                .post(instances.register, data)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    addProject = async (data) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        return new Promise((resolve, reject) => {
            this.client
                .post(instances.addProject, data, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    getAllProject = async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        return new Promise((resolve, reject) => {
            this.client
                .get(instances.getAllProject, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    deleteProject = async (id) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .delete(instances.deleteProject + "/" + id, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    addProjectUsers = async (data) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .post(instances.addProjectUser, data, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    removeProjectUsers = async (data) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .post(instances.removeProjectUser, data, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    addProjectLocation = async (data) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        return new Promise((resolve, reject) => {
            this.client
                .post(instances.addProjectLocation, data, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    getAllProjectLocation = async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        return new Promise((resolve, reject) => {
            this.client
                .get(instances.getAllProjectLocation, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();

                    reject(error);
                });
        });
    };

    getProjectLocation = async (id) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        return new Promise((resolve, reject) => {
            this.client
                .get(instances.getProjectLocation + "/" + id, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    deleteProjectLocation = async (id) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .delete(instances.deleteProjectLocation + "/" + id, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    getWorkHours = async (data) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .post(instances.getWorkHours, data, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    getWorkHoursTotal = async (from, to, employeeId) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        const query = `?from=${from}&to=${to}${
            employeeId ? `&employeeId=${employeeId}` : ""
        }`;

        return new Promise((resolve, reject) => {
            this.client
                .get(instances.getWorkHoursTotal + query, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    downloadWorkHours = async (from, to, employeeId) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        const query = `?from=${from}&to=${to}${
            employeeId ? `&employeeId=${employeeId}` : ""
        }`;

        return new Promise((resolve, reject) => {
            this.client
                .get(instances.downloadWorkHours + query, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    printError(error);
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    getWorkHoursTotalEmployee = async (from, to, employeeId) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        const query = `?from=${from}&to=${to}&employeeId=${employeeId}`;

        return new Promise((resolve, reject) => {
            this.client
                .get(instances.getWorkHoursTotalEmployee + query, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    createWorkHour = async (data) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .post(instances.addWorkHour, data, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    removeWorkHour = async (id) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .delete(instances.deleteWorkHour + id, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };

    countProjectUsers = async ({ from, to }) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .get(
                    instances.countProjectUsers + `?from=${from}&to=${to}`,
                    config
                )
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };

    getProjectUsers = async ({ from, to }) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .get(
                    instances.getProjectUsers + `?from=${from}&to=${to}`,
                    config
                )
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };
    setFCMToken = async (body) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .post(instances.setFCMToken, body, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };
    sendNotification = async (body) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .post(instances.sendNotification, body, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };

    sendNotificationOff = async (date) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .post(instances.sendNotificationOff, { date }, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };
    updateProject = async (id, data) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .patch(instances.updateProject + "/" + id, data, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };
    getMessages = async (id, offset) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .get(
                    instances.getMessages + `/?groupId=${id}&offset=${offset}`,
                    config
                )
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };
    getGroups = async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .get(instances.group, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };
    sendMessage = async (msg, groupId) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .post(
                    instances.sendMessage,
                    { body: msg, groupId: groupId },
                    config
                )
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };

    createGroup = async (name, users) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .post(instances.group, { name, users }, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };
    getGroupUsers = async (id) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .get(instances.groupUser + "/" + id, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };

    updateGroup = async (id, name, addUserIds, removeUserIds) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .patch(
                    instances.group + "/" + id,
                    { name, addUserIds, removeUserIds },
                    config
                )
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };

    setGroupImage = async (id, data) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "content-type": "application/x-www-form-urlencoded",
            },
        };
        return await new Promise((resolve, reject) => {
            this.client
                .post(instances.group + "/" + id, data, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    leaveGroup = async (id) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`,
                "content-type": "application/x-www-form-urlencoded",
            },
        };
        return await new Promise((resolve, reject) => {
            this.client
                .delete(instances.groupUser + "/" + id, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    reject(error);
                });
        });
    };

    getFiles = async (id) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        const param = id ? "/" + id : "";
        return new Promise((resolve, reject) => {
            this.client
                .get(instances.Files + param, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };
    getFile = async (id) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };
        return new Promise((resolve, reject) => {
            this.client
                .get(instances.File + "/" + id, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };
    createFile = async (name, isFolder, file, parentId) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        const param = parentId ? "/" + parentId : "";

        const sth = new Promise((resolve, reject) => {
            this.client
                .post(
                    instances.Files + param,
                    {
                        name,
                        isFolder,
                        file,
                    },
                    config
                )
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
        return sth;
    };
    deleteFile = async (id) => {
        const access_token = await AsyncStorage.getItem("access_token");
        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        const param = id ? "/" + id : "";

        return new Promise((resolve, reject) => {
            this.client
                .delete(instances.Files + param, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };
    getGroup = async (id) => {
        const access_token = await AsyncStorage.getItem("access_token");

        const config = {
            headers: { Authorization: `Bearer ${access_token}` },
        };

        return new Promise((resolve, reject) => {
            this.client
                .get(instances.group + "/" + id, config)
                .then((response) => resolve(response))
                .catch((error) => {
                    this.controller.abort();
                    printError(error);
                    reject(error);
                });
        });
    };
}

const services = new UserServices();

export default services;
