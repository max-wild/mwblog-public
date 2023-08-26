const express = require('express')
const router = express.Router()

var randos = require("../jsons/randos.json")

// Face easter eggs
router.get('/', (req, res, next) => {

    const url_name = req.secretParam.toLowerCase()

    if(url_name === 'max1')
        return res.status(308).redirect('/max')
    
    if(url_name === 'taylorswift')
        return res.status(308).redirect('/taylor')

    if(url_name === "jojo" || url_name === "dio" || url_name === "jjba")
        return res.status(308).redirect('/jotaro')

    if(randos[url_name]){

        return res.status(200).render('secret/random', {

            'layout': null,
            'location': randos[url_name],
            'jotaro': url_name === 'jotaro'
        })  
    }

    next()
})


// WORROS
router.get('/', (req, res, next) => {

    if(req.secretParam.toLowerCase() === 'worros'){

        if(req.secretParam !== 'WORROS'){
            return res.status(507).redirect('/WORROS')  // Ghastly error code
        }

        return res.status(507).render('secret/VOID', {

            'layout': null
        })
    }

    next()
})


// Salvation
router.get('/', (req, res, next) => {

    if(req.secretParam.toLowerCase() === 'salvation')
        return res.status(404).render('secret/salvation', {

            'layout': null,
            'invalid_url': req.secretParam
        })  // Cannot GET /salvation
    else
        next()
})


// Calliope


// Dunja ?


// Then, make some *more* secrets which won't be available to public eye...

// DIPPER

// idk something


module.exports = router
