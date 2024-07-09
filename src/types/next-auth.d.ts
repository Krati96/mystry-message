import 'next-auth'
import { DefaultSession } from 'next-auth'
//yoha next-auth module ko import kr k then modify krna h apne hisab s
declare module 'next-auth'{
    interface User{
        _id?: string,
        username?: string,
        isVerified?: boolean,
        isAcceptingMessages?: boolean
    }
    interface Session{
        user: {
            _id?: string,
            username?: string,
            isVerified?: boolean,
            isAcceptingMessages?: boolean
        } & DefaultSession['user']  //idhar ek key hogi hi hogi for default session m
    }
}

//alternative way to modify the module
declare module 'next-auth/jwt'{
    interface JWT{
        _id?: string,
        username?: string,
        isVerified?: boolean,
        isAcceptingMessages?: boolean
    }
}