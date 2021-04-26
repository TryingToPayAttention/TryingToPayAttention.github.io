///////////////////////////////////////
// Globals
///////////////////////////////////////

const MAIN_URL = "http://www.tryingtopayattention.com/"
const POSTS_PER_PAGE = 5
const LONG_POST_LENGTH = 1300
const LONG_POST_IMAGES = 2

const ITALICS_CLASS = 'italics'
const SUPERSCRIPT_CLASS = 'superscript'


///////////////////////////////////////
// Routing
///////////////////////////////////////

const listen = () => {
  window.addEventListener("hashchange", route)
}

const route = () => {
  var hash = window.location.hash.slice(1)
  var hInt = parseInt(hash)

  if (hash == "") {
    viewRecent(1)
  } else if (Number.isInteger(hInt) && (hInt > 0)) {
    viewRecent(hInt)
  } else if (hash == "about") {
    viewAbout()
  } else {
    viewPost(hash)
  }
}


///////////////////////////////////////
// Views
///////////////////////////////////////

const viewRecent = (num) => {
  getRecents(num).then(([posts, more]) => {
    cleanView()
    for (post of posts) {
      appendBreaks(1)
      appendPost(post, true)
    }
    appendBreaks(1)
    appendNavigation(num, more)
    appendBreaks(1)
  })
}

const viewPost = (urlTitle) => {
  getPost(urlTitle).then((post) => {
    cleanView()
    appendBreaks(1)
    appendPost(post, false)
    appendBreaks(3)
  })
}

const viewAbout = () => {
  getAbout().then((about) => {
    cleanView()
    appendBreaks(1)
    appendPost(about, false)
    appendBreaks(3)
  })
}

const cleanView = () => {
  clearPosts()
  clearNavigation()
  clearBreaks()
  scrollToTop()
}


///////////////////////////////////////
// Get text
///////////////////////////////////////

const getRecents = async (num) => {
  const all = await fetch("text/posts.txt").then((response) => response.text())
  const posts = all.split(/##########/)
  const first = (num - 1) * POSTS_PER_PAGE
  const last = (num * POSTS_PER_PAGE) - 1 // last might be greater than the actual last post
  const more = (posts.length - 1 > last)
  return [posts.slice(first, last + 1), more]
}

const getAbout = async () => {
  var about = await fetch("text/about.txt").then((response) => response.text())
  return about
}

const getPost = async (urlTitle) => {
  var all = await fetch("text/posts.txt").then((response) => response.text())
  const posts = all.split(/##########/)
  for (post of posts) {
    const lines = post.split(/\r?\n/)
    for (line of lines) {
      if (isTitle(line)) {
        if (getURL(line.slice(2)) == urlTitle) {
          return post
        }
        break
      }
    }
  }
  var notFound = await fetch("text/notfound.txt").then((response) => response.text())
  return notFound
}


///////////////////////////////////////
// Rendering
///////////////////////////////////////

const scrollToTop = () => {
  window.scrollTo(0, 0)
}

const clearBreaks = () => {
  var brs = document.getElementsByTagName("br")
  for (br of brs) {
    br.style.display = "none"
  }
}

const clearPosts = () => {
  var posts = document.getElementsByClassName("post")
  for (post of posts) {
    post.style.display = "none"
  }
}

const clearNavigation = () => {
  var els = document.getElementsByClassName("navigation")
  for (el of els) {
    el.style.display = "none"
  }
}

const appendBreaks = (num) => {
  for (i = 0; i < num; i++) {
    document.body.append(document.createElement("br"))
  }
}

const appendPost = (text, shorten) => {
  var post = document.createElement("div")
  if (isLongPost(text) && shorten) {
    post.className = "post fade"
  } else {
    post.className = "post"
  }
  parseAndFill(post, text)
  document.body.append(post)
}

const appendNavigation = (num, more) => {
  var el = document.createElement("p")
  el.className = "navigation"

  if(num != 1){
    var left = document.createElement("a")
    left.innerHTML = "<<<"
    var nextNum = num - 1
    if (nextNum == 1){
      left.href = MAIN_URL
    } else{
      left.href = MAIN_URL + "#" + nextNum.toString()
    }
    el.append(left)
  } else{
    el.append(document.createTextNode("<<<"))
  }

  
  if(more == true){
    var right = document.createElement("a")
    right.innerHTML = ">>>"
    var nextNum = num + 1
    right.href = MAIN_URL + "#" + nextNum.toString()
    el.append(right)
  } else{
    el.append(document.createTextNode(">>>"))
  }
  

  document.body.append(el)
}


///////////////////////////////////////
// Processing
///////////////////////////////////////

const isLongPost = (post) => {
  long = (post.length >= LONG_POST_LENGTH)
  images = hasManyImages(post)
  return long || images
}

const hasManyImages = (post) => {
  count = 0
  const lines = post.split(/\r?\n/)
  for (line of lines) {
    if (isImage(line)) {
      count++
      if (count >= LONG_POST_IMAGES) {
        return true
      }
    }
  }
  return false
}

const getURL = (title) => {
  title = title.toLowerCase()
  title = title.replace(/\s/g, "-")
  title = title.replace(/[^a-z\-]/g, '')
  return title
}

const parseAndFill = (post, text) => {
  const lines = text.split(/\r?\n/)
  for (line of lines) {
    if (isTitle(line)) {
      var el = createTitle(line.slice(TITLE.length + 1))
      post.append(el)
    }
    else if (isDate(line)) {
      var el = create("h6", "date", line.slice(DATE.length + 1))
      post.append(el)
    }
    else if (isFootnote(line)) {
      var el = create("h6", "footnote", line.slice(FOOT_NOTE.length + 1))
      post.append(el)
    }
    else if (isSection(line)) {
      var el = create("h2", "section", line.slice(SECTION.length + 1))
      post.append(el)
    }
    else if (isSubSection(line)) {
      var el = create("h3", "subsection", line.slice(SUB_SECTION.length + 1))
      post.append(el)
    }
    else if (isImage(line)) {
      var el = createImage(line.slice(IMAGE.length + 1))
      post.append(el)
    }
    else if (isBlockQuote(line)) {
      var el = createBlock("p", "quote", line.slice(BLOCK_QUOTE.length + 1))
      post.append(el)
    }
    else {
      var el = createBlock("p", "paragraph", line)
      post.append(el)
    }
  }
}

const create = (type, name, text) => {
  var el = document.createElement(type)
  el.className = name
  el.innerHTML = text
  return el
}

const createTitle = (text) => {
  var el = document.createElement("h1")
  el.className = "title"

  var a = document.createElement("a")
  a.innerHTML = text
  a.href = MAIN_URL + "#" + getURL(text)
  el.append(a)

  return el
}

const createImage = (title) => {
  var el = document.createElement("img")
  el.className = "image"
  el.src = 'images/' + title
  return el
}

const createBlock = (type, name, text) => {
  var el = document.createElement(type)
  el.className = name

  var i, firstPos, secondPos
  for (i = 0; i < text.length; i++) {
    [firstPos, classname] = firstMarkdown(text, i)
    secondPos = secondMarkdown(text, firstPos, classname)
    var node = document.createTextNode(text.slice(i, firstPos))
    el.append(node)

    if (firstPos != text.length) {
      var subEl
      switch (classname){
        case SUPERSCRIPT_CLASS:
          subEl = document.createElement("sup")
          subEl.className = classname
          subEl.innerHTML = text.slice(firstPos + 1, secondPos)
          break
        case ITALICS_CLASS:
          subEl = document.createElement("i")
          subEl.innerHTML = text.slice(firstPos + 1, secondPos)
          break
      }
      el.append(subEl)
    }
    i = secondPos
  }
  return el
}

const firstMarkdown = (line, pos) => {
  for (; pos < line.length; pos++) {
    switch (line[pos]){
      case '{':
        return [pos, SUPERSCRIPT_CLASS]
      case '_':
        return [pos, ITALICS_CLASS]
    }
  }
  return [pos, ""]
}

const secondMarkdown = (line, pos, classname) => {
  pos++
  for (; pos < line.length; pos++) {
    switch (classname){
      case SUPERSCRIPT_CLASS:
        if (line[pos] === '}') {
          return pos
        }
      case ITALICS_CLASS:
        if (line[pos] === '_') {
          return pos
        }
    }
  }
  return pos
}

///////////////////////////////////////
// Markup
///////////////////////////////////////

const TITLE = '#'
const SECTION = '##'
const SUB_SECTION = '###'
const SEPARATOR = '##########'
const DATE = '&'
const FOOT_NOTE = '@'
const IMAGE = '!'
const BLOCK_QUOTE = '""'

const isTitle = (line) => {
  return (line.slice(0, 1) === TITLE) && !(isSection(line) || isSubSection(line))
}

const isSection = (line) => {
  return (line.slice(0, 2) === SECTION) && !isSubSection(line)
}

const isSubSection = (line) => {
  return line.slice(0, 3) === SUB_SECTION
}

const isDate = (line) => {
  return line.slice(0, 1) === DATE
}

const isFootnote = (line) => {
  return line.slice(0, 1) === FOOT_NOTE
}

const isImage = (line) => {
  return line.slice(0, 1) === IMAGE
}

const isBlockQuote = (line) => {
  return line.slice(0, 2) === BLOCK_QUOTE
}
