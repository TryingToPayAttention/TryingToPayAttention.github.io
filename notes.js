const load = () => {
    //var modal = document.getElementById("myModal");
    var btns = document.getElementsByClassName("superscript");

    for (btn of btns) {
        btn.onclick = function () {
            var modal = document.getElementById("myModal1");
            modal.style.display = "block";

            var span = document.getElementsByClassName("close")[0];
            span.onclick = function () {
                modal.style.display = "none";
            }

            window.addEventListener('click', function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                }
            })
        }
    }
}

load()