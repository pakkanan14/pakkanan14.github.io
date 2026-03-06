(function(){
  // Track config (1 degree = iot, 2 degree = dual)
  const TRACKS = {
    iot: {
      heroTitle: 'Why must choose\nIoT at KMITL ?',
      heroCta: 'หลักสูตรวิศวกรรมระบบไอโอทีและสารสนเทศ',
      pdf: '../assets/pdf/iot.pdf',
      kicker: 'IoT & Information Engineering',
      aboutTitle: "What's\nIoT Engineering?",
      badgeText: 'IoT Engineering',
      card01: "What's IoT\nEngineering?",
      vName: 'หลักสูตรวิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมระบบไอโอทีและสารสนเทศ',
      vCredit: '135 หน่วยกิต',
      tuitionPrice: '25,000 บาท<br/><span>ต่อภาคการศึกษา</span>',
      rightCardTitle: 'IoT Curriculum\nStructure',
      rightCardDesc: 'โครงสร้างหลักสูตร IoT<br/>เรียนรู้พื้นฐานวิศวกรรมไอโอที ตั้งแต่ระบบอุปกรณ์อัจฉริยะ การเชื่อมต่อเครือข่าย และการจัดการข้อมูล',
      roadmap: '../assets/img/roadmap-single.png',
      bullets: [
        {t:'Smart Learning Approach', d:'การเรียนรู้ผ่านการลงมือปฏิบัติจริงกับอุปกรณ์ IoT และระบบอัจฉริยะ'},
        {t:'Project-Based Learning', d:'เรียนรู้ผ่านโครงงานที่เชื่อมโยงกับปัญหาและการใช้งานจริง'},
        {t:'Future-Ready Skills', d:'พัฒนาทักษะเพื่อรองรับสายงานด้านเทคโนโลยีอัจฉริยะและอุตสาหกรรมดิจิทัล'}
      ],
      aboutDesc: 'หลักสูตรที่มุ่งพัฒนาทักษะด้าน Internet of Things (IoT) ผสานทฤษฎีและการปฏิบัติ เพื่อสร้างระบบอัจฉริยะที่ใช้งานได้จริง'
    },
    dual: {
      heroTitle: 'Why must choose\nDual Degree PhysIoT\nat KMITL?',
      heroCta: 'หลักสูตรฟิสิกส์อุตสาหกรรมและวิศวกรรมระบบไอโอทีและสารสนเทศ',
      pdf: '../assets/pdf/dual.pdf',
      kicker: 'Dual Degree PhysIoT',
      aboutTitle: "What's\nPhysicIoT?",
      badgeText: 'PhysicIoT',
      card01: "What's IoT\nPhysIoT?",
      vName: 'หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาฟิสิกส์อุตสาหกรรม + หลักสูตรวิศวกรรมศาสตรบัณฑิต สาขาวิชาวิศวกรรมระบบไอโอทีและสารสนเทศ',
      vCredit: '129 + 135 หน่วยกิต',
      tuitionPrice: '40,000 บาท<br/><span>ต่อภาคการศึกษา</span>',
      rightCardTitle: 'Advanced Careers\n& Research',
      rightCardDesc: 'รองรับเส้นทางอาชีพด้าน Physics, IoT Engineering, R&amp;D และเทคโนโลยีขั้นสูงในอนาคต',
      roadmap: '../assets/img/roadmap-dual.png',
      bullets: [
        {t:'Physics–IoT Integrated Learning', d:'การเรียนรู้แบบผสานฟิสิกส์ประยุกต์กับเทคโนโลยี IoT เพื่อความเข้าใจเชิงลึกของอุปกรณ์ เซนเซอร์ และระบบอัจฉริยะ'},
        {t:'Interdisciplinary Project-Based Learning', d:'เรียนรู้ผ่านโครงงานสหวิชาที่เชื่อมโยงฟิสิกส์ เทคโนโลยี และการแก้ปัญหาในสถานการณ์จริง'},
        {t:'Advanced & Future-Ready Skills', d:'พัฒนาทักษะขั้นสูง รองรับทั้งสายงานวิศวกรรมไอโอทีและสายงานฟิสิกส์ประยุกต์ เทคโนโลยี และงานวิจัยในอนาคต'}
      ],
      aboutDesc: 'หลักสูตร 2 ปริญญา (Double Degree) ที่พัฒนาทักษะด้าน Physics และ Internet of Things (IoT) แบบบูรณาการ ผสานความรู้เชิงทฤษฎีและการปฏิบัติ เพื่อสร้างระบบอัจฉริยะและเทคโนโลยีที่ใช้งานได้จริง'
    }
  };

  function setTrack(track){
    document.body.classList.remove('track-iot','track-dual');
    document.body.classList.add('track-' + (track === 'dual' ? 'dual' : 'iot'));
    const cfg = TRACKS[track] || TRACKS.iot;

    // hero title
    const heroTitle = document.getElementById('heroTitle');
    if(heroTitle) heroTitle.innerHTML = cfg.heroTitle.replace(/\n/g,'<br/>');

    const heroCta = document.getElementById('heroCta');
    if(heroCta){ heroCta.querySelector('.hero__ctaText').innerHTML = cfg.heroCta; heroCta.setAttribute('href', cfg.pdf); heroCta.setAttribute('target','_blank'); }

    const kicker = document.getElementById('kicker');
    if(kicker) kicker.textContent = cfg.kicker;

    // about
    const aboutTitle = document.getElementById('aboutTitle');
    if(aboutTitle){
      const parts = cfg.aboutTitle.split('\n');
      aboutTitle.innerHTML = `${parts[0]}<br/><span>${parts[1] || ''}</span>`;
    }
    const badgeText = document.getElementById('badgeText');
    if(badgeText) badgeText.innerHTML = cfg.badgeText;

    const card01 = document.getElementById('card01');
    if(card01) card01.innerHTML = cfg.card01.replace(/\n/g,'<br/>');

    const aboutDesc = document.getElementById('aboutDesc');
    if(aboutDesc) aboutDesc.textContent = cfg.aboutDesc;

    // bullets
    const ids = ['b1','b1d','b2','b2d','b3','b3d'];
    const vals = [cfg.bullets[0].t,cfg.bullets[0].d,cfg.bullets[1].t,cfg.bullets[1].d,cfg.bullets[2].t,cfg.bullets[2].d];
    ids.forEach((id,i)=>{
      const el = document.getElementById(id);
      if(el) el.textContent = vals[i];
    });

    // course details
    const vName = document.getElementById('vName');
    if(vName) vName.textContent = cfg.vName;

    const vCredit = document.getElementById('vCredit');
    if(vCredit) vCredit.textContent = cfg.vCredit;

    const tuitionPrice = document.getElementById('tuitionPrice');
    if(tuitionPrice) tuitionPrice.innerHTML = cfg.tuitionPrice;

    const rightCardTitle = document.getElementById('rightCardTitle');
    if(rightCardTitle) rightCardTitle.innerHTML = cfg.rightCardTitle.replace(/\n/g,'<br/>');

    const rightCardDesc = document.getElementById('rightCardDesc');
    if(rightCardDesc) rightCardDesc.innerHTML = cfg.rightCardDesc;

    // roadmap
    const roadmapImg = document.getElementById('roadmapImg');
    if(roadmapImg) roadmapImg.src = cfg.roadmap;

    // keep URL in sync (so dropdown links also work)
    const url = new URL(window.location.href);
    url.searchParams.set('track', track);
    window.history.replaceState({}, '', url.toString());
  }

  // Initial track from query param
  const initTrack = new URL(window.location.href).searchParams.get('track');
  setTrack((initTrack && TRACKS[initTrack]) ? initTrack : 'iot');

  // Mobile side submenu toggle
  const sideToggle = document.getElementById('academicsSideToggle');
  const sideSub = document.getElementById('sideAcadSub');
  if(sideToggle && sideSub){
    sideToggle.addEventListener('click', (e)=>{
      e.preventDefault();
      sideSub.classList.toggle('show');
    });
  }
})();
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("[data-nav]");

  navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("data-nav");
      if (target) {
        window.location.href = target;
      }
    });
  });
});