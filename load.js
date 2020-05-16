
const load = () => {
    var posts = ["3", "2", "1"]

    get(posts)
    .then((data) => {
        for (i = 0; i < posts.length; i++){

            // Add a break
            document.body.append(document.createElement('br'))

            // Make the post element
            var post = document.createElement('div')
            if(data[i].length > 2000){ // If it's over 2000 chars, truncate
                post.className = "post fade"
            } else {
                post.className = "post"
            }
            document.body.append(post)

            // Parse adn process the text
            for (d of data[i].split(/\r?\n/)) { 
                // Title of post
                if (d.slice(0, 10) === "##########"){
                    var el = document.createElement('h1')
                    el.innerHTML = d.slice(11)
                    post.append(el)
                }
                // Date published
                else if (d.slice(0, 9) === "#########"){
                    var el = document.createElement('h6')
                    el.innerHTML = d.slice(10)
                    post.append(el)
                }
                // Header 4
                else if (d.slice(0, 4) === "####"){
                    var el = document.createElement('h4')
                    el.innerHTML = d.slice(4)
                    post.append(el)
                }
                // Header 3
                else if (d.slice(0, 3) === "###"){
                    var el = document.createElement('h3')
                    el.innerHTML = d.slice(3)
                    post.append(el)
                }
                // Header 2
                else if (d.slice(0, 2) === "##"){
                    var el = document.createElement('h2')
                    el.innerHTML = d.slice(2)
                    post.append(el)
                }
                // Paragraph
                else{
                    var el = document.createElement('p')
                    el.innerHTML = d
                    post.append(el)
                }
            }

            // Add the post links for expanding etc
            var links = document.createElement('div')
            links.className = "postlinks"
            document.body.append(links)
            var link = document.createElement('a')
            link.href = "#"
            link.innerHTML = "expand"
            links.append(link)
        }

        // Add some space at the bottom
        document.body.append(document.createElement('br'))
        document.body.append(document.createElement('br'))
        document.body.append(document.createElement('br'))
    })
}

const get = async (posts) => {
    var ret = []
    for (p of posts){
        var url = '/posts/' + p
        var data = await fetch(url).then(response => response.text())
        ret.push(data)
    }
    return ret
}

load()