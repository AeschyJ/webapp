const Prefix = 'http://127.0.0.1:5000/api/'
const apis = {
    users: Prefix + 'users',
    posts: Prefix + 'posts',
    login: Prefix + 'users/signIn',
    newest: Prefix + 'posts/newest/none',
    urgentNewest: Prefix + 'posts/newest/true',
    normalNewest: Prefix + 'posts/newest/false',
    easyview: Prefix + 'posts/easyview',
}
export default apis