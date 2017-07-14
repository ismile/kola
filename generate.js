#! /usr/bin/env node

var _ = require('lodash');
var bluebird = require('bluebird');
var fs = bluebird.promisifyAll(require('fs'));

var param = process.argv.slice(2);
var data = {name: param[1], className:_.upperFirst(param[1])};

function pad(d) {
	return ('0' + d).slice(-2);
}

var migrate = async () => {
	var tpl = new String(await fs.readFileAsync('./template/migrate.js'));
	var res = _.template(tpl)(data);

	var date = new Date();

	await fs.writeFileAsync(`./migrations/${date.getFullYear()}${pad(date.getMonth()+1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}_${data.name}.js`, res)
	console.info(`./migrations/${date.getFullYear()}${pad(date.getMonth()+1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}_${data.name}.js` ,'created');
}

var model = async() => {
	var tpl = new String(await fs.readFileAsync('./template/model.js'));
	var res = _.template(tpl)(data);

	await fs.writeFileAsync(`./server/model/${data.className}.js`, res);
	console.info(`./server/model/${data.className}.js` ,'created');
}


var apiController = async() => {
	var tpl = new String(await fs.readFileAsync('./template/res.js'));
	var res = _.template(tpl)(data);

	await fs.writeFileAsync(`./server/rest/${data.name}.res.js`, res);
	console.info(`./server/rest/${data.name}.res.js` ,'created');

	// add to router
	var router = new String(await fs.readFileAsync('./server/config/router.js'));
	var newRouter = router.replace(`// end config router //please don't remove this line`, `new (require('../rest/${data.name}.res').default)().init(router);\n\t\t// end config router //please don't remove this line`);

	await fs.writeFileAsync(`./server/config/router.js`, newRouter);
	console.info(`Injected to router config`);
}

var controller = async() => {
	var tpl = new String(await fs.readFileAsync('./template/controller.js'));
	var res = _.template(tpl)(data);

	await fs.writeFileAsync(`./server/rest/${data.name}.res.js`, res);
	console.info(`./server/rest/${data.name}.res.js` ,'created');

	// add to router
	var router = new String(await fs.readFileAsync('./server/config/router.js'));
	var newRouter = router.replace(`// end config router //please don't remove this line`, `new (require('../rest/${data.name}.res').default)().init(router);\n\t\t// end config router //please don't remove this line`);

	await fs.writeFileAsync(`./server/config/router.js`, newRouter);
	console.info(`Injected to router config`);
}

switch (param[0]) {
	case 'model':
		migrate();
		model();
		break;
	case 'apiController':
		apiController();
		break;
	case 'controller':
		controller();
		break;
	case 'api':
		migrate();
		model();
		apiController();
		break;
	default:
		break;
}
