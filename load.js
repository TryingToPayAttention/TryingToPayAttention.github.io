
const load = () => {
    var posts = ["Post 1", "Post 2", "Post 3"];

    get(posts)
    .then((data) => {
        console.log('we got here!')
        for (i = 0; i < posts.length; i++){

            var post = document.createElement('div')
            post.className = "post"
            document.body.append(post)
    
            var title = document.createElement('h2')
            title.innerHTML = posts[i]
            post.append(title)
    
            var par = document.createElement('p')
            par.innerHTML = data[i]
            post.append(par)
            
            var br = document.createElement('br')
            document.body.append(br)
        }
    })
}

const get = async (posts) => {
    var ret = []
    for (p of posts){
        var url = '/posts/' + p
        var data = await fetch(url).then(response => response.text())
        console.log(data)
        ret.push(data)
    }
    return ret
}

load()