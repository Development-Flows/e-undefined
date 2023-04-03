import fetch from "node-fetch";
import Cookies from "universal-cookie";

// interface IsuccessLoginResponse {
//     status:boolean,
//     accessToken:string
// }

const cookies = new Cookies();
export const LoginHandler = (mail: string, password: string) => {
	fetch('https://e-undefined-service.onrender.com/auth/login', {
		method: 'post',
		body: JSON.stringify({ mail, password }),
		headers: { 'Content-Type': 'application/json' }
	}).then((res) => res.json()).then((data: any) => {
		if (data.status === true) {
			cookies.set("accessToken", data.accessToken)
		} console.log('data :>>', data)
	}).catch((err) => console.log('err :>> ', err));

}
