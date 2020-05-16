
const load = async () => {

    var posts = ["Post 1", "Post 2", "Post 3"]
    for (p of posts){
        console.log("1we are here " + p)

        var post = document.createElement('div')
        post.className = "post"
        document.body.append(post)


        console.log("3we are here " + p)

        var title = document.createElement('h2')
        title.innerHTML = p
        post.append(title)

        console.log("5we are here " + p)

        var url = '/posts/' + p
        var data = Promise.resolve(fetch(url).then(response => response.text()) )
        alert(data) 

        console.log("7we are here " + p)

        var par = document.createElement('p')
        par.innerHTML = "lol"
        post.append(par)
        

        console.log("9we are here " + p)
    
        var br = document.createElement('br')
        document.body.append(br)

        console.log("10we are here " + p)
       
    }
}


load()