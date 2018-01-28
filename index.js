const { json, send } = require('micro')

module.exports = async (req, res) => {
  const data = await json(req)

  send(res, 500, data)
}
