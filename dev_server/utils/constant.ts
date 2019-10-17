var appConstant = {
  env  : process.env.NODE_ENV,
  isDev: false
}

if (!appConstant.env) {
  appConstant.env = 'production'
} else {
  if (appConstant.env === 'development') appConstant.isDev = true;
}

export default appConstant;
