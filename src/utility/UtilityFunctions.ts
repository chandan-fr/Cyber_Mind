import { _Image_Url } from "../config/staticVariables";

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