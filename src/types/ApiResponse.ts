import { Message } from "@/model/User";

export interface ApiResponse{
    success : boolean;
    message : string;
    isAcceptingMessage? : boolean; //here ? indicates its optional field
    messages? : Array<Message>;
}