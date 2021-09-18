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
            <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"> <link rel="stylesheet" href="/css/iframe.css" >`;
        descriptionFrame.document.designMode = 'On'

        inBoxFrame.document.head.innerHTML += `<link rel="preconnect" href="https://fonts.gstatic.com">
            <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"> <link rel="stylesheet" href="/css/iframe.css" >`;
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

    const descriptionCopy = document.querySelector('.descriptionCopy');
    if (descriptionCopy.innerHTML !== 'null' ){
        descriptionFrame.document.body.innerHTML = descriptionCopy.innerHTML;
        descriptionInput.value = descriptionCopy.innerHTML;
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

    const inBoxCopy = document.querySelector('.inBoxCopy');
    if (inBoxCopy.innerHTML !== 'null'){
        inBoxFrame.document.body.innerHTML = inBoxCopy.innerHTML;
        inBoxInput.value = inBoxCopy.innerHTML;
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
        const path = evt.path || (evt.composedPath && evt.composedPath());

        if (target.matches('.fa-edit')) {
            let input = path[2].children[1];
            input.addEventListener('change', event => {
                let output = path[4].children[0];
                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function () {
                    URL.revokeObjectURL(output.src) // free memory
                }
            })
        }

        if (target.matches('.fa-trash-alt')) {
            path[3].remove()
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
        const path = evt.path || (evt.composedPath && evt.composedPath());
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
            let input = path[2].children[1];
            input.addEventListener('change', event => {
                let output = path[4].children[0];
                output.src = URL.createObjectURL(event.target.files[0]);
                output.onload = function () {
                    URL.revokeObjectURL(output.src) // free memory
                }
            })
        }

        if (target.matches('.fa-trash-alt')) {

            for (let j=2; j<path[4].children.length; j++){
                path[4].children[j].remove()
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
        const path = evt.path || (evt.composedPath && evt.composedPath());
        const target = evt.target;

        if (target.matches('.fa-edit')) {
            let input = path[2].children[1];
            input.addEventListener('change', event => {
                let output = path[4].children[0];
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
                const path = evt.path || (evt.composedPath && evt.composedPath());
                path[1].remove()
            })
        })
    })

    subBrandDeleteBtns.forEach(subBrandDelete => {
        subBrandDelete.addEventListener('click', evt => {
            const path = evt.path || (evt.composedPath && evt.composedPath());
            path[1].remove()
        })
    })
}


// add shop price to order
const productsList = document.querySelector('.orderListEdit')
if (productsList){

    const inputs = document.querySelectorAll('.orderQtyInputs')
    let subtotals = document.querySelectorAll('.orderSubtotalEdit')
    const price = document.querySelectorAll('.orderPriceEdit')
    const total = document.querySelector('.editOrderTotal')
    const totalOutput = document.querySelector('.orderOutput')
    let sum = 0;

    for (let i=0; i<subtotals.length; i++){
        subtotals[i].value = price[i].value * inputs[i].value;

        inputs[i].addEventListener('change', evt => {
            subtotals[i].value = price[i].value * inputs[i].value
            sum=0;

            subtotals.forEach(sub => {
                sum += parseInt(sub.value)
            })
            total.innerHTML = sum;
            totalOutput.value= sum
        } )
    }

    subtotals.forEach(sub => {
        sum += parseInt(sub.value)
    })
    total.innerHTML = sum;
    totalOutput.value = sum;

    const orderProductDelete = document.querySelectorAll('.orderProductDelete')
    orderProductDelete.forEach( button => {
        button.addEventListener('click', evt => {
            if (orderProductDelete.length > 1){
                const path = evt.path || (evt.composedPath && evt.composedPath());
                path[1].remove()

                subtotals = document.querySelectorAll('.orderSubtotalEdit')
                sum=0
                subtotals.forEach(sub => {
                    sum += parseInt(sub.value)
                })
                total.innerHTML = sum;
                totalOutput.value= sum
            } else {
                alert(`Can not delete all the items`)
            }

        })
    })


}


// copy to clipboard
const c2c = document.querySelectorAll('.orderClip');
if (c2c.length > 0) {
    c2c.forEach(link => {
        link.addEventListener('click', evt => {

            for (let i=0; i<=c2c.length-1; i++){
                c2c[i].innerHTML = `<i class="far fa-clipboard"></i>`
            }

            const path = evt.path || (evt.composedPath && evt.composedPath());

            console.log(path);

            const phone = path[4].children[2].children[0].innerText
            const address = path[4].children[2].children[3].href
            const products = path[4].children[3].innerText
            const payment = path[4].children[5].innerText
            const totalAmount = path[4].children[4].innerText
            const amount = totalAmount.split('=')

            navigator.clipboard.writeText(`Phone number - ${phone}\n\nAddress - ${address}\n\nPayment - ${payment}\n\nAmount - ${amount[1]}\n\n${products}`);
            path[1].innerHTML = ` <i class="fas fa-clipboard"></i>`
        })
    })
}


// Product view image
let smallImages = document.querySelectorAll('.prod-small-img');
if (smallImages.length > 0) {
    smallImages.forEach(smallImage => {
        smallImage.addEventListener('click', (evt) => {
            const path = evt.path || (evt.composedPath && evt.composedPath());
            path[4].children[0].children[0].src = smallImage.src
        })
    })
}

// copy to clipboard product view
const c2cp = document.querySelectorAll('.c2cLink');
if (c2cp.length > 0) {
    c2cp.forEach(link => {
        link.addEventListener('click', evt => {
            const path = evt.path || (evt.composedPath && evt.composedPath());
            navigator.clipboard.writeText(path[2].children[3].value);
            path[1].innerHTML = `<button class="c2cLink btn btn-secondary"> copied product link <i class="fas fa-clipboard c2c" ></i> </button>`
        })
    })
}


//detailed price list calc
const bps = document.querySelectorAll('.bp');
if (bps.length>0){
    bps.forEach(bp =>{
        bp.addEventListener('change', evt => {
            const path = evt.path || (evt.composedPath && evt.composedPath());

            let newBp = path[2].children[0].children[1].value;
            let rate = path[2].children[1].children[1].value;
            let buying = path[2].children[2].children[1];
            let selling = path[2].children[3].children[1];

            let newBuying = Math.ceil( (newBp * rate) + 100)
            buying.value = newBuying;
            buying.innerHTML = newBuying;

            let newSelling = Math.ceil((0.05 * newBuying) + newBuying)
            selling.value = newSelling;
            selling.innerHTML = newSelling;

        })
    })

    const rates = document.querySelectorAll('.rate');
    rates.forEach(rate =>{
        rate.addEventListener('change', evt => {
            const path = evt.path || (evt.composedPath && evt.composedPath());

            let newBp = path[2].children[0].children[1].value;
            let rate = path[2].children[1].children[1].value;
            let buying = path[2].children[2].children[1];
            let selling = path[2].children[3].children[1];

            let newBuying = Math.ceil( (newBp * rate) + 100)
            buying.value = newBuying;
            buying.innerHTML = newBuying;

            let newSelling = Math.ceil((0.05 * newBuying) + newBuying)
            selling.value = newSelling;
            selling.innerHTML = newSelling;

        })
    })
}

//show password
const passIcon = document.querySelector('.passIcon')
if (passIcon){
        passIcon.addEventListener('click', ()=>{
            const passInput = document.querySelector('.passInput')
            const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passInput.setAttribute('type', type);

            passIcon.classList.toggle('bi-eye');
            })
}







