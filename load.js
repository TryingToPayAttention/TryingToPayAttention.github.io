
const load = async () => {

    var posts = ["Post 1", "Post 2", "Post 3"]
    for (p of posts){
        var post = document.createElement('div')
        post.className = "post"
        document.body.append(post)

        var title = document.createElement('h2')
        title.innerHTML = p
        post.append(title)

        var fetched = await fetch('/posts/' + p)
        /*
        .then(response => response.text())
        .then((data) => {
            var par = document.createElement('p')
            par.innerHTML = data
            post.append(par)
        })
        */
       var text = await fetched.response.text
       var par = document.createElement('p')
        par.innerHTML = text
        post.append(par)
    
        var br = document.createElement('br')
        document.body.append(br)
       
    }
}

load()