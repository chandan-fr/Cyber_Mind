import { Transactions_Data } from "../../config/CustomTypes";

export const tnxdata: Array<Transactions_Data> = [
    {
        "_id": "664db536a40c668c683baaed",
        "user": "662baa09c71fe447b5c63575",
        "tnx_amount": 68,
        "category": {
            "_id": "663ca2a5698a11319e7653bc",
            "transaction_category_name": "Entertainment",
            "is_delete": false
        },
        "note": "",
        "date_time": 1716541440,
        "tnx_type": "Expense",
        "is_delete": false,
        "createdAt": "2024-05-22T09:04:54.067Z",
        "updatedAt": "2024-05-22T09:04:54.067Z"
    },
    {
        "_id": "664ef667abf5d9e8e0b2f43d",
        "user": "662baa09c71fe447b5c63575",
        "tnx_amount": 99,
        "category": {
            "_id": "663ca297698a11319e7653ba",
            "transaction_category_name": "Shopping",
            "is_delete": false
        },
        "note": "",
        "date_time": 1716450900,
        "tnx_type": "Expense",
        "is_delete": false,
        "createdAt": "2024-05-23T07:55:19.948Z",
        "updatedAt": "2024-05-23T07:55:19.948Z"
    },
    {
        "_id": "664ef681abf5d9e8e0b2f442",
        "user": "662baa09c71fe447b5c63575",
        "tnx_amount": 100,
        "category": {
            "_id": "663ca32c0770f41ac6748c5d",
            "transaction_category_name": "Salary",
            "is_delete": false
        },
        "note": "",
        "date_time": 1716450900,
        "tnx_type": "Income",
        "is_delete": false,
        "createdAt": "2024-05-23T07:55:45.171Z",
        "updatedAt": "2024-05-23T07:55:45.171Z"
    },
    {
        "_id": "664ef64eabf5d9e8e0b2f438",
        "user": "662baa09c71fe447b5c63575",
        "tnx_amount": 33,
        "category": {
            "_id": "663ca2a5698a11319e7653bc",
            "transaction_category_name": "Entertainment",
            "is_delete": false
        },
        "note": "",
        "date_time": 1716364440,
        "tnx_type": "Expense",
        "is_delete": false,
        "createdAt": "2024-05-23T07:54:54.795Z",
        "updatedAt": "2024-05-23T07:54:54.795Z"
    },
    {
        "_id": "664ef63dabf5d9e8e0b2f433",
        "user": "662baa09c71fe447b5c63575",
        "tnx_amount": 63,
        "category": {
            "_id": "663ca287698a11319e7653b8",
            "transaction_category_name": "Food",
            "is_delete": false
        },
        "note": "",
        "date_time": 1716278040,
        "tnx_type": "Expense",
        "is_delete": false,
        "createdAt": "2024-05-23T07:54:37.211Z",
        "updatedAt": "2024-05-23T07:54:37.211Z"
    }
];

export const expenses = { Sun: 476, Mon: 776, Tue: 334, Wed: 224, Thu: 123, Fri: 998, Sat: 550 };
export const expensesmonth = { "Jan": 476, "Feb": 776, "Mar": 334, "Apr": 224, "May": 123, "Jun": 998, "Jul": 550, "Aug": 476, "Sep": 776, "Oct": 334, "Nov": 224, "Dec": 123 };