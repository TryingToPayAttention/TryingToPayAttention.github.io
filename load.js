
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

    var client = new XMLHttpRequest();
    var resp = ""
    client.open('GET', '/posts/33.txt');
    client.onreadystatechange = function() {
        resp = client.responseText
        alert(resp);
    }
    client.send(); 

    var par2 = document.createElement('p')
    par2.innerHTML = resp
    showing.append(par2)
}

writeIt()