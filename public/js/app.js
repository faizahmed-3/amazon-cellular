// Pre Loader
window.addEventListener("load", () => {
    let loader = document.querySelector(".loader")
    loader.classList.add("loader-finish");
});


// Back to top button
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})


// Copyright year
let year = new Date().getFullYear();
document.querySelector('#copyright').innerHTML = year;


// Product view image

let mainImg = document.querySelector('#prod-main-img');
let smallImages = document.querySelectorAll('.prod-small-img');

smallImages[0].onclick = function () {
    mainImg.src = smallImages[0].src;
}
smallImages[1].onclick = function () {
    mainImg.src = smallImages[1].src;
}
smallImages[2].onclick = function () {
    mainImg.src = smallImages[2].src;
}
smallImages[3].onclick = function () {
    mainImg.src = smallImages[3].src;
}
smallImages[4].onclick = function () {
    mainImg.src = smallImages[4].src;
}
smallImages[5].onclick = function () {
    mainImg.src = smallImages[5].src;
}


//Add number in checkout page
const addNum = document.querySelector('#add-num');
if (addNum){
    addNum.addEventListener('click', () => {
        let anotherNumber = document.querySelector('.anotherNumber');
        anotherNumber.innerHTML += `
       <input type="number" class="form-control mb-2" id="phone" aria-describedby="phone number" placeholder="Add another number (optional)">
    `;
    })
}








