import { Message } from "@/model/User";

export interface ApiResponse{
    success : boolean;
    message : string;
    isAcceptingMessages? : boolean; //here ? indicates its optional field
    messages? : Array<Message>;
}