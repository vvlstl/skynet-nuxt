export default defineNuxtPlugin({
    hooks: {
        'app:mounted'() {
            setTimeout(() => {
                document.body.classList.add('body', 'body--loaded')
            }, 100);
        },
    },
})
