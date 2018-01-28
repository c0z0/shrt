const mongoose = require('mongoose')

const Url = require('./models/Url')

mongoose.connect(process.env.MONGO_URL).then(
	() => console.log('Connected to MongoDB'),
	err => {
		throw err
	}
)

/**
 * Formats then saves url to db
 * @param {string} url Url to add
 * @returns {object} Added url
 */
const addUrl = async url => {
	if (
		url.slice(0, 'https://'.length) !== 'https://' &&
		url.slice(0, 'http://'.length) !== 'http://'
	)
		url = 'http://' + url

	const newUrl = await Url.create({ url })

	return newUrl
}
/**
 * Finds and returns a url by id
 * @param {string} id Id of url
 * @returns
 */
const getUrl = async id => {
	const foundUrl = await Url.findById(id)

	return foundUrl
}

module.exports = { addUrl, getUrl }
