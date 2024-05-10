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

export const getMonthToDatesArray = (): Array<DayDate> => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const startIndex = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

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

export const getMonthArray = (): Array<DayDate> => {
    let data: any[] = [];
    const monthData: Array<DayDate> = getMonthToDatesArray();

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