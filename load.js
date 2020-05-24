
const load = () => {
    var posts = ["3", "2", "1"]

    get(posts)
    .then((data) => {
        for (i = 0; i < posts.length; i++){

            // Add a break
            document.body.append(document.createElement('br'))

            // Make the post element
            var post = document.createElement('div')
            if(data[i].length > 2000){ // If it's over 2000 chars, hide some content
                post.className = "post fade"
            } else {
                post.className = "post"
            }
            document.body.append(post)

            // Parse and process the text
            for (d of data[i].split(/\r?\n/)) { 
                // Title of post
                if (d.slice(0, 2) === "# "){
                    var el = document.createElement('h1')
                    var link = document.createElement('a')
                    link.href = "#" // This can link to the single blog post
                    link.innerHTML = d.slice(2)
                    el.append(link)
                    post.append(el)
                }
                // Article Title Metadata
                else if (d.slice(0, 2) === "$ "){
                }
                // Date published
                else if (d.slice(0, 2) === "& "){
                    var el = document.createElement('h6')
                    el.innerHTML = d.slice(2)
                    post.append(el)
                }
                // Section Header
                else if (d.slice(0, 4) === "### "){
                    var el = document.createElement('h3')
                    el.innerHTML = d.slice(4)
                    post.append(el)
                }
                // Subsection Header
                else if (d.slice(0, 3) === "## "){
                    var el = document.createElement('h2')
                    el.innerHTML = d.slice(3)
                    post.append(el)
                }
                // Media
                else if (d.slice(0, 2) === "! "){
                }
                // Paragraph
                else{
                    var el = document.createElement('p')
                    el.innerHTML = d
                    post.append(el)

                    var i
                    var last2 = 0
                    //Check to see if a character is {
                    for(i=0; i < d.length; i++){
                        //if (d[i] === '{'){
                            //Append the text that came before
                            //var node = document.createTextNode(d.slice(last2, i))
                            //el.append(node)

                            // Search for the }
                            //var j
                            //loop2:
                            //for(j = i ; j < d.length; j++){
                                // When you find it, append it
                                //if(d[j] === '}'){
                                    //var sup = document.createElement("sup")
                                    //sup.innerHTML = d.slice(i+1, j)
                                    //el.append(sup)
                                    //break loop2
                                //}
                            //}
                            // Set to the character after the }
                            //last2 = j + 1
                            //i = j
                        //}
                    }
                    // If the post doesnt end in a footnote, append text that you have not gotten to 
                    //if(last2 != i){
                        //var node = document.createTextNode(d.slice(last2))
                        //el.append(node)
                    //}
                    
                    // Append the full post to the page

                    
                }
            }
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