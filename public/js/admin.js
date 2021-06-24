// Back to top button
const toTop = document.querySelector(".to-top");

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})


// Pre Loader
window.addEventListener("load", () => {
    let loader = document.querySelector(".loader")
    loader.classList.add("loader-finish");
});


// Copyright year
let year = new Date().getFullYear();
if (document.querySelector('#copyright')){
    document.querySelector('#copyright').innerHTML = year;
}


//modals
let myModal = document.getElementById('myModal')
let myInput = document.getElementById('myInput')

if (myModal){
    myModal.addEventListener('shown.bs.modal', function () {
        myInput.focus()
    })
}



// sidebar toggle
const toggleButton = document.querySelector('#sidebarToggle');
if (toggleButton){
    toggleButton.addEventListener('click', (e) => {
        let admin = document.querySelector('#admin');
        e.preventDefault();
        admin.classList.toggle('toggled');
    })
}


// description input and what's in the box
if (document.querySelectorAll('.descriptionBtn').length>0) {
    const descriptionBtns = document.querySelectorAll('.descriptionBtn');
    window.addEventListener("load", () => {
        descriptionFrame.document.head.innerHTML += `<link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">`;
        descriptionFrame.document.body.style.fontFamily = 'Montserrat';
        descriptionFrame.document.designMode = 'On'

        inBoxFrame.document.head.innerHTML += `<link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">`;
        inBoxFrame.document.body.style.fontFamily = 'Montserrat';
        inBoxFrame.document.designMode = 'On'
    });

    descriptionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let cmd = btn.dataset['command'];
            descriptionFrame.document.execCommand(cmd, false, null)
            descriptionInput.value = descriptionFrame.document.body.innerHTML;
        })
    })

    const descriptionInput = document.querySelector('#description')
    descriptionFrame.document.addEventListener('keyup', () => {
        descriptionInput.value = descriptionFrame.document.body.innerHTML;
    })

    descriptionFrame.document.addEventListener('paste', (event) => {
        event.preventDefault()
        let paste = (event.clipboardData || window.clipboardData).getData('text');
        descriptionFrame.document.body.innerHTML += paste;
    })

    const descriptionCopy = document.querySelector('.descriptionCopy');
    if (descriptionCopy.innerHTML !== 'null' ){
        descriptionFrame.document.body.innerHTML = descriptionCopy.innerHTML;
    }


    const inBoxBtns = document.querySelectorAll('.inBoxBtn');
    inBoxBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            let cmd = btn.dataset['command'];
            inBoxFrame.document.execCommand(cmd, false, null)
            inBoxInput.value = inBoxFrame.document.body.innerHTML;
        })
    })

    const inBoxInput = document.querySelector('#inBox')
    inBoxFrame.document.addEventListener('keyup', () => {
        inBoxInput.value = inBoxFrame.document.body.innerHTML;
    })

    inBoxFrame.document.addEventListener('paste', (event) => {
        event.preventDefault()
        let paste = (event.clipboardData || window.clipboardData).getData('text');
        inBoxFrame.document.body.innerHTML += paste;
    })

    const inBoxCopy = document.querySelector('.inBoxCopy');
    if (inBoxCopy.innerHTML !== 'null'){
        inBoxFrame.document.body.innerHTML = inBoxCopy.innerHTML;
    }
}


//Add image
const imgRow = document.querySelector('.imgRow');
if (imgRow) {
    let i=2;

    imgRow.addEventListener('click', evt => {
        const target = evt.target;
        if (target.matches('.addImage')) {
            if (i<=10){
                let card = document.createElement('div');
                card.classList.add('col-2', 'card', 'imageCard');
                card.innerHTML = `
                <img src="..." class="imgCol">
                <div class="card-body ">
                    <div class="d-flex justify-content-end">
                        <label for="image${i}"><i class="far fa-edit"></i></label>
                        <input type="file" id="image${i}" name="image${i}" accept="image/*" hidden>
                        <i class="far fa-trash-alt mx-2"></i>
                        <i class="fas fa-plus addImage"></i>
                    </div>
                </div>
                `
                i++;
                let row = document.querySelector('.imgRow');
                row.append(card);
            }
        }

        if (target.matches('.fa-edit')) {
            let input = evt.path[2].children[1];
            input.addEventListener('change', event => {
                let output = evt.path[4].children[0];
                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function () {
                    URL.revokeObjectURL(output.src) // free memory
                }
            })
        }

        if (target.matches('.fa-trash-alt')) {
            evt.path[3].remove()
            i--;
        }

    })
}

//edit image
const editImgRow = document.querySelector('.editImgRow');
if (editImgRow) {
    const imagesLength = document.querySelector('.imagesLength')
    let i= parseInt(imagesLength.value);
    (i === 0) ? i = 2 : i += 1;

    editImgRow.addEventListener('click', evt => {
        const target = evt.target;
        if (target.matches('.addImage')) {
            if (i<= 10){
                let card = document.createElement('div');
                card.classList.add('col-2', 'card', 'imageCard');
                card.innerHTML = `
                <img src="..." class="imgCol">
                <div class="card-body ">
                    <div class="d-flex justify-content-end">
                        <label for="image${i}"><i class="far fa-edit"></i></label>
                        <input type="file" id="image${i}" name="image${i}" accept="image/*" hidden>
                        <i class="far fa-trash-alt mx-2" style="color: red"></i>
                        <i class="fas fa-plus addImage"></i>
                    </div>
                </div>
                `
                i++;
                let row = document.querySelector('.editImgRow');
                row.append(card);
            }

        }

        if (target.matches('.fa-edit')) {
            let input = evt.path[2].children[1];
            input.addEventListener('change', event => {
                let output = evt.path[4].children[0];
                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function () {
                    URL.revokeObjectURL(output.src) // free memory
                }
            })
        }

        if (target.matches('.fa-trash-alt')) {

            for (let j=2; j<evt.path[4].children.length; j++){
                evt.path[4].children[j].remove()
                j--;
                i--;
            }


        }

    })
}

//category image
const catRow = document.querySelector('.catRow');
if (catRow) {

    catRow.addEventListener('click', evt => {
        const target = evt.target;

        if (target.matches('.fa-edit')) {
            let input = evt.path[2].children[1];
            input.addEventListener('change', event => {
                let output = evt.path[4].children[0];
                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function () {
                    URL.revokeObjectURL(output.src) // free memory
                }
            })
        }

    })
}


//visibility switch
const checkbox = document.querySelector('.visibilitySwitch')
if (checkbox) {
    checkbox.value = checkbox.checked;

    checkbox.addEventListener('change', () => {
        checkbox.value = checkbox.checked;
    })
}


//sub-brand
const subBrand = document.querySelector('#subBrand');
if (subBrand) {
    const brandCategory = document.querySelector('.brand-category')
    const brandCategoryInput = document.querySelector('.brand-category-select')
    const addSubBtn = document.querySelector('.subBrandBtn');
    let subBrandsList = document.querySelector('.subBrandsList');
    let subBrandDeleteBtns = document.querySelectorAll('.subBrandDelete');

    subBrand.addEventListener('change', evt => {
        brandCategory.classList.toggle('d-none');
        brandCategoryInput.value = 'none'

        addSubBtn.disabled = !evt.target[1].selected;
        subBrandsList.innerHTML = ``
    });


    addSubBtn.addEventListener('click', evt => {
        const li = document.createElement('li');
        li.classList.add('d-flex', 'justify-content-evenly');
        li.innerHTML = `
            <input type="text" class="form-control subBrandItem" name="subBrandItems" required>
            <select class="form-select subBrandItem " aria-label="Select Category" id="brand-category-input" name="subBrandCategoryID" required>
                <option value="">-Select a category-</option>
                <option value="6088049f65de8726600704b0">Audio</option>
                <option value="608922477c058834a8fa35eb">Camera Accessories</option>
                <option value="6089224d7c058834a8fa35ec">Car Accessories</option>
                <option value="6088049365de8726600704af">Cases</option>
                <option value="608922557c058834a8fa35ed">Computer Accessories</option>
                <option value="608922687c058834a8fa35ef">Other Categories</option>
                <option value="6089221f7c058834a8fa35e9">Power</option>
                <option value="608922137c058834a8fa35e8">Protectors</option>
                <option value="608922917c058834a8fa35f0">Smart Watches and Accessories</option>
            </select>
            <i class="fas fa-trash-alt subBrandDelete"></i>
        `
        subBrandsList.append(li);

        subBrandDeleteBtns = document.querySelectorAll('.subBrandDelete');
        subBrandDeleteBtns.forEach(subBrandDelete => {
            subBrandDelete.addEventListener('click', evt => {
                evt.path[1].remove()
            })
        })
    })

    subBrandDeleteBtns.forEach(subBrandDelete => {
        subBrandDelete.addEventListener('click', evt => {
            evt.path[1].remove()
        })
    })


}







