import axios from '@/config/requestConfig.js';

import {
	headerForm
} from './common.js'

export const getTopicCollect = async (data) => {
	let result = await axios.get("Interpretation/collect")
	if (result && result.length) {
		result.reverse()
	} else {
		result = []
	}
	return result
}

export const deleteCollect = async (id) => {
	axios.setLoading(false);
	let result = await axios.delete('Interpretation/collect', {
		ids: [id]
	}, headerForm);
	axios.setLoading(true);
	return result
}
