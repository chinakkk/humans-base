import {currentDate} from "../utils/currentDate";

export type userInfoType = {
    id: string;
    name: string;
    surname: string;
    level: string;
    birthday: string;
}
export type taskType = {
    id: string;
    title: string;
    text: string;
    date: string;
    state:boolean;
    login:string;
}
export type messageObjType ={
    inputMessage:string;
    uuid:string;
    login:string;
    date:string,

}