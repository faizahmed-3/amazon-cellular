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


// sidebar toggle
const toggleButton = document.querySelector('#sidebarToggle');
toggleButton.addEventListener('click', (e)=> {
    let admin = document.querySelector('#admin');
    e.preventDefault();
    admin.classList.toggle('toggled');
    console.log(e);
})


//description box
let ulButtons = document.querySelectorAll('.ulButton');
ulButtons.forEach(button => {
    button.addEventListener('click', () => {
        let cmd = button.dataset['command'];
        document.execCommand(cmd, false, null);
    });
})


//Add image
const imgRow = document.querySelector('.imgRow');
imgRow.addEventListener('click', evt => {
    const target = evt.target;
    if (target.matches('.addImage')){
        let card = document.createElement('div');
        card.classList.add('col-2', 'card', 'imageCard');
        card.innerHTML = `
        <img src="..." class="imgCol">
            <div class="card-body ">
                <div class="d-flex justify-content-end">
                    <i class="far fa-edit"></i>
                    <i class="far fa-trash-alt mx-2"></i>
                    <i class="fas fa-plus addImage"></i>
                </div>
            </div>
        `
        console.log('add button clicked');
        let row = document.querySelector('.imgRow');
        row.append(card);
    }

    if (target.matches('.fa-trash-alt')){
        evt.path[3].remove()
    }
})
