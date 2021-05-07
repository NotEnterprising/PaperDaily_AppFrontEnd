import axios from '@/config/requestConfig.js';
import time from '../common/time.js'
import {
	headers
} from './common.js'
export const saveUserAccess = async (data) => {
	let result = await axios.post('user/access',data)
	return result
}

export const getUserInfo = async (data) => {
	let result = await axios.get('user/profile',data,headers);
	console.log(result)
	return result
}

export const getTopicListByUid = async (id) => {
	let result = []
	let topicList = await axios.get('topic/list/'+id);
	if(topicList&&topicList.length){
		result = topicList.map((item)=>{
			return{
				"authImg": item.userpic,
				"authName": item.username,
				"createTime": time.gettime.gettime(item.createTime),
				"content": item.title,
				"tag":item.cName,
				"id":item.id
			}
		})
		
	}
	return result
}
export const getTopicTitleByUid = async (id) => {
	let result = await axios.get('topic/title/user/'+id);
	return result
}