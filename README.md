[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/c0z0/shrt&env=MONGO_URL)

# shrt
Little link shortening microservice

## Get started
```
$ git clone https://github.com/c0z0/shrt.git
$ cd shrt
$ npm install
$ npm start
```

<b> If `MONGO_URL` enviorment variable is not containing a MongoDB url the app saves data in `data.json` in the root folder.</b>

## API

#### Route `/sh`
Method `POST`

Body
```JSON
{
  "url": "cserdean.me"
}
```
Response
```JSON
{
  "url": "http://cserdean.me",
  "_d": "SkkHCaoBz"
}
```

#### Route `/<id>` redurects to the url. Sends 404 if url not found.
