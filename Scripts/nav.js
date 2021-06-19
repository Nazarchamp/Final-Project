// Variable for state of Nav
let isNavOpen = false;

// Toggles classes of the animated hamburger
function toggleClass(el) {
    if (el.classList.contains('not-active')) {
        el.classList.remove('not-active');
        el.classList.add('active');
    } else {
        el.classList.add('not-active');
        el.classList.remove('active');
    }
    toggleNav();
}

// Simply checks a variable and responds appropriately to open or close
function toggleNav() {
    if (isNavOpen) {
        closeNav();
    } else {
        openNav();
    }
    isNavOpen = !isNavOpen;
}

// Opens the nav by either giving size or pushing an absolute position
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("navToggle").style.left = "220px";
}

// Closes the nav by either making zero size or absolute position of 30px
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("navToggle").style.left = "30px";
}