const { json, send } = require('micro')
const url = require('url')
const shortid = require('shortid')
const redirect = require('./redirect')

const { addUrl, getUrl } = require(process.env.MONGO_URL
	? './db'
	: './fsDataLayer')

const addRoute = /\/sh\/?/g

module.exports = async (req, res) => {
	const parsedUrl = url.parse(req.url)

	if (addRoute.test(parsedUrl.pathname) && req.method === 'POST') {
		const data = await json(req)

		if (!data || !data.url) return send(res, 400, 'URL field not present')

		const newUrl = await addUrl(data.url)

		return send(res, 200, newUrl)
	}

	if (shortid.isValid(parsedUrl.pathname.slice(1)) && req.method === 'GET') {
		const foundUrl = await getUrl(parsedUrl.pathname.slice(1))

		console.log(foundUrl)

		if (foundUrl) return redirect(res, 308, foundUrl.url)
	}

	if (parsedUrl.pathname === '/' && req.method === 'GET') {
		send(res, '200', 'SHRT API')
	}

	send(res, 404, 'Not Found')
}
