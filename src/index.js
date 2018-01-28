const { json, send } = require('micro')
const url = require('url')
const shortid = require('shortid')
const redirect = require('./redirect')

const { addUrl, getUrl } = require('./fsDataLayer')

const addRoute = /\/sh\/?/g

module.exports = async (req, res) => {
	const parsedUrl = url.parse(req.url)

	if (addRoute.test(parsedUrl.pathname) && req.method === 'POST') {
		const data = await json(req)

		if (!data || !data.url) return send(res, 400, 'URL field not present')

		const newUrl = addUrl(data.url)

		return send(res, 200, newUrl)
	}

	if (shortid.isValid(parsedUrl.pathname.slice(1)) && req.method === 'GET') {
		const foundUrl = getUrl(parsedUrl.pathname.slice(1))

		if (foundUrl) return redirect(res, 308, foundUrl.url)
	}

	send(res, 404, 'Not Found')
}
