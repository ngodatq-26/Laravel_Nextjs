import Echo from "laravel-echo";


export function connectLaravel(){
    window.Pusher = require('pusher-js')
    window.Echo = new Echo({
        broadcaster: process.env.broadcaster,
        key: process.env.key,
        cluster: process.env.cluster,
        forceTLS: process.env.forceTLS
    })
}
