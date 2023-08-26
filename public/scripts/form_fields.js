// Setup the delete button
var portion_delete_buttons = document.getElementsByClassName('portion_delete')
for(var i = 0; i < portion_delete_buttons.length; i++){
    portion_delete_buttons[i].addEventListener('click', deletePortion)
}

/**
*   This function was compiled by Handlebars as an "auto generator" for a new blog-portion-HTML-element.
*   If I EVER change the blog content portion, this HBS generating function must be updated as well.
*/
(function() {
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['blog_content_portion'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
        return parent[propertyName];
        }
        return undefined
    };

return "<div class=\"blog_content_portion\">\r\n\r\n    <select name=\"portion_type\" class=\"portion_type\">\r\n        <option value=\"text\">Text</option>\r\n        <option value=\"divider\">Divider</option>\r\n        <option value=\"image\">Image</option>\r\n        <option value=\"yt_link\">YT Link</option>\r\n        <option value=\"audio\">Audio</option>\r\n    </select>\r\n\r\n    <div class=\"portion_vert_divider\"></div>\r\n\r\n    <textarea name=\"portion_filling\" class=\"portion_filling\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"portion_filling") || (depth0 != null ? lookupProperty(depth0,"portion_filling") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"portion_filling","hash":{},"data":data,"loc":{"start":{"line":13,"column":61},"end":{"line":13,"column":80}}}) : helper)))
    + "</textarea>\r\n\r\n    <div class=\"portion_vert_divider\"></div>\r\n\r\n    <button class=\"portion_delete\" type=\"button\"><i class=\"las la-trash-alt\"></i></button>\r\n\r\n</div>";
},"useData":true});
})();

function addNewPortion(){

    var new_portion = Handlebars.templates.blog_content_portion()
    document.getElementById('new_portion_button').insertAdjacentHTML('beforebegin', new_portion)

    portion_delete_buttons[portion_delete_buttons.length - 1].addEventListener('click', deletePortion)
}

function deletePortion(event){

    var portion = event.currentTarget.parentNode  

    var yesDelete = confirm('Do you agree to deleting this portion?')

    if(yesDelete)
        portion.parentNode.removeChild(portion)

    event.stopPropagation()
}


function getAllPortionData(){

    var all_portions = document.getElementsByClassName('blog_content_portion')

    var all_data = []

    // Then, store it into an array of objects
    for(var i = 0; i < all_portions.length; i++){

        var portion_object = {}

        // Find data
        var my_portion_select = all_portions[i].getElementsByTagName('select')[0]
        var my_portion_filling = all_portions[i].getElementsByTagName('textarea')[0]

        // Set data information
        portion_object['type'] = my_portion_select.value
        if(portion_object.type !== 'divider'){
            portion_object['portion_content'] = my_portion_filling.value
        }

        all_data.push(portion_object)
    }

    return all_data
}

function lockBlogPortions(enable){

    var all_portion_fillings = document.getElementsByClassName('portion_filling')
    var all_portion_types = document.getElementsByClassName('portion_type')

    // ENABLE
    if(enable === 'enable'){

        for(var i = 0; i < all_portion_fillings.length; i++){

            all_portion_fillings[i].removeAttribute('readonly')
        }
        for(var i = 0; i < all_portion_types.length; i++){

            all_portion_types[i].removeAttribute('disabled')
        }
        document.getElementsByClassName('share_post_button')[0].removeAttribute('disabled')
        document.getElementById('new_portion_button').removeAttribute('disabled')
    
    // DISABLE
    }else{

        for(var i = 0; i < all_portion_fillings.length; i++){

            all_portion_fillings[i].setAttribute('readonly', '')
        }
        for(var i = 0; i < all_portion_types.length; i++){

            all_portion_types[i].setAttribute('disabled', '')
        }
        document.getElementsByClassName('share_post_button')[0].setAttribute('disabled', '')
        document.getElementById('new_portion_button').setAttribute('disabled', '')
    }
}

/**
* Takes the data that was input into the fields, and sends a post request to the server
* to make a new blog post
*/
async function newPostBlogPortions(){

    var yesPost = confirm('Are you sure you want to post this to the server?')
    if(!yesPost)
        return

    for (const required of document.getElementsByClassName('container')[0].querySelectorAll("[required]")) {
        if (!required.reportValidity()) {
            alert('Not all required attributes are filled in.')
            return
        }
    }

    const blog_title = document.getElementById('blog_field_title').value

    var send_data = JSON.stringify({

        'title': blog_title,
        'contents': getAllPortionData()
    })
    
    // Send a post request
    try{

        lockBlogPortions()

        var response = await fetch('/blog/new', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            // mode: 'cors',  // This is necessary?
            body: send_data
        })

        if(response.ok){

            window.location.replace(response.url)
        
        }else{

            const server_error = await response.text()

            console.error('The server had an error:', server_error)
            console.error('Bad server response:', response)
            throw `Server error: ${server_error}`
        }
    
    }catch(err){

        lockBlogPortions('enable')

        alert('Error posting the blog data, printed to console!')
        console.error('Error sharing the blog data:', err)
    }
}

/**
* Takes the data that was input into the fields, and sends a post request to the server
* to edit a pre-existing blog post
*/
async function editPutBlogPortions(){

    var yesPost = confirm('Are you sure you want to send this to the server?')
    if(!yesPost)
        return

    for (const required of document.getElementsByClassName('container')[0].querySelectorAll("[required]")) {
        if (!required.reportValidity()) {
            alert('Not all required attributes are filled in.')
            return
        }
    }

    const blog_title = document.getElementById('blog_field_title').value

    var send_data = JSON.stringify({

        'title': blog_title,
        'contents': getAllPortionData()
    })
    
    // Send a post request
    try{

        lockBlogPortions()

        var response = await fetch('/blog/new', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            // mode: 'cors',  // This is necessary?
            body: send_data
        })

        if(response.ok){

            window.location.replace(response.url)
        
        }else{

            const server_error = await response.text()

            console.error('The server had an error:', server_error)
            console.error('Bad server response:', response)
            throw `Server error: ${server_error}`
        }
    
    }catch(err){

        lockBlogPortions('enable')

        alert('Error posting the blog data, printed to console!')
        console.error('Error sharing the blog data:', err)
    }
}