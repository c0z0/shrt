[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/c0z0/shrt?env=MONGO_URL)

# shrt
Little link shortening microservice

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
