(function(){
  const $ = (id)=>document.getElementById(id);

  // Elements
  const elMissing = $('missingData');
  const elStatus = $('statusCard');
  const elProbNotice = $('probationNotice');
  const elResultNotice = $('resultNotice');
  const elResultSummary = $('resultSummary');

  // Academic Status UI (badge + card)
  const elAcademicCard = $('academicStatusCard');
  const elStatusPill = $('statusPill');
  const elStatusPillText = $('statusPillText');
  const elStatusTitle = $('statusTitle');
  const elStatusDesc = $('statusDesc');
  const elStatusNote = $('statusNote');
  const elStatusNoteText = $('statusNoteText');

  // Inputs
  const inCurrentGPA = $('currentGPA');
  const inEarned = $('earnedCredits');
  const inTotal = $('totalCredits');
  const inRemaining = $('remainingCredits');
  const inProbTh = $('probationThreshold');
  const inNoProb = $('noProbationTarget');
  const inSafe = $('safeTarget');
  const selGoal = $('goalSelect');
  const inTarget = $('targetGPA');

  // Buttons
  const btnSync = $('syncBtn');
  const btnClear = $('clearBtn');
  const btnCalc = $('calcBtn');
  const btnRecalc = $('recalcBtn');

  function readNum(el){
    const v = Number(el.value);
    return Number.isFinite(v) ? v : NaN;
  }

  function clamp(n, a, b){
    return Math.min(b, Math.max(a, n));
  }

  function setNotice(el, msg, type){
    el.hidden = !msg;
    el.classList.toggle('notice--error', type === 'error');
    if(msg) el.textContent = msg;
  }

  function fmt(n, digits=2){
    if(!Number.isFinite(n)) return '–';
    return n.toFixed(digits);
  }

  function updateAcademicStatusUI(gpax){
    if(!elAcademicCard) return;

    const minTh = clamp(readNum(inProbTh), 0, 4);
    // “เฝ้าระวัง” ให้เป็นช่วงเหนือขั้นต่ำเล็กน้อย (ปรับได้ทีหลัง)
    const watchTh = clamp(minTh + 0.20, 0, 4);

    // reset
    if(elStatusPill){
      elStatusPill.classList.remove('status-pill--ok','status-pill--watch','status-pill--risk');
    }
    if(elStatusNote){
      elStatusNote.hidden = true;
      if(elStatusNoteText) elStatusNoteText.textContent = '';
    }

    if(!Number.isFinite(gpax)){
      elAcademicCard.dataset.level = 'watch';
      elStatusPill?.classList.add('status-pill--watch');
      if(elStatusPillText) elStatusPillText.textContent = 'สถานะ: รอข้อมูล';
      if(elStatusTitle) elStatusTitle.textContent = 'สถานะทางวิชาการ: รอข้อมูล';
      if(elStatusDesc) elStatusDesc.textContent = 'ไม่พบค่า GPAX สำหรับประเมินสถานะ กรุณากลับไปกรอกข้อมูลในหน้า Grade Calculator ก่อน';
      return;
    }

    if(gpax < minTh){
      elAcademicCard.dataset.level = 'risk';
      elStatusPill?.classList.add('status-pill--risk');
      if(elStatusPillText) elStatusPillText.textContent = 'สถานะ: ต่ำกว่าเกณฑ์';
      if(elStatusTitle) elStatusTitle.textContent = 'สถานะทางวิชาการ: ต่ำกว่าเกณฑ์ขั้นต่ำ';
      if(elStatusDesc) elStatusDesc.textContent =
        'ผลการเรียนเฉลี่ยสะสมต่ำกว่าเกณฑ์ขั้นต่ำของสถาบัน นักศึกษาควรวางแผนปรับปรุงผลการเรียนอย่างเร่งด่วน และติดตามคำแนะนำจากภาควิชาอย่างใกล้ชิด';
      if(elStatusNote && elStatusNoteText){
        elStatusNote.hidden = false;
        elStatusNoteText.textContent = 'หากมีสถานะภาคทัณฑ์อยู่แล้ว ควรให้ความสำคัญกับผลการเรียนในภาคการศึกษาถัดไปเป็นพิเศษ';
      }
      return;
    }

    if(gpax < watchTh){
      elAcademicCard.dataset.level = 'watch';
      elStatusPill?.classList.add('status-pill--watch');
      if(elStatusPillText) elStatusPillText.textContent = 'สถานะ: ควรเฝ้าระวัง';
      if(elStatusTitle) elStatusTitle.textContent = 'สถานะทางวิชาการ: ควรเฝ้าระวัง';
      if(elStatusDesc) elStatusDesc.textContent =
        'ผลการเรียนเฉลี่ยสะสมอยู่ใกล้เกณฑ์ขั้นต่ำของสถาบัน ขอแนะนำให้วางแผนการเรียนอย่างรอบคอบในภาคการศึกษาถัดไป เพื่อป้องกันความเสี่ยงต่อการถูกพิจารณาภาคทัณฑ์';
      return;
    }

    elAcademicCard.dataset.level = 'ok';
    elStatusPill?.classList.add('status-pill--ok');
    if(elStatusPillText) elStatusPillText.textContent = 'สถานะ: ปกติ';
    if(elStatusTitle) elStatusTitle.textContent = 'สถานะทางวิชาการ: ปกติ';
    if(elStatusDesc) elStatusDesc.textContent =
      'ผลการเรียนเฉลี่ยสะสม (GPAX) อยู่ในเกณฑ์ตามข้อบังคับของสถาบัน โปรดวางแผนการเรียนอย่างต่อเนื่องเพื่อรักษาหรือพัฒนาผลการเรียนให้เป็นไปตามเป้าหมาย';
  }

  function remainingCredits(){
    const earned = readNum(inEarned);
    const total = readNum(inTotal);
    if(!(earned >= 0) || !(total > 0)) return NaN;
    return Math.max(0, total - earned);
  }

  function loadFromStorage(){
    const gpa = localStorage.getItem('iote.currentGPA');
    const earned = localStorage.getItem('iote.earnedCredits');
    const total = localStorage.getItem('iote.totalCredits');

    // If nothing saved, show helper card
    if(!gpa && !earned && !total){
      elMissing.hidden = false;
    } else {
      elMissing.hidden = true;
      if(gpa) inCurrentGPA.value = gpa;
      if(earned) inEarned.value = earned;
      if(total) inTotal.value = total;
    }

    // Set remaining
    const rem = remainingCredits();
    if(Number.isFinite(rem)) inRemaining.value = String(rem);

    // Default target based on goal
    syncTargetFromGoal();
    showProbationWarning();
    computeAndRender();
  }

  function saveToStorage(){
    const gpa = readNum(inCurrentGPA);
    const earned = readNum(inEarned);
    const total = readNum(inTotal);

    if(!(gpa >= 0 && gpa <= 4)) return setNotice(elProbNotice, 'กรุณากรอก GPA 0.00–4.00 ก่อน', 'error');
    if(!(earned >= 0)) return setNotice(elProbNotice, 'กรุณากรอกหน่วยกิตสะสมให้ถูกต้อง', 'error');
    if(!(total > 0)) return setNotice(elProbNotice, 'กรุณากรอกหน่วยกิตทั้งหมดให้มากกว่า 0', 'error');
    if(earned > total) return setNotice(elProbNotice, 'หน่วยกิตสะสมต้องไม่มากกว่าหน่วยกิตทั้งหมด', 'error');

    localStorage.setItem('iote.currentGPA', String(gpa));
    localStorage.setItem('iote.earnedCredits', String(earned));
    localStorage.setItem('iote.totalCredits', String(total));

    const rem = remainingCredits();
    if(Number.isFinite(rem)) inRemaining.value = String(rem);

    setNotice(elProbNotice, 'บันทึก/ซิงก์แล้ว ✅');
    window.setTimeout(()=>setNotice(elProbNotice, ''), 1800);
    showProbationWarning();
  }

  function clearStorage(){
    localStorage.removeItem('iote.currentGPA');
    localStorage.removeItem('iote.earnedCredits');
    localStorage.removeItem('iote.totalCredits');
    inCurrentGPA.value = '';
    inEarned.value = '';
    inTotal.value = '';
    inRemaining.value = '';
    setNotice(elProbNotice, 'ล้างข้อมูลแล้ว', 'error');
    elMissing.hidden = false;
    computeAndRender();
  }

  function syncTargetFromGoal(){
    const noProb = clamp(readNum(inNoProb), 0, 4);
    const safe = clamp(readNum(inSafe), 0, 4);

    let target;
    switch(selGoal.value){
      case 'noProb': target = noProb; break;
      case 'safe': target = safe; break;
      case 'honor2': target = 3.25; break;
      case 'honor1': target = 3.50; break;
      case 'custom':
      default:
        target = clamp(readNum(inTarget), 0, 4);
        break;
    }
    inTarget.value = fmt(target);
  }

  function showProbationWarning(){
    const gpa = readNum(inCurrentGPA);
    const th = readNum(inProbTh);

    if(!(gpa >= 0) || !(th >= 0)){
      setNotice(elProbNotice, '');
      return;
    }

    // Update badge/card first
    updateAcademicStatusUI(gpa);

    if(gpa < th){
      setNotice(
        elProbNotice,
        `สถานะ: ต่ำกว่าเกณฑ์ขั้นต่ำ (GPAX ปัจจุบัน ${fmt(gpa)} < ${fmt(th)})\n` +
        `ข้อเสนอแนะ: พิจารณาตั้งเป้า “โหมดปลอดภัย” และวางแผนการเรียนให้สอดคล้องกับหน่วยกิตที่เหลือ`,
        'error'
      );
    } else {
      setNotice(elProbNotice, `สถานะ: อยู่ในเกณฑ์ขั้นต่ำ (GPAX ปัจจุบัน ${fmt(gpa)} ≥ ${fmt(th)})`);
    }
  }

  function computeRequiredAverage(targetGPA){
    const current = readNum(inCurrentGPA);
    const earned = readNum(inEarned);
    const total = readNum(inTotal);
    const remaining = readNum(inRemaining);

    if(!(current >= 0 && current <= 4)) return { ok:false, msg:'กรอก GPA ปัจจุบันให้ถูกต้อง' };
    if(!(earned >= 0)) return { ok:false, msg:'กรอกหน่วยกิตสะสมให้ถูกต้อง' };
    if(!(total > 0)) return { ok:false, msg:'กรอกหน่วยกิตทั้งหมดให้มากกว่า 0' };
    if(earned > total) return { ok:false, msg:'หน่วยกิตสะสมต้องไม่มากกว่าหน่วยกิตทั้งหมด' };
    if(!(remaining >= 0)) return { ok:false, msg:'หน่วยกิตที่เหลือต้องเป็นเลข >= 0' };

    // If remaining wasn't derived from total-earned, still allow but warn when inconsistent.
    const derivedRemaining = total - earned;

    const curPoints = current * earned;
    const targetPoints = targetGPA * total;

    if(remaining === 0){
      const finalGPA = earned === 0 ? 0 : (curPoints / total);
      return {
        ok:true,
        requiredAvg: 0,
        finalGPA,
        note: 'หน่วยกิตที่เหลือเป็น 0 — ระบบจะใช้ค่า GPA ปัจจุบันเป็นผลลัพธ์จบ'
      };
    }

    const requiredAvg = (targetPoints - curPoints) / remaining;
    return {
      ok:true,
      requiredAvg,
      derivedRemaining,
      curPoints,
      targetPoints
    };
  }

  function computeAndRender(){
    syncTargetFromGoal();
    showProbationWarning();

    const target = clamp(readNum(inTarget), 0, 4);
    const res = computeRequiredAverage(target);

    if(!res.ok){
      setNotice(elResultNotice, res.msg, 'error');
      elResultSummary.textContent = 'ใส่ข้อมูลให้ครบ แล้วกด “คำนวณ”';
      return;
    }

    const current = readNum(inCurrentGPA);
    const earned = readNum(inEarned);
    const total = readNum(inTotal);
    const remaining = readNum(inRemaining);
    const derivedRemaining = Number.isFinite(res.derivedRemaining) ? res.derivedRemaining : (total - earned);

    // Interpret
    const req = res.requiredAvg;

    // warnings
    let warning = '';
    if(remaining !== derivedRemaining){
      warning += `หมายเหตุ: หน่วยกิตที่เหลือที่กรอก (${remaining}) ไม่ตรงกับที่คำนวณจาก (หน่วยกิตทั้งหมด - หน่วยกิตสะสม) (${derivedRemaining}).\n`;
    }

    if(req > 4){
      warning += `จากการคำนวณ พบว่าค่าเฉลี่ยที่ต้องทำได้ในหน่วยกิตที่เหลือ ≈ ${fmt(req)} ซึ่งสูงกว่า 4.00\n`;
      warning += `อาจไม่สามารถบรรลุเป้าหมายนี้ได้ภายใต้หน่วยกิตที่เหลือปัจจุบัน กรุณาพิจารณาปรับเป้าหมายหรือทบทวนจำนวนหน่วยกิต`;
      setNotice(elResultNotice, warning.trim(), 'error');
    } else if(req < 0){
      warning += `ผลการคำนวณบ่งชี้ว่าคะแนนสะสมปัจจุบันเพียงพอสำหรับเป้าหมายที่เลือก (ในเชิงคณิตศาสตร์)`;
      setNotice(elResultNotice, warning.trim());
    } else {
      // probation-related extra warning
      const noProb = clamp(readNum(inNoProb), 0, 4);
      const probTh = clamp(readNum(inProbTh), 0, 4);
      if(current < probTh && target <= noProb){
        warning += `ข้อสังเกต: ปัจจุบันอยู่ต่ำกว่าเกณฑ์ขั้นต่ำ และเป้าหมายเลือกเพียง “ไม่ติดโปร”\n`;
        warning += `ขอแนะนำให้เลือก “โหมดปลอดภัย” เพื่อเพิ่มระยะเผื่อความเสี่ยง`;
        setNotice(elResultNotice, warning.trim(), 'error');
      } else {
        setNotice(elResultNotice, warning.trim());
      }
    }

    elResultSummary.textContent =
      `สรุป: GPA ปัจจุบัน ${fmt(current)} | หน่วยกิตสะสม ${earned} / ทั้งหมด ${total} | เหลือ ${remaining}\n` +
      `เป้าหมาย Target GPA = ${fmt(target)} → ต้องทำ “เกรดเฉลี่ยในหน่วยกิตที่เหลือ” ≈ ${fmt(req)} (คิดแบบเกรดเฉลี่ยรวม)`;
  }

  // Mobile side submenu toggle
  const sideToggle = document.getElementById('academicsSideToggle');
  const sideSub = document.getElementById('sideAcadSub');
  if(sideToggle && sideSub){
    sideToggle.addEventListener('click', (e)=>{
      e.preventDefault();
      sideSub.classList.toggle('show');
    });
  }

  // Events
  btnSync.addEventListener('click', ()=>{
    saveToStorage();
    computeAndRender();
  });
  btnClear.addEventListener('click', clearStorage);
  btnCalc.addEventListener('click', computeAndRender);
  btnRecalc.addEventListener('click', computeAndRender);

  selGoal.addEventListener('change', ()=>{
    syncTargetFromGoal();
    computeAndRender();
  });

  // Recalc on edits
  [inCurrentGPA, inEarned, inTotal, inRemaining, inProbTh, inNoProb, inSafe, inTarget].forEach((el)=>{
    el.addEventListener('input', ()=>{
      // When editing total/earned, keep remaining in sync unless user is actively editing remaining
      if(el === inEarned || el === inTotal){
        const rem = remainingCredits();
        if(Number.isFinite(rem)) inRemaining.value = String(rem);
      }
      computeAndRender();
    });
  });

  // Init
  window.addEventListener('DOMContentLoaded', loadFromStorage);
})();
