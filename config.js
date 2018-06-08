let config = {
    db: {
        uri: 'mongodb://localhost/todos',
        idBeginWith: 1000,
        userName: 'admin',
        userPwd: '*******'
    }
}


export {
    config,
    config as
    default
}