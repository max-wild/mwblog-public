const express = require('express')
const router = express.Router()
const multer = require('multer')  // Used for handling file uploads


const path = require('path')
const fs = require('fs')

// File uploaded
const TEMP_UPLOADS_PATH = path.join(__dirname, 'temp_uploads')
const upload = multer({ dest: TEMP_UPLOADS_PATH})
const MAX_UPLOAD_SIZE = 200 * 1024 * 1024  // 20 MB, for audio / image files

const { setUpBlogPostPageHBS, setUpBlogEditingPageHBS } = require('../helper.js')






/****************************************************
 * 
 * Managing Blogpost CRUD
 * 
 ****************************************************/


router.get('/', (req, res) => {

    res.status(308).redirect('/')  // Blog main page is always just the root
})


// As far as now, I don't think I'll write blog posts in an editor. I think I'll write them
// just in html/css and deal with it as it happens

// ... Maybe I can try taking a react.js class to learn how to make a blog editor? euheuheuheuhehu...
router.get('/new', (req, res, next) => {

    next()
})


// Remember, I'll have to authenticate too
router.post('/new', (req, res, next) => {

    next()

})



router.get('/:slug', async (req, res, next) => {

    next()
})


router.get('/edit/:id', async (req, res, next) => {

    next()
})


// EDIT A BLOG POST
router.put('/edit/:id', async (req, res, next) => {

    next()

})


router.put('/hide/:id', async (req, res, next) => {

    next()
})



/****************************************************
 * 
 * Managing File Uploads
 * 
 ****************************************************/

// Showing the upload media page
router.get('/upload_media', (req, res, next) => {

    next()
})

function get_file_extension (filename) {

    if(!filename || typeof filename !== 'string' 
        || !filename.includes('.')) return ''

    return filename.split('.').pop().toLowerCase()
}

function is_valid_filename (filename) {

    const type = get_file_extension(filename)
    
    const validTypes = ['png', 'jpg', 'jpeg', 'gif', 
                        'mp3', 'aac', 'ogg', 'flac', 'alac',
                        'm4a', 'wav']

    if (validTypes.indexOf(type) === -1) {
      return false
    }
    return true
}




router.post('/upload_media', upload.single('uploaded_file'), (req, res, next) => {

    next()
})


/**
 * Used just to see the filenames of what's currently up!
 */
router.get('/upload_media/:year', (req, res, next) => {

    next()
})





module.exports = router
