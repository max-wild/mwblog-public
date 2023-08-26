// HANDLEBARS Helpers
const Handlebars = require('handlebars')

Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this)
})



// Helper functions (functions used in server.js and routes/blog.js)
const assert = require('assert')


// https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site
function time_since(date){

    if (typeof date !== 'object') {
        date = new Date(date)
    }
    
    var seconds = Math.floor((new Date() - date) / 1000)
    var intervalType

    var interval = Math.floor(seconds / 31536000)

    if (interval >= 1) {
        intervalType = 'year'

    } else {
        interval = Math.floor(seconds / 2592000)
        if (interval >= 1) {
            intervalType = 'month'

        } else {
            interval = Math.floor(seconds / 86400)
            if (interval >= 1) {
                intervalType = 'day'

            } else {
                interval = Math.floor(seconds / 3600)
                if (interval >= 1) {
                    intervalType = "hour"

                } else {
                    interval = Math.floor(seconds / 60)
                    if (interval >= 1) {
                        intervalType = "minute"

                    } else {
                        interval = seconds
                        intervalType = "second"
                    }
                }
            }
        }
    }

    if (interval > 1 || interval === 0) {
        intervalType += 's'
    }

    return interval + ' ' + intervalType + ' ago'
}


function content_preview_raw(content){

    var preview_html = ''
    const max_words = 40
    var word_count = 0  // We want to keep it under the max word count
    var writing_in_p = false  // Used to know if we're currently in a <p> tag

    for(var i = 0; i < content.length; i++){

        if(content[i].type === 'text'){

            if(word_count >= max_words)
                continue
            
            if(!writing_in_p){
                preview_html += '<p>'
                writing_in_p = true
            }else{
                preview_html += '<br><br>'
            }

            // ADD TEXT CONTENT and UPDATE WORD COUNT
            var words_arr = content[i].portion_content.toString().split(' ').slice(0, max_words - word_count)
            word_count += words_arr.length
            preview_html += words_arr.join(' ') + ' '
            
            if(word_count >= max_words){
                preview_html += '</p>'
                writing_in_p = false
            }
        
        }else if(content[i].type === 'image'){

            // Beginning accounting for <p> tag
            if(writing_in_p){
                preview_html += '</p>'
            }

            const img_info = content[i].portion_content.split(' ')

            // if(img_info[1].toLowerCase() === 'default'){
            //     // Let the CSS handle resizing
            // }else{
            //     // Manual resizing (?)
            // }

            // Okay, FOR NOW the max-width of the img will be hardcoded to 752.
                // I may look into using CSS/js shenanigans to do automatic
                // formatting or lazyloading

            const max_width_px = 752
            const max_height_px = 376
            const pic_ratio = Math.min(max_width_px / parseInt(img_info[2]), max_height_px / parseInt(img_info[3]))

            preview_html += 
                `<div class="blog_box_image_preview"> ` +
                `<img src="${img_info[0]}" alt="${img_info[1]}" width="${parseInt(img_info[2]) * pic_ratio}" ` +
                `height="${parseInt(img_info[3]) * pic_ratio}" />` +
                `</div>`

            // End accounting for <p> tag
            if(writing_in_p){
                preview_html += '<p>'
            }
        }
    }

    // If we reach the end without closing the p tag, then close it
    if(writing_in_p){
        console.log('Strange edge case behavior: wordcount of an entire blogpost is < 40')
        preview_html += '</p>'
    }

    return preview_html
}


/**
 * Pass in an array of leaned blog_posts (objects), and format the objects to have blogBox properties
 */
function setUpBlogBoxHBS(blog_posts){

    assert(Array.isArray(blog_posts))  // Assert this is an object

    for(var bindex = 0; bindex < blog_posts.length; bindex++){

        blog_posts[bindex].time_since_post = time_since(blog_posts[bindex].created_on)
        blog_posts[bindex].content_preview_raw = content_preview_raw(blog_posts[bindex].contents)
    }

    return blog_posts
}


/**
 * Pass in a BlogPost (an object), and format it to be a good blog post
 */
function setUpBlogPostPageHBS(blogPost){

    assert(typeof blogPost === 'object')

    blogPost.time_since_post = time_since(blogPost.created_on)

    return blogPost
}


/**
 * Pass in a BlogPost (an object), and format it to be edited
 */
function setUpBlogEditingPageHBS(blogPost){

    assert(typeof blogPost === 'object')

    blogPost.blog_field_title = blogPost.title
    blogPost.ff_text_contents = blogPost.contents
    blogPost.cancel_location = `/blog/${blogPost.slug}`

    return blogPost
}


function keep_awake(){

    // Every 10 minutes, gets a GET request

    var http = require("http")
    setInterval(function() {
        http.get("http://maxwild.herokuapp.com")
    }, 600000) // every 10 minutes (600000)
}


module.exports = {

    keep_awake,
    setUpBlogBoxHBS,
    setUpBlogPostPageHBS,
    setUpBlogEditingPageHBS
}
