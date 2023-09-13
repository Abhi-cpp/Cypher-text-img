
function getKey(password) {
    let key = '_';
    for (let i = 0; i < password.length; i++)
        key ^= (password.charCodeAt(i));
    return key;
}

export default getKey;