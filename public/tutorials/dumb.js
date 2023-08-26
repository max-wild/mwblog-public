var pageHead = document.head

pageHead.innerHTML += '<link rel="preconnect" href="https://fonts.googleapis.com">'
pageHead.innerHTML += '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
pageHead.innerHTML += '<link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+39&display=swap" rel="stylesheet"></link>'

pageHead.innerHTML += '<style>p,h1,h2,h3,h4,span,code,a,div{font-family:"Libre Barcode 39";}</style>'

var most_text = [

    document.getElementsByTagName("p"),
    document.getElementsByTagName("h1"),
    document.getElementsByTagName("h2"),
    document.getElementsByTagName("h3"),
    document.getElementsByTagName("h4"),
    document.getElementsByTagName("a"),
    document.getElementsByTagName("b"),
    document.getElementsByTagName("li"),
    document.getElementsByTagName("input")
]

function replace_font(node_list){

    for(var i = 0; i < node_list.length; i++){

        node_list[i].setAttribute("style", 'font-family:"Libre Barcode 39";')
    }
}

most_text.forEach(element => replace_font(element))
