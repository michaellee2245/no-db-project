const memoryStore = [{
    
    "id":1,
    "firstName": "Mike",
    "email": "mike@gmail.com",
    "password": "1234",
    "fav": [],
    },
    {
    "id":2,
    "firstName": "Jimmy",
    "email": "jimmy@gmail.com",
    "password": "5678",
    "fav": [],
    },
    {
    "id":3,
    "firstName": "Bethany",
    "email": "bethany@gmail.com",
    "password": "9897",
    "fav": [],
    }]

function authenticateUser(email, password) {
    const user = memoryStore.find(user => user.email === email);
    if(!user) return null;
    if(user.password === password) return user.id;
    return null;
    }
function findById(id) {
        const user = memoryStore.find(user => Number(user.id) === Number(id));
        if(!user) return null;
        return user;
}
function addToFavorites(pic, id) {
    console.log(memoryStore[id].fav)
    memoryStore[id - 1].fav = [...memoryStore[id - 1].fav, pic];
}

module.exports = {
    authenticateUser,
    findById,
    addToFavorites
}