import axios from '@/config/requestConfig.js';
import {
	headers
} from './common.js'



export const userRegister = async (data) => {
	console.log("test");
	let result = await axios.put('user/create',data)
	return result
}

export const getCode = async (email) => {
	axios.setLoading(true);
	let result = await axios.post('user/create',data)
	axios.setLoading(false);
	return result
}
