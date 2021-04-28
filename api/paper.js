import axios from '@/config/requestConfig.js';
import time from '../common/time.js'
import {
	headers
} from './common.js'
export const getChatList = async (userInfo) => {
	axios.setLoading(true);
	let data = await axios.get('chat/list',{},headers);
	if(data&&data.length==0){
		return []
	}
	axios.setLoading(false);
	if (data && data.length) {
		let chatList = data.map((item) => {
			let count = item.messages.reduce((prev, item) => {
				if (item.status == 0 && item.toId == userInfo.id) {
					return prev + 1
				} else {
					return prev
				}
			}, 0)
			let fid = userInfo.id == item.fromId ? item.toId : item.fromId
			let len = item.messages.length - 1
			let sendTime = item.messages[len] ?
				time.gettime.gettime(item.messages[len].sendTime) :
				time.gettime.gettime(new Date())
			let message = item.messages[len] ? item.messages[len].message :
				''
			let msgList = item.messages.map((mItem) => {
				return {
					id: mItem.id,
					isme: mItem.fromId == userInfo.id,
					uid: mItem.fromId == userInfo.id ? mItem.toId : mItem.fromId,
					userpic: mItem.fromId == userInfo.id ? "https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png" : item.userpic,
					//userInfo.authorUrl
					type: "text",
					message: mItem.message,
					time: time.gettime.gettime(mItem.sendTime),
					gstime: time.gettime.getChatTime(mItem.sendTime),
					status: mItem.status,
				}
			})
			return {
				id: item.id,
				fid: fid,
				fromId: item.fromId,
				toId: item.toId,
				afterTime: +new Date(item.afterTime),
				userpic: item.userpic,
				username: item.username,
				time: sendTime,
				message: message,
				noreadnum: count,
				messages: msgList
			}
		})
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
	axios.put('chat/read', {
		mids: [id]
	}, headers)
	axios.setLoading(false);
}
export const readChatMsg = async (mids) => {
	axios.setLoading(true);
	await axios.put('chat/read', {
		mids: mids
	}, headers)
	axios.setLoading(false);
}

export const createSocket = async (uid) => {
	let socket = await axios.websocket('POST', "msg/" + uid);
	return socket
}
