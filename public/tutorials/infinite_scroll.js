
const container = document.getElementsByClassName("container")[0]
var images_loading = false

function load_images(numImages = 20){

    var i = 0

    while(i < numImages){

        // fetch(`https://placekitten.com/300/300?image=${Math.floor(Math.random() * 16)}`)
        fetch("https://dog.ceo/api/breeds/image/random")
            .then(response => response.json())
            .then(data => {

                const img = document.createElement("img");
                img.src = data.message.toString()
                container.appendChild(img)
            })
        
        i++
    }

    images_loading = false
}

load_images();

// Looking at scroll properties, we can workout a formula. If the sum of 
// scrollY and innerHeight is greater or equal to the scrollHeight, it means we have 
// reached the end of the document and we need to load more images:
window.addEventListener("scroll", () => {

    // console.log(" == window.scrollY:", window.scrollY)
    // console.log(" == window.innerHeight:", window.innerHeight)
    

    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight){
        
        if(!images_loading){
            console.log("  -- Loading images!")
            images_loading = true
            load_images()
        }
    }
})
