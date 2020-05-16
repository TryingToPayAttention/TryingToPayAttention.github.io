
const load = () => {

    var posts = ["Post 1", "Post 2", "Post 3"]
    for (p in posts){

        var post = document.createElement('div')
        post.className = "post"
        document.body.append(post)

        var title = document.createElement('h2')
        title.innerHTML = p
        post.append(title)

        fetch('/posts/' + p)
        .then(response => response.text())
        .then((data) => {
            var par = document.createElement('p')
            par.innerHTML = data
            post.append(par)
        })
    }
}

load()