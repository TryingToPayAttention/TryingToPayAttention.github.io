
const writeIt = () => {
    var showing = document.createElement('div')
    showing.className = "post"
    document.body.append(showing)

    var head = document.createElement('h2')
    head.innerHTML = "Title"
    showing.append(head)

    var par = document.createElement('p')
    par.innerHTML = "Lakhfjahskfjhalskjfhakjshflkjahsfajshfkahsf"
    showing.append(par)

    var resp = ""
    fetch('/33.txt')
  .then(response => response.text())
  .then((data) => {
      resp = data
    console.log(data)
    var par2 = document.createElement('p')
    par2.innerHTML = resp
    showing.append(par2)
  })

    
}

writeIt()