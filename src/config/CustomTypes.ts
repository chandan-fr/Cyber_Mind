export type BgGradient_Props = {
    height?: number;
    width?: number;
    colors: Array<string>;
    isAngle?: boolean;
    angle?: number;
    xAxis?: number;
    yAxis?: number;
    radius?: number;
};

export type Button_Props = {
    title: string;
    height?: number;
    width?: number;
    size: number;
    radius: number;
    onPress: Function;
};

export type Wlcm_Data = {
    heading: string;
    para: string;
    scr_img: string;
};

export type Login_Data = {
    credential: string;
    password: string;
    auth_type: string;
    remember_me?: boolean;
};

export type RememberMe_Data = {
    credential: string;
    password: string;
    remember_me: boolean;
};

export type Signup_Data = {
    email: string;
    full_name: string;
    password: string;
    type: string;
};

export type Loader_Props = {
    visible: boolean;
    source?: string;
    width?: number;
    height?: number;
};

export type Form_Error = {
    credential?: string;
    password?: string;
    full_name?: string;
    email?: string;
    phone?: string;
    city_state?: string;
};

export type Icon_Props = {
    name: string;
    iconColor: string;
    size: number;
};

export type User_Form_Data = {
    full_name: string;
    email: string;
    phone: string;
    city_state: string;
};

export type Chat_Thread_Props = {
    item: { [key: string]: string };
    navigation: any;
};

export type Profile_Image = {
    name?: string;
    fileName?: string;
    uri?: string;
    type?: string;
};

export type Prompt_Modal_Props = {
    visible: boolean;
    msg: string;
    onPressOK: Function;
    onPressCancel: Function;
};

export type DayDate = {
    day: string;
    date: number | null;
    month: number;
    time: string;
    status: string;
    empty?: boolean;
    isDisabled: boolean;
    isAbsent: string;
    isHoliday?: boolean,
    isLeave?: boolean,
};

export type Calendar_Props = {
    data: Array<DayDate>;
    currentDay: number;
    onDayPress: Function;
    navigation?: any;
    monthIndex: number;
};

export type Date_State = {
    currentYear: number;
    currentMonth: string;
    currentMonthIndex: number;
};

export type Event_State = {
    date: string;
    time: string;
    open: boolean;
    datetime: Date | undefined;
};

export type Event_Data = {
    event_name: string;
    location?: string;
    alert: string;
    event_start_timestamp: number;
    event_end_timestamp: number;
    repeat?: string;
    url?: string;
    note?: string;
    is_allDay: boolean;
};
export type Event_Error = {
    event_name?: string;
    location?: string;
    alert?: string;
    event_start_timestamp?: string;
    event_end_timestamp?: string;
    repeat?: string;
    url?: string;
    note?: string;
};

export type DotsMenu_Props = {
    onEdit?: Function;
    onDelete?: Function;
    onClose?: Function;
};

export type Transactions_Data = {
    _id: string;
    user: string;
    tnx_amount: number;
    category: {
        _id: string;
        transaction_category_name: string;
        is_delete: boolean;
    },
    note: string;
    date_time: number;
    tnx_type: string;
    is_delete: boolean;
    createdAt: string;
    updatedAt: string;
};

export interface Transaction_Form {
    tnx_amount?: string;
    category?: string;
    note?: string;
    date_time?: number;
    tnx_type?: string;
};

export interface Transaction_Error extends Transaction_Form { };

export type BarChart_Props = {
    data: { [key: string]: number };
    filterType?: string;
    height: number;
};

export type EmptyData_Props = {
    msg: string;
    width?: number;
    height?: number;
    size?: number;
    lifted?: boolean;
};