const {createProxyMiddleware} = require ('http-proxy-middleware')

module.exports = app => {
    app.use(
        createProxyMiddleware('/api/auth/login',{
            target : 'http://localhost:8000',
            changeOrigin:true
        }),
        createProxyMiddleware('/api/home/search',{
            target : 'http://localhost:8000',
            changeOrigin:true
        })
    )
}