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


//load same scroll position
window.addEventListener('scroll', function() {
    localStorage.setItem('scrollPosition', window.scrollY);
}, false);
window.addEventListener('load', function() {
    if ( document.referrer === window.location.href && window.location.pathname !== '/register'){
        if(localStorage.getItem('scrollPosition') !== null){
            window.scrollTo(0, localStorage.getItem('scrollPosition'));
        }
    }
}, false);


// Copyright year
let year = new Date().getFullYear();
document.querySelector('#copyright').innerHTML = year;


//open modal externally
window.addEventListener('load', () => {
    let url = window.location.href;

    if (url.includes('#_')){
        let modalToOpen = url.substring(url.indexOf("#"));
        if (document.querySelector(modalToOpen)){
            if(window.location.href.indexOf(modalToOpen) !== -1) {
                let myModal = new bootstrap.Modal(document.querySelector(modalToOpen), {})
                myModal.show()
            }
        }
    }


})


// Product view image
let smallImages = document.querySelectorAll('.prod-small-img');
if (smallImages.length>0){
    smallImages.forEach(smallImage => {
        smallImage.addEventListener('click', (evt) => {
            evt.path[4].children[0].children[0].src = smallImage.src;
        })
    })
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


//calculate price on cart
const qtyInputs = document.querySelectorAll('.qty');
if (qtyInputs.length>0){
    const priceInputs = document.querySelectorAll('.itemPrice');
    const subtotalInputs = document.querySelectorAll('.subtotal');
    const total = document.querySelector('.total');
    let sum =0;

    for (let i=0; i<qtyInputs.length; i++){
        qtyInputs[i].addEventListener('change', evt => {
            subtotalInputs[i].innerHTML = `${evt.target.value * parseInt(priceInputs[i].innerHTML)}`
            sum=0;

            subtotalInputs.forEach(sub => {
                sum += parseInt(sub.innerHTML);
            })
            total.innerHTML = sum;
        })
    }

    subtotalInputs.forEach(sub => {
        sum += parseInt(sub.innerHTML);
    })
    total.innerHTML = sum;
}


//calculate price on product view
const qtyInputsPV = document.querySelectorAll('.qtyPV');
if (qtyInputsPV.length>0){
    qtyInputsPV.forEach(qtyInput => {
        qtyInput.addEventListener('change', evt => {
            let price = evt.path[2].children[0].children[1]
            let subtotal = evt.path[1].children[1].children[1];

            subtotal.innerHTML = `${evt.target.value * parseInt(price.innerHTML)}`
        })
    })
}


//wishlist and cart buttons
const wishlistBtns = document.querySelectorAll('.wishlistBtn');
if (wishlistBtns.length>0){
    for (let i =0; i<wishlistBtns.length; i++){
        console.log(wishlistBtns[i]);
    }
}



//maps
let latitude = document.querySelector('#latitude')
if (latitude){
    let map;
    let marker;

    let longitude = document.querySelector('#longitude')

    function initMap() {
        let shopLocation = { lat: -1.2843393595008854, lng: 36.82790154887997 };

        map = new google.maps.Map(document.getElementById("map"), {
            center: shopLocation,
            zoom: 13,
            mapTypeId: "roadmap",
            mapTypeControl: false
        });

        // Create the search box and link it to the UI element.
        const input = document.getElementById("pac-input");
        const searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        // Bias the SearchBox results towards current map's viewport.
        map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds());
        });
        let markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }
            // Clear out the old markers.
            markers.forEach((marker) => {
                marker.setMap(null);
            });
            markers = [];
            // For each place, get the icon, name and location.
            const bounds = new google.maps.LatLngBounds();
            places.forEach((place) => {
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                const icon = {
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(25, 25),
                };
                // Create a marker for each place.
                markers.push(
                    new google.maps.Marker({
                        map,
                        icon,
                        title: place.name,
                        position: place.geometry.location,
                    })
                );

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });

        marker = new google.maps.Marker({
            map,
            draggable: true,
            animation: google.maps.Animation.BOUNCE,
            position: shopLocation,
            title: "Delivery Address"
        });

        latitude.value = shopLocation.lat;
        longitude.value = shopLocation.lng;

        google.maps.event.addListener(marker, 'dragend', function(evt){
            latitude.value = evt.latLng.lat();
            longitude.value = evt.latLng.lng();
        });


    }
}















