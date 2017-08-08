var env = process.env.NODE_ENV;
if(!env) env = 'development'

console.log(env+" mode");

if(env == 'development') {
	require('./server/app').default.init();
} else {
	require('./dist/app').default.init();
}
