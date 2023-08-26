//*********************************
//
// SETUP
//
//*********************************
var express = require('express')
var exphbs = require('express-handlebars')
const expressSSLify = require('express-sslify')
const method_override = require("method-override")
require('dotenv').config()  // Load our process.env variables

const { keep_awake, setUpBlogBoxHBS } = require('./helper.js')
const blogRouter = require('./routes/blog.js')
const secretsRouter = require('./routes/secrets.js')

const PORT = process.env.PORT || 3001
var app = express()


//*********************************
// TODO section:
// 


// Todo: Make the edit save right!


// Now-- need to make ACCESSING the database functionality:

    // Making blog contents MORE than just text!!!
        // i.e. image, text, divider, and YouTube video
    // TODO: obfuscate everything

    // Then... start logging in functionality
        // Once this is done, it's ready to CONNECT WITH HEROKU!!! AHHHH!

//*********************************
//*********************************

/**
*    Setting up production / development environment
*/
if(process.env.NODE_ENV === 'production'){

    console.log('Assuming it\'s a hosted app--rerouting to https')
    app.use(expressSSLify.HTTPS({ trustProtoHeader: true }))  // Enforces https is used
    
} else{

    // Localhost
    console.log('Running in development environment')
}


/**
*    Setting up the view engine
*/
const hbs = exphbs.create({

    'defaultLayout': 'main',  // Referencing views/layouts/main.handlebars
    'helpers': {
        // ifEquals is not original, taken from SOURCE (on 2023-03-26): 
        // https://stackoverflow.com/questions/34252817/handlebarsjs-check-if-a-string-is-equal-to-a-value
        ifEquals: function(arg1, arg2, options) {
           return (arg1 === arg2) ? options.fn(this) : options.inverse(this)},
        generateImage: function(image_content_string) {
            // const img_info = image_content_string.split(' ')
            // https://stackoverflow.com/questions/16261635/javascript-split-string-by-space-but-ignore-space-in-quotes-notice-not-to-spli
            const img_info = image_content_string.match(/(?:[^\s"]+|"[^"]*")+/g) 
            
            // Img is formatted like [src] [description] [width] [height]
            return `<img src="${img_info[0]}" alt="${img_info[1]}" width="${img_info[2]}" height="${img_info[3]}">` }
    }
})
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')



//*********************************
//
//  ROUTES
//
//*********************************

app.use(express.json()) // This was my problem for the longest gd time
app.use(express.urlencoded({ extended: false }))  // Let's us see information in the body
app.use(express.static('public'))
app.use(method_override("_method"))  // Allows for put/delete requests


/**
*    ROUTERS
*/
app.use('/blog', blogRouter) 


app.get(['/', '/1'], async function(req, res, next){

    res.status(200).render('main_pages/all_blog_posts')
})


// Get all other numbers too
// app.get(2, 3, so on etc.)




// Catch any secrets
app.use('/:secret', (req, res, next) => {

    req.secretParam = req.params.secret
    secretsRouter(req, res, next)
})


app.get("*", function(req, res, next){

    // res.status(200).render("main_pages/all_blog_posts")

    res.status(404).send("Ruh roh!")
})


//*********************************
//
// LISTENER
//
//*********************************
app.listen(PORT, function (err) {

    if (err) {
        console.log("Error!:", err)
        throw err;
    
    }else{

        console.log("== Server listening on port", PORT);
    }
    
})


keep_awake()  // Keeps the server running indefinitely
