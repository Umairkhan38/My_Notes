console.log('welcome to javascript project');
shownotes();
//1_if user adds a note it should save to the localstorage
let adbtn = document.getElementById('adbtn');
adbtn.addEventListener("click", function (e) {
    let adtxt = document.getElementById("adtxt");
    let adtitle = document.getElementById("title");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myobj = {
        text: adtxt.value,
        title: adtitle.value
    }
    notesObj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    adtxt.value = "";
    adtitle.value = "";
    console.log(notesObj);
    shownotes();
})


function shownotes() {
    let notes = localStorage.getItem("notes");
    let noteselem = document.getElementById('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="card mx-1" style="width: 15rem;max-height: 30rem;">
        <div class="card-body">
        <h5 class="card-title text-danger">${element.title}</h5>
        <hr>
        <p class="card-text"><i>${element.text}</i></p>  
        </div>
        <button class="btn btn-outline-danger my-4" id="${index}" onclick="deletenote(this.id)"><b>Delete Note</b></button>
        </div>
        `
    })
    
    //  noteselem.innerHTML = html;

    if (notesObj.length != 0) {
        noteselem.innerHTML = html;
    }
    else {
        noteselem.innerHTML = `Please! Write something in "Add a Note" section above`
    }

}


function deletenote(index) {
    console.log("im deleting", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
}6


let search = document.getElementById("searchtxt");
search.addEventListener("input", function (element) {
    let inputval = searchtxt.value.toLowerCase();
    console.log("input event fired!", inputval);
    let notescard = document.getElementsByClassName('cards');
    Array.from(notescard).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("strong")[0].innerText;
        if (cardtxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})


