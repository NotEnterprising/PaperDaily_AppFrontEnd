import axios from '@/config/requestConfig.js';
import {
	headers,
	picUrl
} from './common.js'
export const  getTopicDetail =async (id) => {
	let detail = await axios.get('Interpretation/'+ id,{},headers)
	// if(detail.images==null||detail.images==''){
	// 	detail.images = []
	// }else{
	// 	detail.images = detail.images.split(",")
	// }
	detail.userpic=picUrl+detail.userpic
	console.log(detail)
	return detail
}

export const  pushHistory = async (data) => {
	// let detail = await axios.post('topic/history',data)
}
export const  getCommentList = async (id) => {
	// let data = await axios.get('papComment/'+id,{},headers)
	let data=[]
	return data
}
export const  delComment = async (id) => {
	let result = await axios.delete("papComment/delete/" + id,{},headers)
	return result
}

export const  addComment = async (data) => {
	let result = await axios.post("papComment/create",data,headers)
	return result
}
