const shortid = require('shortid')
const fs = require('fs')
const path = require('path')

const urls = []

const filePath = path.join(__dirname, '../data.json')

if (fs.existsSync(filePath)) {
	urls.push(...JSON.parse(fs.readFileSync(filePath)))
}

/**
 * Finds url in list
 * @param {string} id Id of url
 * @returns {object} Found url or undefined
 */
const getUrl = id => urls.find(u => u.id === id)

/**
 * Formats then dds url to list
 * @param {string} url Url to add
 * @returns {object} Url object
 */
const addUrl = url => {
	if (
		url.slice(0, 'https://'.length) !== 'https://' &&
		url.slice(0, 'http://'.length) !== 'http://'
	)
		url = 'http://' + url

	const newUrl = { url, id: shortid.generate() }

	urls.push(newUrl)

	fs.writeFileSync(filePath, JSON.stringify(urls))

	return newUrl
}

module.exports = { getUrl, addUrl }
