import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {

    //In this code toke is object create with requestting for cookies stored in browser
    //And jwt is used to decod that requested token token,env.
    //then it return only id 
    //in short it exxtract data from requseted token.
    
    try {
        const token = request.cookies.get("token")?.value || '';
        const decodedToken:any = jwt.verify(token, process.env.TOKEN_SECRET!);
        return decodedToken.id;
    } catch (error: any) {
        throw new Error(error.message);
    }

}