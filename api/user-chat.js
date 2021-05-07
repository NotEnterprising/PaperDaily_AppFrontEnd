import axios from '@/config/requestConfig.js';
import {
	headers
} from './common.js'



export const pushMessage = async (data) => {
	axios.setLoading(false);
	console.log(data)
	let result = await axios.post("chat/push",data,headers)
	axios.setLoading(true);
	return result
}

export const createChat = async (data) => {
	let result = await axios.post('chat/create',data,headers)
	return result
}


export const getChat = async (id) => {
	let result = await axios.get('chat/'+id,{},headers)
	return result
}
