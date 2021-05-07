import axios from '@/config/requestConfig.js';
import time from '../common/time.js'
import {
	headers,
	picUrl
} from './common.js'
export const getChatList = async (userInfo) => {
	axios.setLoading(true);
	let room = await axios.get('chat/list',{},headers);
	let data = room.chatroom_list
	if(data&&data.length==0){
		return []
	}
	console.log(data)
	axios.setLoading(false);
	if (data && data.length) {
		let chatList = data.map((item) => {
			let count = item.message_list.reduce((prev, item) => {
				if (item.read_state == 0 && item.to_user_id == userInfo.id) {
					return prev + 1
				} else {
					return prev
				}
			}, 0)
			let fid = userInfo.id == item.from_user_id ? item.to_user_id : item.from_user_id
			let len = item.message_list.length - 1
			let sendTime = item.message_list[len] ?
				time.gettime.gettime(item.message_list[len].created_at) :
				time.gettime.gettime(new Date())
			let message = item.message_list[len] ? item.message_list[len].content :
				''
			let msgList = item.message_list.map((mItem) => {
				return {
					id: mItem.message_id,
					isme: mItem.from_user_id == userInfo.id,
					uid: mItem.from_user_id,
					userpic: picUrl+mItem.from_user_pic,
					type: "text",
					message: mItem.content,
					time: time.gettime.gettime(mItem.created_at),
					gstime: time.gettime.getChatTime(mItem.created_at),
					status: mItem.read_state,
				}
			})
			return {
				id: item.chatroom_id,
				fid: fid,
				fromId: item.from_user_id,
				toId: item.to_user_id,
				afterTime: +new Date(item.afterTime),
				userpic: item.from_user_id==userInfo.id?picUrl+item.to_user_pic:picUrl+item.from_user_pic,
				username: item.from_user_id==userInfo.id?item.to_user_name:item.from_user_name,
				time: sendTime,
				message: message,
				noreadnum: count,
				messages: msgList
			}
		})
		console.log(chatList)
		return chatList
	}
}
export const deleteChat = async (id) => {
	axios.setLoading(true);
	let result = await axios.delete('chat/delete', {
		cids: typeof id == "number"? [id]:[...id]
	}, headers);
	axios.setLoading(false);
	return result
}
export const updateChat = async (id) => {
	axios.setLoading(true);
	axios.post('chat/read', {
		messageId: [id]
	}, headers)
	axios.setLoading(false);
}
export const readChatMsg = async (mids,cId) => {
	axios.setLoading(true);
	await axios.post('chat/read', {
		messageIds: mids,
		cId:cId
	}, headers)
	axios.setLoading(false);
}

export const createSocket = async (uid) => {
	let socket = await axios.websocket('POST', "msg/" + uid);
	return socket
}
