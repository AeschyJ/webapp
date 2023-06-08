const Prefix = 'http://127.0.0.1:5000/api/'
const apis = {
    users: Prefix + 'users',
    posts: Prefix + 'posts',
    login: Prefix + 'users/signIn',
    newest:{
        all: Prefix + 'posts/newest/none',
        urgent: Prefix + 'posts/newest/true/1',
        normal: Prefix + 'posts/newest/false/1',
    },
    easyview: Prefix + 'posts/easyview',
}
export default apis