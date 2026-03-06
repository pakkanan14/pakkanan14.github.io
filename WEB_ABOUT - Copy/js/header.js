// ===== HAMBURGER MENU =====
function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("show");
}


// ===== ACADEMICS DROPDOWN =====
function toggleAcademicsDropdown(event) {
    event.preventDefault();

    const menu = document.getElementById("academicsDropdown");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}


// ===== ADMISSION DROPDOWN =====
function toggleAdmissionDropdown(event) {
    event.preventDefault();

    const menu = document.getElementById("admissionDropdown");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}


// ===== STUDENT SERVICES DROPDOWN =====
function toggleDropdown(event) {
    event.preventDefault();

    const menu = document.getElementById("studentDropdown");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}


// ===== SIDE MENU =====
function toggleSubMenu(event) {
    event.preventDefault();

    const menu = document.getElementById("subMenu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}


// ===== ACADEMICS SUB MENU =====
function toggleAcademicsSubMenu(event) {
    event.preventDefault();

    const menu = document.getElementById("academicsSubMenu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}


// ===== ADMISSION SUB MENU =====
function toggleAdmissionSubMenu(event) {
    event.preventDefault();

    const menu = document.getElementById("admissionSubMenu");

    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}