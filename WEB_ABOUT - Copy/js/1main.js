document.addEventListener("DOMContentLoaded", function(){

/* ================= SLIDER ================= */

let current = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const total = slides.length;

function updateCarousel(){
    slides.forEach(slide=>{
        slide.classList.remove("active","left","right");
    });

    dots.forEach(dot=>{
        dot.classList.remove("active");
    });

    if(slides.length > 0){
        slides[current].classList.add("active");
        dots[current].classList.add("active");

        let prevIndex = (current - 1 + total) % total;
        let nextIndex = (current + 1) % total;

        slides[prevIndex].classList.add("left");
        slides[nextIndex].classList.add("right");
    }
}

const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

if(nextBtn && prevBtn){
    nextBtn.addEventListener("click", ()=>{
        current = (current + 1) % total;
        updateCarousel();
    });

    prevBtn.addEventListener("click", ()=>{
        current = (current - 1 + total) % total;
        updateCarousel();
    });
}

dots.forEach((dot,index)=>{
    dot.addEventListener("click", ()=>{
        current = index;
        updateCarousel();
    });
});


/* ================= MENU ================= */

const hamburger = document.querySelector(".hamburger");
const sideMenu = document.getElementById("menu");
const closeBtn = document.querySelector(".close-btn");
const menuLinks = document.querySelectorAll(".menu a");

if(hamburger && sideMenu){
    hamburger.addEventListener("click", ()=>{
        sideMenu.classList.add("show");
    });
}

if(closeBtn){
    closeBtn.addEventListener("click", ()=>{
        sideMenu.classList.remove("show");
    });
}

menuLinks.forEach(link=>{
    link.addEventListener("click", function(){
        menuLinks.forEach(l=>l.classList.remove("active"));
        this.classList.add("active");
    });
});


/* ================= NEWS TAB SWITCH ================= */

const tabs = document.querySelectorAll(".tab");
const newsGroups = document.querySelectorAll(".news-group");

tabs.forEach(tab=>{
    tab.addEventListener("click", function(){

        tabs.forEach(t=>t.classList.remove("active"));
        this.classList.add("active");

        newsGroups.forEach(group=>{
            group.style.display = "none";
        });

        const target = this.dataset.target;
        const targetGroup = document.getElementById(target);

        if(targetGroup){
            targetGroup.style.display = "block";
        }
    });
});


/* ================= PROJECT SLIDER ================= */

const track = document.querySelector(".projects-track");
const prevProject = document.querySelector(".project-prev");
const nextProject = document.querySelector(".project-next");
const cards = document.querySelectorAll(".project-card");

let index = 0;

function getVisibleCards(){
    return window.innerWidth <= 768 ? 1 : 3;
}

function updateSlide(){
    if(!cards.length) return;
    const cardWidth = cards[0].offsetWidth + 40;
    track.style.transform = `translateX(-${cardWidth * index}px)`;
}

if(nextProject){
    nextProject.addEventListener("click", ()=>{
        const maxIndex = cards.length - getVisibleCards();
        if(index < maxIndex){
            index++;
            updateSlide();
        }
    });
}

if(prevProject){
    prevProject.addEventListener("click", ()=>{
        if(index > 0){
            index--;
            updateSlide();
        }
    });
}

window.addEventListener("resize", ()=>{
    index = 0;
    updateSlide();
});


/* ================= SCROLL TOP ================= */

const scrollBtn = document.querySelector(".scroll-top");

if(scrollBtn){
    scrollBtn.addEventListener("click", ()=>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* ================= CURRICULUM POPUP ================= */

const popup = document.getElementById("curriculumPopup");
const popupClose = document.getElementById("popupClose");
const learnBtns = document.querySelectorAll(".learn-more");

const popupTitle = document.getElementById("popupTitle");
const popupName = document.getElementById("popupName");
const popupLevel = document.getElementById("popupLevel");
const popupYear = document.getElementById("popupYear");
const pdfBtn = document.getElementById("popupPdfBtn");

if(popup && popupClose){

    learnBtns.forEach(btn=>{
        btn.addEventListener("click", function(e){
            e.preventDefault();

            popupTitle.textContent = this.dataset.title;
            popupName.textContent = this.dataset.name;
            popupLevel.textContent = this.dataset.level;
            popupYear.textContent = this.dataset.year;

            popup.classList.add("show");
        });
    });
document.querySelectorAll(".learn-more").forEach(button => {
    button.addEventListener("click", function(e) {
        e.preventDefault();

        document.getElementById("popupTitle").textContent = this.dataset.title;
        document.getElementById("popupName").textContent = this.dataset.name;
        document.getElementById("popupLevel").textContent = this.dataset.level;
        document.getElementById("popupYear").textContent = this.dataset.year;

        pdfBtn.href = this.dataset.pdf;   // 
        document.getElementById("curriculumPopup").classList.add("show");
    });
});

    popupClose.addEventListener("click", ()=>{
        popup.classList.remove("show");
    });

}

/* ================= VIEW ALL NEWS POPUP ================= */

const viewBtn = document.querySelector(".view-btn");
const allNewsPopup = document.getElementById("allNewsPopup");
const allNewsClose = document.getElementById("allNewsClose");
const allNewsList = document.getElementById("allNewsList");

viewBtn.addEventListener("click", function(){

    allNewsList.innerHTML = "";

    // ดึงข่าวทั้งหมดจากทุกกลุ่ม
    const allItems = document.querySelectorAll(".news-group .news-item");

    allItems.forEach(item=>{
        const clone = item.cloneNode(true);
        allNewsList.appendChild(clone);
    });

    allNewsPopup.classList.add("show");
});

allNewsClose.addEventListener("click", function(){
    allNewsPopup.classList.remove("show");
});


});
// ลบอันเก่าออกทั้งหมดแล้ววางอันนี้แทนที่ท้ายไฟล์ (นอก DOMContentLoaded)
function toggleSubMenu(event) {
    event.preventDefault();
    event.stopPropagation(); // เพิ่มบรรทัดนี้เพื่อไม่ให้ event ไปกวนเมนูหลัก
    
    const subMenu = document.getElementById("subMenu");
    if (subMenu) {
        subMenu.classList.toggle("open");
    }
}
