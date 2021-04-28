import axios from '@/config/requestConfig.js';

import {
	headers
} from './common.js'

export const userAtt = async (data) => {
	axios.setLoading(false);
	console.log(data)
	let result = await axios.post('user/'+data+"/follow",{},headers)
	axios.setLoading(true);
	return result
}

export const searchUserList = async (data) => {
	let result = await axios.get('user/search?key='+ data,{},headers)
	if(result&&result.length){
		result = result.map((item)=>{
			return {
				id:item.id,
				userpic:item.userpic,
				username:item.username,
				isguanzhu:item.isguanzhu,
				institution:item.institution
			}
		})
	}else{
		result = []
	}
	return result
}
