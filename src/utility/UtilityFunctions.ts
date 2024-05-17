import { PermissionsAndroid } from "react-native";
import { Gallery_Permission, _Image_Url } from "../config/staticVariables";
import { showModal } from "../services/slices/UtilitySlice";
import { DayDate } from "../config/CustomTypes";

export const getFullDate = (): string => {
    const months: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek: string[] = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];

    const currentDate: Date = new Date();
    const dayOfWeek: string = daysOfWeek[currentDate.getDay()];
    const month: string = months[currentDate.getMonth()];
    const dayOfMonth: number = currentDate.getDate();
    const year: number = currentDate.getFullYear();

    return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
};

export const getImagUrl = (url: string): string => {
    const image_url: string = url.replaceAll("\\", "/");
    const imgUrl = `${_Image_Url}${image_url}`;
    return imgUrl;
};

export const hasGalleryPermission = async (dispatch: any): Promise<boolean> => {
    try {
        const hasPermission = await PermissionsAndroid.check(Gallery_Permission);
        if (!hasPermission) {
            const granted = await PermissionsAndroid.request(Gallery_Permission);
            return granted === "granted";
        }
        return true;
    } catch (exc: any) {
        dispatch(showModal({ msg: exc?.message, type: "error" }));
        return false;
    }
};

export const convertToFormData = (data: any): FormData => {
    const formValue = new FormData();
    formValue.append('profile_img', { type: data?.type, uri: data?.uri, name: data?.fileName });
    return formValue;
};

export const getMonthToDatesArray = (monthIdx: number): Array<DayDate> => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = monthIdx ? monthIdx : currentDate.getMonth();
    const startIndex = new Date(currentDate.getFullYear(), month, 1).getDay();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const dayDateArray: DayDate[] = [];

    for (let date = new Date(firstDayOfMonth); date <= lastDayOfMonth; date.setDate(date.getDate() + 1)) {
        const day = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
        const dayOfMonth = date.getDate();

        dayDateArray.push({ day, date: dayOfMonth, month: month, time: "", status: "", empty: false, isDisabled: false, isAbsent: "", isLeave: false });
    }

    const emptyDayCell = Array.from({ length: startIndex },
        () => { return { day: "", date: null, month: month, time: "", status: "", empty: true, isDisabled: false, isAbsent: "", isLeave: false } }
    );
    const newDayDateArray = [...emptyDayCell, ...dayDateArray]


    return newDayDateArray;
};

export const getMonthArray = (monthIdx: number): Array<DayDate> => {
    let data: any[] = [];
    const monthData: Array<DayDate> = getMonthToDatesArray(monthIdx);

    for (let i: number = 0, j: number = 0; i < monthData.length; i++) {
        if (i == 0) {
            data.push({ ...monthData[j], isHoliday: true, isDisabled: true });
            j += 6;
            continue;
        }
        if (i == j) {
            data.push({ ...monthData[j], isHoliday: true, isDisabled: true });
            data.push({ ...monthData[j + 1], isHoliday: true, isDisabled: true });
            j += 6 + 1;
            i += 1;
            continue;
        }
        data.push(monthData[i]);
    };
    const modifiedData: any = data
    return modifiedData;
};

export const convertToTimeStamp = (date: Date | undefined): number => {
    const data = date ?? new Date();
    const isoDateString: string = data?.toISOString();
    const timestamp: number = Math.floor(Date.parse(isoDateString) / 1000);
    return timestamp;
};

export const getFormatedDateTime = (inputDate: any, mode: string): string => {
    const date: any = new Date(inputDate);

    const options: { [key: string]: string } = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate: string = date.toLocaleDateString("en-IN", options);

    date.setHours(date.getHours());
    date.setMinutes(date.getMinutes());

    const timeOptions: { [key: string]: string | boolean } = { hour: "2-digit", minute: "2-digit", hour12: true };
    const formattedTime: string = date.toLocaleTimeString("en-IN", timeOptions);

    if (mode === "date") {
        return formattedDate;
    } else {
        return formattedTime;
    }
};