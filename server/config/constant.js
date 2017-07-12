export default class AppConstant {
	static env = 'development';


	static init() {
		let env = process.env.NODE_ENV;
		if(env != null) this.env = env;
	}
}
