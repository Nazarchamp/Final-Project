/* Set rates + misc */
var taxRate = 0.12;
var shippingRate = 15.00;
var fadeTime = 300;


/* Assign actions */
$('.product-quantity input').change(function () {
    updateQuantity(this);
});

$('.product-removal button').click(function () {
    removeItem(this);
});

getAllCookies();

/* Recalculate cart */
function recalculateCart() {
    var subtotal = 0;

    /* Sum up row totals */
    $('.product').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });

    /* Calculate totals */
    var tax = subtotal * taxRate;
    var shipping = (subtotal > 0 ? shippingRate : 0);
    var total = subtotal + tax + shipping;

    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function () {
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('#cart-shipping').html(shipping.toFixed(2));
        $('#cart-total').html(total.toFixed(2));
        if (total == 0) {
            $('.checkout').fadeOut(fadeTime);
        } else {
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}


/* Update quantity */
function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    var cookie = productRow.children('.cookieFiller').text();
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cookie + "=Default=" + quantity + ";" + expires + "; path=/;";

    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
        $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice.toFixed(2));
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}


/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    var cookie = productRow.children('.cookieFiller').text();
    document.cookie = cookie + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
    });
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    if (ca[0] === "") {
        $('.totals').remove();
        $('.column-labels').remove();
        $('.checkout').remove();
        document.getElementsByTagName('h1')[1].innerHTML = "Your Cart Is Empty, Head <a href='index.html'>Home</a> to Fill it!";
    }
}

function getAllCookies() {
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    var count=0;
    if (ca[0] !== "") {
        ca.forEach(cookie => {
            let pair = cookie.split('=');
            let dataToDisplay = pair[0].split("|");
            if (dataToDisplay[0] !== " G_ENABLED_IDPS" && dataToDisplay[0] !== " G_AUTHUSER_H" && dataToDisplay[0] !== "G_AUTHUSER_H" && dataToDisplay[0] !== "G_ENABLED_IDPS") {


                productDiv = document.createElement('div');
                productDiv.className = "product";

                productImageDiv = document.createElement('div');
                productImageDiv.className = "product-image";

                productImage = document.createElement('img');
                productImage.src = dataToDisplay[2];

                productImageDiv.appendChild(productImage);
                productDiv.appendChild(productImageDiv);

                productDetailsDiv = document.createElement('div');
                productDetailsDiv.className = "product-details";

                nameH = document.createElement('h2');
                nameH.className = "product-description";
                nameH.innerHTML = dataToDisplay[0];

                productDetailsDiv.appendChild(nameH);
                productDiv.appendChild(productDetailsDiv);

                productPrice = document.createElement('div');
                productPrice.className = "product-price";
                productPrice.innerHTML = dataToDisplay[1];

                productDiv.appendChild(productPrice);

                productQuantityDiv = document.createElement('div');
                productQuantityDiv.className = "product-quantity";

                productQuantityInput = document.createElement('input');
                productQuantityInput.type = "number";
                productQuantityInput.value = pair[2];
                productQuantityInput.min = "1";

                productQuantityDiv.appendChild(productQuantityInput);
                productDiv.appendChild(productQuantityDiv);

                productRemovalDiv = document.createElement('div');
                productRemovalDiv.className = "product-removal";

                productRemovalButton = document.createElement('button');
                productRemovalButton.className = "remove-product";
                productRemovalButton.innerHTML = "Remove";

                productRemovalDiv.appendChild(productRemovalButton);
                productDiv.appendChild(productRemovalDiv);

                productPrice = document.createElement('div');
                productPrice.className = "product-line-price";
                productPrice.innerHTML = dataToDisplay[1] * pair[2];

                cookieFiller = document.createElement('div');
                cookieFiller.innerHTML = pair[0];
                cookieFiller.className = "cookieFiller";

                productDiv.appendChild(cookieFiller);
                productDiv.appendChild(productPrice);

                document.getElementById("product-container").appendChild(productDiv);
            }else{
                count += 1
            }
        });
        if(count === 2 && ca.length === 2){
            $('.totals').remove();
            $('.column-labels').remove();
            $('.checkout').remove();
            document.getElementsByTagName('h1')[1].innerHTML = "Your Cart Is Empty, Head <a href='index.html'>Home</a> to Fill it!";
        }
    } else {
        $('.totals').remove();
        $('.column-labels').remove();
        $('.checkout').remove();
        document.getElementsByTagName('h1')[1].innerHTML = "Your Cart Is Empty, Head <a href='index.html'>Home</a> to Fill it!";
    }
    $('.product-quantity input').change(function () {
        updateQuantity(this);
    });

    $('.product-removal button').click(function () {
        removeItem(this);
    });
    recalculateCart();
}

function setYearlyCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}