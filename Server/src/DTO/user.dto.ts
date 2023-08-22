import { group } from "./group.dto";

export class UserDTO{
    id:number;
    email:string;
    name:string;
    password:string;
    saveOrder:Number;
    saveStore:Number;
    groups:Array<Number>;
}