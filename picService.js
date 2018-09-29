const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const users = require('./users');
import axios from 'axios';

app.use(bodyParser.json());
app.use(cors({ origin: ['http://localhost:3000'] }))

axios.get(`https://api.flickr.com/services/feeds/photos_public.gne?tags=${input}&format=json&nojsoncallback=true`)
