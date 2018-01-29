const { json, send } = require('micro')
const shortid = require('shortid')
const redirect = require('./redirect')
const router = require('router')()

const cors = require('./cors')()
const { addUrl, getUrl } = require(process.env.MONGO_URL
	? './db'
	: './fsDataLayer')

router.get('/', (req, res) => {
	send(res, 200, 'SHRT API')
})

router.get('/:id', async (req, res) => {
	const foundUrl = await getUrl(req.params.id)

	if (foundUrl) return redirect(res, 308, foundUrl.url)
	send(res, 404, 'Not Found')
})

router.post('/sh', async (req, res) => {
	const data = await json(req)

	if (!data || !data.url) return send(res, 400, 'URL field not present')

	const newUrl = await addUrl(data.url)

	send(res, 200, newUrl)
})

module.exports = cors((req, res) => router(req, res, () => {}))
