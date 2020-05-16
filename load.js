
const load = async () => {

    var posts = ["Post 1", "Post 2", "Post 3"]
    for (p of posts){
        console.log("1we are here " + p)

        var post = document.createElement('div')
        console.log("2we are here " + p)
        post.className = "post"
        console.log("3we are here " + p)
        document.body.append(post)
        console.log("4we are here " + p)

        var title = document.createElement('h2')
        console.log("5we are here " + p)
        title.innerHTML = p
        console.log("6we are here " + p)
        post.append(title)
        console.log("7we are here " + p)

        var url = '/posts/' + p
        var data = await fetch(url).then(response => response.text())  
        var par = document.createElement('p')
        par.innerHTML = data
        post.append(par)
        console.log("8we are here " + p)

        console.log("9we are here " + p)
    
        var br = document.createElement('br')
        document.body.append(br)
       
    }
}


load()