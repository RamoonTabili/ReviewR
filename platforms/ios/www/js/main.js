'use strict';

let reviews = [];

let ratingNum = 0;
let stars = null;
let stars2 = null;
let image = document.getElementById('myImage');
let index = -1;

if (document.deviceready) {
    document.addEventListener('deviceready', onDeviceReady); // This is a device.
}
else {
    document.addEventListener('DOMContentLoaded', onDeviceReady); // This is without a device.
}

function onDeviceReady() {
    console.log("App initiated!");
//    alert("App initiated!");
    
    loadReviews();
    
    stars = document.querySelectorAll('.star');
    stars2 = document.querySelectorAll('.star2');
    console.log(stars);
    
    console.log(stars2);
    addListeners();
    setRating();
}

function loadReviews() {
    
    console.log("Reviews loading..");
    
    if (!localStorage.getItem("reviewr-tabi0011")) {
        console.log("No reviews ma dude!");
//        alert("Ayylmao!");
//        let reviewTest = {
//            title: "Night Lovell",
//            rating: 3,
//            img: "img/iphone-se-indoors.jpeg"
//        };
//        reviews.push(reviewTest);
//        localStorage.setItem("reviewr-tabi0011", JSON.stringify(reviews));
        setButtons();
    }
    else {
    
        reviews = JSON.parse(localStorage.getItem("reviewr-tabi0011"));
        console.log(reviews);
    
        
        let ul = document.getElementById("list");
        ul.innerHTML = "";
        reviews.forEach(function (value) {
            
            let li = document.createElement("li");
            li.className = "table-view-cell";
            
            let aa = document.createElement("a");
            aa.className = "navigate-right";
            aa.setAttribute("title", value.title + value.rating);
            
            let span1 = document.createElement("span");
            let img = document.createElement("img");
            img.className = "reviewList";
            img.setAttribute("src", value.img);
            let h2 = document.createElement("h2");
            h2.textContent = value.title;
            
            console.log(value.rating);
            
            let div = document.createElement("div");
            div.className = "out-of-five " + value.rating;
            
            let star1 = document.createElement("span");
            if (value.rating >= 1) { star1.className = "rated-star rated"; }
            else { star1.className = "rated-star"; }
            let star2 = document.createElement("span");
            if (value.rating >= 2) { star2.className = "rated-star rated"; }
            else { star2.className = "rated-star"; }
            let star3 = document.createElement("span");
            if (value.rating >= 3) { star3.className = "rated-star rated"; }
            else { star3.className = "rated-star"; }
            let star4 = document.createElement("span");
            if (value.rating >= 4) { star4.className = "rated-star rated"; }
            else { star4.className = "rated-star"; }
            let star5 = document.createElement("span");
            if (value.rating == 5) { star5.className = "rated-star rated"; }
            else { star5.className = "rated-star"; }
            
            let span2 = document.createElement("a");
            span2.className = "navigate-right";
        
            ul.appendChild(li);
            li.appendChild(aa);
            aa.appendChild(img);
            aa.appendChild(span1);
            div.appendChild(star1);
            div.appendChild(star2);
            div.appendChild(star3);
            div.appendChild(star4);
            div.appendChild(star5);
            span1.appendChild(h2);
            span1.appendChild(div);
            
//            setRated();
            
        });
        
        setButtons();
    }
}

function setButtons() {
    let canBtn = document.querySelectorAll(".personCancel");
    for (var i = 0; i < canBtn.length; i++){
        canBtn[i].addEventListener("click", cancelReview);
    }
    //canBtn.forEach(function (value) {
    //    value.addEventListener("click", cancelReview);
    //});
    let addBtn = document.querySelector(".addPeep");
    addBtn.addEventListener("click", addPerson);
    //addBtn.forEach(function (value) {
    //    value.addEventListener("click", addPerson);
    //});
    
    let delBtn = document.querySelector(".reviewDelete");
    delBtn.addEventListener("click", deletePerson);
    //delBtn.forEach(function (value) {
    //    value.addEventListener("click", deletePerson);
    //});
    let editBtn = document.querySelectorAll(".navigate-right");
    for (var i = 0; i < editBtn.length; i++){
        editBtn[i].addEventListener("click", editPerson);
    }
    //editBtn.forEach(function (value) {
    //    value.addEventListener("click", editPerson);
    //});
    
    let picBtn = document.querySelector(".herePic");
    picBtn.addEventListener("click", addPicture);
    //picBtn.forEach(function (value) {
    //    value.addEventListener("click", addPicture);
    //});
}

function cancelReview() {
    console.log("Canceling the save button.");
    document.getElementById("reviewAdd").classList.remove("active");
    document.getElementById("reviewSelect").classList.remove("active");
    document.querySelector(".personSave").removeEventListener("click", addSave);
}

function addPerson(ev) {
    console.log("Adding peeps.");
    console.log("Adding the peeps..");
    ev.preventDefault();
    index = -1;
    ratingNum = 0;
    setRating();
    document.getElementById("reviewAdd").classList.add("active");
    document.querySelector("#title").value = "";
    image.src = "img/PhotoButton.svg";
    document.querySelector(".personSave").addEventListener("click", addSave);
}

function addSave(ev) {
    ev.preventDefault();
    console.log(image.src);
    if (document.querySelector("#title").value == "" || ratingNum == 0 || image.src == "img/PhotoButton.svg") {
        alert("You need to fill out ALL the fields.");
    }
    else {
        
        console.log(image.src);
        
        let newReview = {
            title: document.querySelector("#title").value,
            rating: ratingNum,
            img: image.src
        };
        reviews.push(newReview);
        
        document.getElementById("reviewAdd").classList.remove("active");
        localStorage.setItem("reviewr-tabi0011", JSON.stringify(reviews));
        document.querySelector(".personSave").removeEventListener("click", addSave);
        console.log("Fake review added.");
        
        loadReviews();
    }
}

function deletePerson(ev) {
    ev.preventDefault();
    console.log(index);
    if (index > -1) {
        reviews.splice(index, 1);
    }
    console.log(reviews);
    if (reviews.length > 0) {
        localStorage.setItem("reviewr-tabi0011", JSON.stringify(reviews));
    }
    else {
        localStorage.removeItem("reviewr-tabi0011");
        let ul = document.getElementById("list");
        ul.innerHTML = "";
    }
    console.log("Review deleted.");
    document.getElementById("reviewSelect").classList.remove("active");
    
    loadReviews();
}

function editPerson(ev) {
    console.log("Editing reviews.");
    ev.preventDefault();
    let li = ev.currentTarget.parentElement;
    let reviewTitle = li.querySelector("a").getAttribute("title");
    index = -1;
    
    console.log(reviews[0].title + reviews[0].rating);
    for (let i = 0; i < reviews.length; i++) {
        if ((reviews[i].title + reviews[i].rating) == reviewTitle) {
            index = i;
            console.log(index);
            break;
        }
    }
    console.log(reviews[index].title);
    document.getElementById("reviewSelect").classList.add("active");
    document.querySelector(".modalHeader").textContent=reviews[index].title;
    document.querySelector(".reviewView").setAttribute("src", reviews[index].img);
    ratingNum = reviews[index].rating;
    console.log(ratingNum);
    setRated();
//    document.getElementById("date").value = people[index].dob;
}

function addListeners(){
    [].forEach.call(stars, function(star, index){
        star.addEventListener('click', (function(idx){
            console.log('adding listener', index);
            return function(){
                ratingNum = idx + 1;  
                console.log('Rating is now', ratingNum)
                setRating();
            }
        })(index));
    });
}

function setRating(){
    [].forEach.call(stars, function(star, index){
        if(ratingNum > index){
            star.classList.add('rated');
            console.log('added rated on', index );
        }
        else{
            star.classList.remove('rated');
            console.log('removed rated on', index );
        }
    });
}

function setRated(){    
    [].forEach.call(stars2, function(star, index){
        if(ratingNum > index){
            star.classList.add('rated');
            console.log('added rated on', index );
        }
        else{
            star.classList.remove('rated');
            console.log('removed rated on', index );
        }
    });
}

function addPicture() {
    console.log("Loading camera.");
    
    var options = {
        quality: 80,
        destinationType: Camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        pictureSourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        targetWidth: 300,
        targetHeight: 300
    }
    
    navigator.camera.getPicture(onSuccess, onFail, options);
}

function onSuccess(imageData) {
    image.src = imageData;
    console.log(image.src);
}

function onFail(message) {
    alert('Failed because: ' + message);
}