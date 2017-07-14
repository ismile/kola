# KOLA
Another Koa boilerplate
* Koa
* ES6
* [Objection.js](http://vincit.github.io/objection.js/) and Knex
* Built in auth with JWT
* Logging with winston
* Route directly from controller using javascript `decorator`
* Auto generate rest api by extending `api-controller.js class`
* Client packaging using webpack
* etc


## Installation

`yarn install` or `npm install`

## Development
`npm start`
`npm run client`


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

