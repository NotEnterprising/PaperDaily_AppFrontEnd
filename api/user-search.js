import axios from '@/config/requestConfig.js';

import {
	headers,
	picUrl
} from './common.js'

export const userAtt = async (data) => {
	axios.setLoading(false);
	console.log(data)
	let result = await axios.post('user/'+data+"/follow",{},headers)
	axios.setLoading(true);
	return result
}

export const searchUserList = async (data) => {
	let result = await axios.get('user/search/roll?key='+ data,{},headers)
	console.log("begin:")
	console.log(result)
	if(result&&result.length){
		result = result.map((item)=>{
			return {
				id:item.id,
				userpic:picUrl+item.userpic,
				username:item.username,
				isguanzhu:item.is_following,
				institution:item.institution
			}
		})
	}else{
		result = []
	}
	return result
}
