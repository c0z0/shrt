const { json, send } = require('micro')
const shortid = require('shortid')
const url = require('url')

const addRoute = /\/sh\/?/g

const urls = []

module.exports = async (req, res) => {
	const parsedUrl = url.parse(req.url)

	if (addRoute.test(parsedUrl.pathname) && req.method === 'POST') {
		const data = await json(req)

		if (!data || !data.url)
			return send(res, 400, "URL ('url') field not present.")

		const newUrl = { url: data.url, id: shortid.generate() }
		urls.push(newUrl)

		return send(res, 200, newUrl)
	}

	if (shortid.isValid(parsedUrl.pathname.slice(1)) && req.method === 'GET') {
		const foundUrl = urls.find(u => u.id === parsedUrl.pathname.slice(1))

		if (foundUrl) return send(res, 200, foundUrl)
	}

	send(res, 404, 'Not Found')
}
