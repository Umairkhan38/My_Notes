console.log('welcome to javascript project');
shownotes();

// 1_if user adds a note it should save to the localstorage

let rem=document.getElementById("rem");
$("#rem").hide();
let set=document.getElementById("set");
let login=document.getElementById("loginModal");


set.addEventListener("click", ()=>{
    SetAlarm();
    shownotes();
    $("#loginModal").modal("hide"); 
      
    
});

function objcr(){
    let adtxt = document.getElementById("adtxt").value;
    let adtitle = document.getElementById("title").value;
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myobj = {
        text: adtxt,
        title: adtitle
    }
    notesObj.push(myobj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    adtxt.value = "";
    adtitle.value = "";
    console.log(notesObj);  
   
}


let adbtn = document.getElementById('adbtn');
adbtn.addEventListener("click", function (e) {
let adtxt = document.getElementById("adtxt").value;
let adtitle = document.getElementById("title").value;
let alert = document.getElementById("alert");

  
if(adtxt.length<=2 || adtitle.length<=2 ){
  setTimeout((e) => {
    alert.innerHTML=`
    <div class="alert alert-danger d-flex align-items-center" role="alert">
    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
    <div>
      ERROR : Invalid Title or Note Please Enter Correct Details!
    </div>  
    `
}, 3000);
setTimeout(() => {
  $("#alert").hide();

},7000);        
}else{

if(confirm("Do You Want To Set A Reminder!")==true){
 $("#rem").show();       
   objcr();                       
        
}
else{

   objcr();
   shownotes(); 
   myalert();

}
}}
)

function SetAlarm() {
    // window.location.reload();
    let date = document.getElementById("date");
    let alarmdate = date.value;
    let time = document.getElementById("time");
    let audio = new Audio("assets/alarm.mp3");
    let alarmtime = time.value;
    console.log(alarmdate + alarmtime)
    let ringtime = new Date(alarmdate +" "+ alarmtime);
    console.log(ringtime)
    let now = new Date();
  
  
    // let anim = document.getElementById("");
  
    let ringing = ringtime - now;
    console.log(ringing);
    let alert = document.getElementById("alert");
    $("#alert").show();
    alert.innerHTML = `
     <div class="alert alert-success d-flex align-items-center" role="alert">
      
     <div><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
   </svg>
   &nbsp;Your Note And Alarm Has Been Set Successfully!
     </div>
   </div>
    `
    setTimeout(() => {
      $("#alert").hide();
  
    }, 5000);
  
    if (ringing >= 0) {

      setTimeout(() => {
        console.log("ringing bell");
        $("#alert").show();
        alert.innerHTML =`
<div class="alert alert-success d-flex align-items-center bg-info" role="alert">
<img src="assets/anim.gif" width="120px" height="90px"> <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
<div class="text-light">
<h4>Alert : Its Time To Do Your Noted Task!</h4>
</div>`
        audio.play();
        setTimeout(() => {
          audio.pause();
          $("#alert").hide();
          location.reload();
        },20000);
      }, ringing);
    }
    else {
  
      alert.innerHTML = `
       <div class="alert alert-danger d-flex align-items-center" role="alert">
       <div>ERROR : Invalid Date or Time Please Enter Correct Details!</div>`
      setTimeout(() => {
        $("#alert").hide();
  
      }, 6000);
  
    }
  
  }


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
        <div class="card mx-1 my-1" style="width: 15rem;max-height: 30rem;">
        <div class="card-body">
        <h5 class="card-title text-danger">${element.title}</h5>
      
        <hr>
        <p class="card-text"><i>${element.text}</i></p>  
        </div>
        <button class="btn btn-outline-danger my-4" id="${index}" onclick="deletenote(this.id)"><b>Delete Note</b></button>
        </div> `
    })
    



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
};


function myalert(){
  let alert=document.getElementById("alert");
  alert.innerHTML = `
     <div class="alert alert-success d-flex align-items-center" role="alert">
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square-fill" viewBox="0 0 16 16">
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm10.03 4.97a.75.75 0 0 1 .011 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.75.75 0 0 1 1.08-.022z"/>
</svg>
     <div>
     &nbsp; Your Note Has Taken Successfully!
     </div>
   </div>
    `
    setTimeout(() => {
      $("#alert").hide();
  
    }, 6000);


}


let search = document.getElementById("searchtxt");
search.addEventListener("input", function (element) {
    let inputval = searchtxt.value.toLowerCase();
    console.log("input event fired!", inputval);
    let notescard = document.getElementsByClassName('card mx-1 my-1');
    Array.from(notescard).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("h5")[0].innerText;
        if (cardtxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
})


