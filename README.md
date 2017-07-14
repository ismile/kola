# KOLA
Another Koa boilerplate
* Koa
* ES6
* [Objection.js](http://vincit.github.io/objection.js/) and Knex
* Built in auth with JWT
* Logging with winston
* Route directly from controller using javascript `decorator`
* Auto generate rest api by extending [api-controller.js](https://github.com/ismile/kola/blob/master/server/util/api-controller.js) class
* Client packaging using webpack
* etc


## Installation

`yarn install` or `npm install`

## Development
First you need to change config in [./knexfile.js](https://github.com/ismile/kola/blob/master/knexfile.js)
```
npm start
npm run client
```


## Production
```
npm run build-server
npm run build-client
```

## Generator
| Command  																	| Description 								|
| ----------------------------------------- | --------------------------- |
| `node generate.js api ${name}` 						| Generate Model, Controller 	|
| `node generate.js model ${name}` 					| Generate Model 							|
| `node generate.js apiController ${name}` 	| Generate api controller 		|
| `node generate.js controller ${name}` 		| Generate controller 				|

