
const load = async () => {
    var posts = ["Post 1", "Post 2", "Post 3"];

    const data = await get(posts);

    for (i = 0; i < posts.length; i++){
        p = posts[i];

        var post = document.createElement('div')
        post.className = "post"
        document.body.append(post)

        var title = document.createElement('h2')
        title.innerHTML = p
        post.append(title)

        var par = document.createElement('p')
        par.innerHTML = "lol"
        post.append(par)
        
        var br = document.createElement('br')
        document.body.append(br)
    }
}

const get = async (posts) => {
    var ret = []
    for (p of posts){
        var url = '/posts/' + p
        var data = await fetch(url).then(response => response.text())
        console.log(data)
        ret.push(data)
    }
}

load()