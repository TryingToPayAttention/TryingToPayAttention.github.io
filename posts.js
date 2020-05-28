const load = () => {
  var posts = ["3", "2", "1"]

  get(posts).then((data) => {

    for (i = 0; i < posts.length; i++) {
      // Create a container for the posts
      var postContainer = document.createElement("div")
      postContainer.className = "postContainer"
      document.body.append(postContainer)

      // Add a break
      postContainer.append(document.createElement("br"))

      // Make the post element
      var post = document.createElement("div")
      if (data[i].length > 2000) {
        // If it's over 2000 chars, hide some content
        post.className = "post fade"
      } else {
        post.className = "post"
      }
      postContainer.append(post)

      // Parse and process the text
      for (d of data[i].split(/\r?\n/)) {
        // Title of post
        if (d.slice(0, 2) === "# ") {
          var el = document.createElement("h1")
          el.className = "title"
          el.innerHTML = d.slice(2)
          post.append(el)

          el.onclick = function (event) {
            // Change the URL
            // Get rid of all the other posts
            // Change this post so that it is expanded
            console.log("title clicked: " + event.target.innerHTML)
            var posts = document.getElementsByClassName("postContainer")
            var postList = document.getElementsByClassName("post")
            //var saved
            for (p of postList){
              var t = p.getElementsByClassName("title")
              if (t[0].innerHTML != event.target.innerHTML){
                p.style.display = "none" // Turn off posts that aren't of the clicked title
              } else {
                p.className = "post" // Make sure this post is not faded
                //saved = p
              }
              posts[0].innerHTML = ""
              posts[0].append(saved)
            }
          }
        }
        // Article Title Metadata
        else if (d.slice(0, 2) === "$ ") {
        }
        // Date published
        else if (d.slice(0, 2) === "& ") {
          var el = document.createElement("h6")
          el.innerHTML = d.slice(2)
          post.append(el)
        }
        // Section Header
        else if (d.slice(0, 4) === "### ") {
          var el = document.createElement("h3")
          el.innerHTML = d.slice(4)
          post.append(el)
        }
        // Subsection Header
        else if (d.slice(0, 3) === "## ") {
          var el = document.createElement("h2")
          el.innerHTML = d.slice(3)
          post.append(el)
        }
        // Media
        else if (d.slice(0, 2) === "! ") {
        }
        // Paragraph
        else {
          var el = document.createElement("p")

          var ind
          last = 0
          //Check to see if a character is {
          for (ind = 0; ind < d.length; ind++) {
            if (d[ind] === "{") {
              //Append the text that came before
              var node = document.createTextNode(d.slice(last, ind))
              el.append(node)

              // Search for the }
              var j;
              for (j = ind + 1; j < d.length; j++) {
                // When you find it, append it
                if (d[j] === "}") {
                  // Append the superscript
                  var sup = document.createElement("sup")
                  sup.className = "superscript"
                  sup.innerHTML = d[ind + 1]
                  el.append(sup);

                  // Append the note to the modal content
                  // Make the footnotes modal
                  var mod = document.createElement("div")
                  mod.className = "modal"
                  mod.id = "modal_" + d[ind + 1]
                  // Make the contents box
                  var content = document.createElement("div")
                  content.className = "modal-content"
                  // Make the x exit button
                  var span = document.createElement("span")
                  span.className = "close"
                  span.innerHTML = "&times;"
                  content.append(span)
                  // Append the note to the content box
                  var note = document.createElement("p")
                  note.innerHTML = d.slice(ind + 1, j)
                  content.append(note)
                  // Append modal content in backwards order: content to modal, modal to page
                  mod.append(content)
                  postContainer.append(mod)

                  // Setup callback on superscript
                  sup.onclick = function (event) {
                    enclosedSup = event.target
                    var modalName = "modal_" + enclosedSup.innerHTML
                    var enclosedMod = document.getElementById(modalName)

                    enclosedMod.style.display = "block";

                    span.onclick = function (event2) {
                      enclosedMod2 = event2.target.
                      enclosedMod2.style.display = "none"
                    }

                    window.onclick = function (event3) {
                      if (event3.target == enclosedMod) {
                        enclosedMod.style.display = "none"
                      }
                    }
                  }

                  break;
                }
              }
              // Set to the character after the }
              last = j + 1;
              ind = j
            }
          }
          // If the post doesnt end in a footnote, append text that you have not gotten to
          if (last != ind) {
            var node = document.createTextNode(d.slice(last))
            el.append(node)
          }

          // Append the full paragraph to the page
          post.append(el)
        }
      }
    }

    // Add some space at the bottom
    postContainer.append(document.createElement("br"))
    postContainer.append(document.createElement("br"))
    postContainer.append(document.createElement("br"))
  })
}

const get = async (posts) => {
  var ret = [];
  for (p of posts) {
    var url = "/posts/" + p;
    var data = await fetch(url).then((response) => response.text());
    ret.push(data);
  }
  return ret;
}

load()
