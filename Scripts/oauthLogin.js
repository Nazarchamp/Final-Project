// When we get sign in activate recomendation page
function onSignIn(googleUser) {
    welcomeText = document.getElementById("welcome-h1");

    // Turn everything on except sign in button
    document.getElementsByClassName("outmostDiv")[0].style.display = "block";
    document.getElementById("top-pick").style.display = "block";
    document.getElementById("signOutA").style.display = "block";
    document.getElementById("authContainer").style.display = "none";

    var profile = googleUser.getBasicProfile();

    // Welcome User
    welcomeText.innerHTML = `Welcome ${profile.getName()}!`;
}

function signOut() {
    // Sign out user
    gapi.auth2.getAuthInstance().signOut().then(function () {
        welcomeText = document.getElementById("welcome-h1");

        // Only turn on sign in button
        document.getElementsByClassName("outmostDiv")[0].style.display = "none";
        document.getElementById("top-pick").style.display = "none";
        document.getElementById("signOutA").style.display = "none";
        document.getElementById("authContainer").style.display = "flex";

        // Reset to welcome guest
        welcomeText.innerHTML = `Welcome Guest!`;
    });
}

// Adds items to cookie store for cart reading, only used for reomendation item
function addItem(name, price, image, quantity) {
    let cookieCount = getCookie(`${name}|${price}|${image}`);
    if (cookieCount == "") {
        setYearlyCookie(`${name}|${price}|${image}`, parseInt(quantity));
    } else {
        setYearlyCookie(`${name}|${price}|${image}`, parseInt(quantity) + parseInt(cookieCount));
    }
    // Alerts Users
    alert(`Added ${name} to Cart!`);
}

// Set a cookie in the cart that expires in a year by generating new dates
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