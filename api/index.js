import axios from '@/config/requestConfig.js';
import {
	headers
} from './common.js'
export const  getTopicList =async () => {
	let data = await axios.get('Interpretation/recommend',{},headers)
	console.log(data.length)
	 if(data&&data.length){
		 // data.items.forEach((item)=>{
		 // 	if(item.images!=null&&item.images!=''){
		 // 		item.images = item.images.split(",");
		 // 	}else{
		 // 		item.images =[]
		 // 	}
		 // })
	 }
	return data
}
