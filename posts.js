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
  } else if (hash == "about") {
    viewAbout()
  } else if (Number.isInteger(hInt) && (hInt > 0)) {
    viewRecent(hInt)
  } else {
    viewPost(hash)
  }
}

const changeMain = () => {
  window.location.href = "https://andrewmohebbi.github.io"
}

const changeAbout = () => {
  window.location.href = "https://andrewmohebbi.github.io#about"
}


///////////////////////////////////////
// Views
///////////////////////////////////////

const viewRecent = (num) => {
  getRecents(num).then((posts) => {
    clearPosts()
    for (post of posts) {
      appendBreaks(1)
      appendPost(post)
    }
    appendBreaks(3)
  })
}

const viewPost = (urlTitle) => {
  getPost(urlTitle).then((post) => {
    clearPosts()
    appendBreaks(1)
    appendPost(post)
    appendBreaks(3)
  })
}

const viewAbout = () => {
  getAbout().then((about) => {
    clearPosts()
    appendBreaks(1)
    appendPost(about)
    appendBreaks(3)
  })
}


///////////////////////////////////////
// Get text
///////////////////////////////////////

const getRecents = async (num) => {
  const all = await fetch("text/posts.txt").then((response) => response.text())
  const posts = all.split(/^##########/)
  const first = (num - 1) * 10
  const last = num * 10
  return posts.slice(first, last + 1)
}

const getAbout = async () => {
  var about = await fetch("text/about.txt").then((response) => response.text())
  return about
}

const getPost = async (urlTitle) => {
  var all = await fetch("text/posts.txt").then((response) => response.text())
  const posts = all.split(/^##########/)
  for (post of posts) {
    const lines = post.split(/\r?\n/)
    for (line of lines) {
      if (isURLTitle(line)) {
        if (line.slice(2) == urlTitle) {
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

const clearPosts = () => {
  var posts = document.getElementsByClassName(CLASS_POST)
  for (post of posts) {
    post.style.display = "none"
  }
}

const appendBreaks = (num) => {
  for (i = 0; i < num; i++) {
    document.body.append(document.createElement("br"))
  }
}

const appendPost = (text) => {
  var post = document.createElement("div")
  if (isLongPost(text)) {
    post.className = CLASS_POST //CLASS_LONG_POST
  } else {
    post.className = CLASS_POST
  }
  fill(post, text)
  document.body.append(post)
}

const fill = (post, text) => {
  const lines = text.split(/\r?\n/)
  for (line of lines) {
    if (isSeparator2(line)) {
      // Discard
    }
    if (isTitle(line)) {
      var el = create("h1", "title", line.slice(2))
      post.append(el)
    }
    else if (isURLTitle(line)) {
    }
    else if (isDate(line)) {
      var el = create("h6", "date", line.slice(2))
      post.append(el)
    }
    else if (isSection(line)) {
      var el = create("h2", "section", line.slice(3))
      post.append(el)
    }
    else if (isSubSection(line)) {
      var el = create("h3", "subsection", line.slice(4))
      post.append(el)
    }
    else if (isMedia(line)) {
    }
    else if (isBlockQuote(line)) {
      var el = create("p", "block", line.slice(3))
      post.append(el)
    }
    else {
      var el = create("p", "paragraph", line)
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

const isLongPost = (post) => {
  return (post.length >= LONG_POST_LENGTH)
}


///////////////////////////////////////
// Markup
///////////////////////////////////////


const TITLE = '#'
const SECTION = '##'
const SUB_SECTION = '###'
const SEPARATOR2 = '##########'
const SEPARATOR = '@'
const URL_TITLE = '$'
const DATE = '&'
const MEDIA = '!'
const BLOCK_QUOTE = '""'

const isTitle = (line) => {
  return line.slice(0, 1) === TITLE && !(isSection(line) || isSubSection(line) || isSeparator2(line))
}

const isSection = (line) => {
  return line.slice(0, 2) === SECTION && !(isSubSection(line) || isSeparator2(line))
}

const isSubSection = (line) => {
  return line.slice(0, 3) === SUB_SECTION && !isSeparator2(line)
}

const isSeparator = (line) => {
  return line.slice(0, 1) === SEPARATOR
}

const isSeparator2 = (line) => {
  return line.slice(0, 10) === SEPARATOR2
}

const isURLTitle = (line) => {
  return line.slice(0, 1) === URL_TITLE
}

const isDate = (line) => {
  return line.slice(0, 1) === DATE
}

const isMedia = (line) => {
  return line.slice(0, 1) === MEDIA
}

const isBlockQuote = (line) => {
  return line.slice(0, 2) === BLOCK_QUOTE
}


///////////////////////////////////////
// Style constants
///////////////////////////////////////

const CLASS_POST = "post"
const CLASS_LONG_POST = "post fade"
const LONG_POST_LENGTH = 2000