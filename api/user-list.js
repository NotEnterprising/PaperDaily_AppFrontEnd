import axios from '@/config/requestConfig.js';

import {
	headers
} from './common.js'

export const getUserAttList = async () => {
	let result = []
	axios.setLoading(false)
	let attData = await axios.get("user/follower/list",{},headers)
	axios.setLoading(true)
	
	if(attData&&attData.length){
			result = attData.map((item)=>{
				return	{
						id:item.id,
						userpic:item.userpic,
						username:item.username,
						isguanzhu:true
				}
			})
		
	}
	return result
}

export const getUserFansList = async (eachData) => {
	let result = []
	axios.setLoading(false)
	let fansData = await axios.get("user/fan/list",{},headers)
	axios.setLoading(true)
	
	if(fansData&&fansData.length){
		result = fansData.map((item)=>{
			let isguanzhu = false;
			if(eachData&&eachData.length){
				isguanzhu = eachData.some((eItem)=>{
					return item.id == eItem.id
				})
			}
			return	{
					id:item.id,
					userpic:item.userpic,
					username:item.username,
					isguanzhu:isguanzhu
			}
		})
	}
	console.log(result)
	return result
}
export const getUserEachList = async () => {
	let result = []
	axios.setLoading(false)
	let eachData = await axios.get("user/each/list",{},headers)
	axios.setLoading(true)
	if(eachData&&eachData.length){
		result = eachData.map((item)=>{
			return	{
					id:item.id,
					userpic:item.userpic,
					username:item.username,
					isguanzhu:true
			}
		})
	}
	return result
}

function precessUserData(item){
	return {
		
	}
}