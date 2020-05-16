
const writeIt = () => {
    var showing = document.createElement('div')
    showing.className = "post"
    document.body.append(showing)

    var head = document.createElement('h2')
    head.innerHTML = "Title"
    showing.append(head)

    var resp = ""
    fetch('/33.txt')
        .then(response => response.text())
        .then((data) => {
            var par = document.createElement('p')
            par.innerHTML = data
            showing.append(par2)
        })
}

writeIt()