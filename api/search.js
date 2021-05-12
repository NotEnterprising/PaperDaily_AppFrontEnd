import axios from '@/config/requestConfig.js';
import {
	headers,
	picUrl
} from './common.js'



export const searchTopicList = async (page=1,key='',author='') => {
	let result = await axios.get('Interpretation/page/'+1+'?author='+author+'&keywords='+key,{},headers)
	// console.log(result)
	if(result&&result.length){
		result.forEach((item)=>{
			item.userpic=picUrl+item.userpic
		})
	}
	console.log(result)
	return result
}
