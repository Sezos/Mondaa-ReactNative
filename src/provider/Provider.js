import React, { createContext, useEffect, useState } from "react";
import services from "../services/service";
import { RequestUserPermission } from "../utils/notification";
import { socket } from "../utils/socket";

const ProviderContext = createContext();

const Provider = (props) => {
    const [avatar, setAvatar] = useState("");
    const [s3URL, setS3URL] = useState("");
    const [userData, setUserData] = useState({});
    const [workerList, setWorkerList] = useState([]);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [workerCount, setWorkerCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [calendarVisible, setCalendarVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    useEffect(() => {
        if (isLoggedIn) {
            RequestUserPermission();
            _getUserData();
            _countProjectUsers();
            _countEmployees();
            _getS3();
        }
    }, [isLoggedIn]);

    socket.on("connect", () => {
        console.log("connected");
    });
    socket.on("connect_error", (err) => {
        console.log(`connect_error due to ${err.message}`);
    });

    //get S3 URL
    const _getS3 = async () => {
        const { data } = await services.getAvatarURL();
        setS3URL(data.s3_url);
    };

    //total employees: count
    const _countEmployees = async () => {
        const { data } = await services.countEmployees();
        setEmployeeCount(data);
    };

    //Get Employee Data
    const _getUserData = async () => {
        const { data } = await services.getUserInfo();
        setAvatar(data?.avatar);
        setUserData(data);
    };

    //employees who has job today: count
    const _countProjectUsers = async () => {
        const { data } = await services.countProjectUsers({
            from: selectedDate,
            to: selectedDate,
        });
        setWorkerCount(data);
    };

    return (
        <ProviderContext.Provider
            value={{
                s3URL,
                setS3URL,
                isLoggedIn,
                setIsLoggedIn,
                userData,
                setUserData,
                calendarVisible,
                setCalendarVisible,
                selectedDate,
                setSelectedDate,
                employeeCount,
                _countProjectUsers,
                setEmployeeCount,
                workerCount,
                setWorkerCount,
                workerList,
                setWorkerList,
                avatar,
                setAvatar,
            }}
        >
            {props.children}
        </ProviderContext.Provider>
    );
};

export { Provider, ProviderContext };
