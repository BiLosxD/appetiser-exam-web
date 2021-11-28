module.exports = {
    apps: [
        {
            name: 'Appetiser Exam BiLos',
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start'
        }
    ]
}
