const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const userService = require('./userService');

app.use(bodyParser.json());
app.use(cors({ origin: ['http://localhost:3000'] }))

app.get('/health',(req, res) => res.send('ok'));

app.get('/authenticate-user', (req,res) => {
    const email = req.query.email;
    const password = req.query.password;
    const userId = userService.authenticateUser(email, password);

    if (userId) return res.send({ id: userId });
    return res.status(403).send('either email or password is incorrect');
})

app.get('/userService/:id', (req,res) =>{
    const id = req.params.id;
    const user = userService.findById(id);

    if (user) return res.send(user);
    return res.status(404).send(`user ${id} not found`);
})

app.post('/favorites/:id', (req,res) => {
    const pic = req.body.picture;
    const id = req.params.id;
    
    userService.addToFavorites(pic, id)
    res.send('Saved to favorites successfully')
})

app.listen(8080, function(){
    console.log(`http://localhost:${this.address().port}`);
})