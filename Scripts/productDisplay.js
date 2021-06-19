// Initialize the websocket
var productServerSocket = new WebSocket("ws://127.0.0.1:8765");
var itemObj;

// Adds items to cookie store for cart reading
function addItem(name, price, image, quantity) {
    // Pulls cookie, and then either creates new cookie, or adds to old cookie
    let cookieCount = getCookie(`${name}|${price}|${image}`);
    if (cookieCount == "") {
        setYearlyCookie(`${name}|${price}|${image}`, parseInt(quantity));
    } else {
        setYearlyCookie(`${name}|${price}|${image}`, parseInt(quantity) + parseInt(cookieCount));
    }
    // Alerts Users
    alert(`Added ${name} to Cart!`);
}

// On every Websocket Message
productServerSocket.onmessage = function (event) {
    // Takes Json input and parses it
    itemObj = JSON.parse(event.data.replace(/'/g, '"'));
    // For every item, create our template. We essentially just create a bunch of divs and put them together nicely like lego to create one product image for every product as we have data about the name, price, image and brand
    itemObj['items'].forEach(element => {
        let box = document.createElement("div");
        box.className = "outmostDiv";

        let bodyDiv = document.createElement("div");
        bodyDiv.className = "bodyDiv";

        let imgContainer = document.createElement("div");
        imgContainer.className = "imgContainer";

        let imageLink = document.createElement("a");
        imageLink.className = "imageLink";

        let prodImage = document.createElement("img");
        prodImage.className = "productImage";
        prodImage.src = element["image"];

        imageLink.appendChild(prodImage);
        imgContainer.appendChild(imageLink);
        bodyDiv.appendChild(imgContainer);

        let itemInfoContainer = document.createElement("div");
        itemInfoContainer.className = "itemInfoContainer";

        let infoLink = document.createElement("a");
        infoLink.className = "infoLink";

        let logoSpan = document.createElement("div");
        logoSpan.className = "logoSpan";

        let logoImage = document.createElement("img");
        logoImage.src = `https://media.memoryexpress.com/Images/Brands/${element["logo"]}?Size=Small`;

        logoSpan.appendChild(logoImage);
        infoLink.appendChild(logoSpan);
        infoLink.innerHTML += element["name"];
        itemInfoContainer.appendChild(infoLink);
        bodyDiv.appendChild(itemInfoContainer);

        let priceDiv = document.createElement("div");
        priceDiv.className = "priceDiv";

        let priceTextDiv = document.createElement("div");
        priceTextDiv.className = "priceTextDiv";

        let priceText = document.createElement("div");
        priceText.className = "priceText";
        priceText.innerHTML = "<span>$" + element["price"] + "</span>";

        let noticeText = document.createElement("div");
        noticeText.className = "noticeText";
        noticeText.innerHTML = "<div class='sloganText'>Everyday Low Price!</div>";

        priceTextDiv.appendChild(priceText);
        priceTextDiv.appendChild(noticeText);

        let buyButtonContainer = document.createElement("div");
        buyButtonContainer.className = "buyButtonContainer";

        let buyButton = document.createElement("a");
        buyButton.className = "buyButton";
        buyButton.onclick = function () { addItem(element["name"], element["price"], element["image"], 1) };
        buyButton.innerHTML = "Buy";

        buyButtonContainer.appendChild(buyButton);

        priceDiv.appendChild(priceTextDiv);
        priceDiv.appendChild(buyButtonContainer);

        box.appendChild(bodyDiv);
        box.appendChild(priceDiv);

        // Finally apped the product to the main document
        document.getElementById("productContainer").appendChild(box);
    });
}

// Set a cookie in the cart that expires in a year by generating new dats
function setYearlyCookie(cname, cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// Retrieve the cookie by going through the cookie string, code from W3Schools
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// Get Products
function getProducts(name) {
    // Query all old product containes
    oldProds = document.getElementsByClassName("outmostDiv");

    // Delete them all from their parents
    while (oldProds[0]) {
        oldProds[0].parentNode.removeChild(oldProds[0]);
    }

    // Format parameter for nice displaying
    let nameProper = name.replace(/([A-Z])/g, ' $1').trim()

    // Display parameter
    document.getElementById('DisplayingText').innerHTML = "Displaying " + nameProper + ":"


    // Send 1-11 page requests, implemented this way to prevent over exposure of the internals of the database
    productServerSocket.send(`${name}1`);
    productServerSocket.send(`${name}2`);
    productServerSocket.send(`${name}3`);
    productServerSocket.send(`${name}4`);
    productServerSocket.send(`${name}5`);
    productServerSocket.send(`${name}6`);
    productServerSocket.send(`${name}7`);
    productServerSocket.send(`${name}8`);
    productServerSocket.send(`${name}9`);
    productServerSocket.send(`${name}10`);
    productServerSocket.send(`${name}11`);
}