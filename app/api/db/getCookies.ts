import { cookies } from "next/headers";

export default function getCookies():string{
    const user_id = cookies().get('user_id').value;
    return user_id;
}
