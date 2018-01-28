const mongoose = require('mongoose')
const shortid = require('shortid')

const UrlSchema = new mongoose.Schema({
	url: String,
	_id: {
		type: String,
		default: shortid.generate
	}
})

module.exports = mongoose.model('Url', UrlSchema)
