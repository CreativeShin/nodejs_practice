const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

app.use((req, res, next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err)=>{
        if(err){
            console.log('Unable to append the file to the log!');
        }
    });
    next();
});

app.use((req, res, next)=>{
    res.render('maintenance');
});

app.use(express.static(__dirname + '/public'));

app.set('view engine','hbs');

app.get('/', (req, res)=>{
    res.render('home', {
        pageTitle: "Home Page!",
        welcomeMessage: 'Welcome to home!'
    });
});

app.get('/about', (req, res)=>{
    res.render('about',{
        pageTitle: 'about page'
    });
});


app.listen(port, ()=>{
    console.log(`Server is running on the port ${port}`);
}); 