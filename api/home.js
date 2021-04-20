import axios from '@/config/requestConfig.js';
import {
	headers
} from './common.js'
export const  getUserProfile =async (token) => {
	let data = await axios.get('user/profile',{},headers)
	console.log(data)
	return data
}

// export const  giveLike = async (data) => {
// 	let result = await axios.post('topic/active',data);
// 	return result
// }
