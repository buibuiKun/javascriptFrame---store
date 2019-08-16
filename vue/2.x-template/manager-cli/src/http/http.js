import axios from 'axios'







const http = {
	get: (url, queryData) => new Promise((resolve, reject) => {
			axios.get(url,{ 
				params: queryData
			}).then((response) => {
				resolve(response)
			}).catch((error) => {
				reject(error)
			})
	}),
	post: (url, queryData) => new Promise((resolve, reject) => {
		axios.post(url, queryData)
	  .then((response) => {
	    resolve(response)
	  })
	  .catch((error) => {
	    reject(error)
	  })
	})
}

export default http