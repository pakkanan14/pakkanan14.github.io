
  // ── 1. TOGGLE MENU ─────────────────────────────────────────
  // เปิด/ปิด dropdown menu บน mobile
  // เพิ่ม/ลบ class "open" ให้กับปุ่ม hamburger และ nav menu
function toggleMenu() {
  document.getElementById('menu').classList.toggle('show');
}

  // ── 2. SWITCH TAB ───────────────────────────────────────────
  // สลับระหว่าง 3 แท็บหลักสูตร
  // @param tab  - ชื่อแท็บ: 'iot' | 'dual' | 'physics'
  // @param btn  - element ปุ่มที่ถูกคลิก (this)
  function switchTab(tab, btn) {
    // ซ่อนทุก content section
    ['iot', 'dual', 'physics'].forEach(id =>
      document.getElementById('tab-' + id).classList.remove('active')
    );
    // ลบ active state จากทุกปุ่ม
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    // แสดง section ที่เลือก + mark ปุ่มเป็น active
    document.getElementById('tab-' + tab).classList.add('active');
    btn.classList.add('active');

    // เลื่อนกลับขึ้นบนสุดของหน้า
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ── 3-5. CAROUSEL ──────────────────────────────────────────
  // ใช้เฉพาะใน Tab 2 (Dual Degree)
  // เก็บ state: slide ปัจจุบัน และจำนวนสไลด์ทั้งหมด
  let currentSlide = 0;
  // จำนวนสไลด์อ้างอิงจาก DOM เพื่อให้แก้ไขภาพได้ง่าย
  const totalSlides = document.querySelectorAll('.carousel-slide').length;

  // เลื่อน carousel ด้วยปุ่ม prev (-1) หรือ next (+1)
  // ใช้ modulo (%) เพื่อวนรอบ: หลังสุด → กลับต้น
  function moveCarousel(dir) {
    currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
    updateCarousel();
  }

  // กระโดดไปสไลด์ที่ต้องการโดยตรง (เมื่อกด dot)
  function goToSlide(i) {
    currentSlide = i;
    updateCarousel();
  }

  // อัปเดต UI: เลื่อน track ด้วย CSS transform + sync dots
  function updateCarousel() {
    // เลื่อน carousel track ตาม slide ปัจจุบัน
    document.getElementById('carouselTrack').style.transform =
      `translateX(-${currentSlide * 100}%)`;

    // อัปเดต dot: active = dot ที่ตรงกับ slide ปัจจุบัน
    document.querySelectorAll('.cdot').forEach((d, i) =>
      d.classList.toggle('active', i === currentSlide)
    );
  }

  // ลบอันเก่าออกทั้งหมดแล้ววางอันนี้แทนที่ท้ายไฟล์ (นอก DOMContentLoaded)
function toggleSubMenu(event) {
    event.preventDefault();
    event.stopPropagation(); // เพิ่มบรรทัดนี้เพื่อไม่ให้ event ไปกวนเมนูหลัก
    
    const subMenu = document.getElementById("subMenu");
    if (subMenu) {
        subMenu.classList.toggle("open");
    }
}

