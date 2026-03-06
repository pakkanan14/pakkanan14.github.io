// ===============================
// โหลดไฟล์ Excel อัตโนมัติ
// ===============================

let subjectDB = [];
let selectedSubjects = [];
let subjectGroups = [];

const groupDisplayMap = {
    core: "Core",
    elective: "Elective",
    core_engineering: "Core Engineering",
    core_science: "Core Science",
    gened_ed_science: "GenEd Science"
};
window.addEventListener("DOMContentLoaded", () => {
    loadExcel();        // dual
    loadSingleExcel();  // single
});

function loadExcel() {

    fetch("datagrade.xlsx")
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            subjectDB = XLSX.utils.sheet_to_json(worksheet);
            subjectGroups = [...new Set(subjectDB.map(sub => sub.group))];
            console.log("โหลดรายวิชาแล้ว:", subjectDB.length);
            console.log("ประเภทที่มี:", subjectGroups);
        })
        .catch(error => {
            console.error("โหลดไฟล์ไม่สำเร็จ", error);
        });
}

// ===============================จ
// ค้นหารหัสวิชา
// ===============================
function searchSubject() {

    const input = document.getElementById("subjectInput").value.trim();
    const resultBox = document.getElementById("searchResult");
    resultBox.innerHTML = "";

    if (!input) return;

    const results = subjectDB.filter(sub =>
        String(sub.code).includes(input)
    );

    results.forEach(sub => {

        const div = document.createElement("div");
        div.className = "search-item";
        div.innerText = `${sub.code} - ${sub.name}`;
        div.onclick = () => addSubject(sub);

        resultBox.appendChild(div);
    });
}

// ===============================
// เพิ่มวิชา
// ===============================
function addSubject(sub) {


    if (selectedSubjects.find(s => s.code === sub.code)) {
        alert("เพิ่มวิชานี้แล้ว");
        return;
    }

    selectedSubjects.push(sub);

    const tableBody = document.querySelector("#gradeTable tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${sub.code}</td>
        <td>${sub.name}</td>
        <td>${sub.credit}</td>
        <td>${sub.group || "-"}</td>
        <td>
            <select>
                <option value="">เลือก</option>
                <option value="4">A</option>
                <option value="3.5">B+</option>
                <option value="3">B</option>
                <option value="2.5">C+</option>
                <option value="2">C</option>
                <option value="1.5">D+</option>
                <option value="1">D</option>
                <option value="0">F</option>
                <option value="S">S</option>
                <option value="U">U</option>
            </select>
        </td>
<td>
   <button class="delete-btn" onclick="removeSubject('${sub.code}', this)">✕</button>
</td>

    `;

    tableBody.appendChild(row);

    document.getElementById("searchResult").innerHTML = "";
    document.getElementById("subjectInput").value = "";
}

// ===============================
// ลบวิชา
// ===============================
function removeSubject(code, btn) {

    selectedSubjects = selectedSubjects.filter(s => s.code !== code);
    btn.parentElement.parentElement.remove();
}

// ===============================
// คำนวณ GPA
// ===============================
function calculateGPA() {

    let sciTotal = 0, sciCredit = 0;
    let engTotal = 0, engCredit = 0;
    let totalTotal = 0, totalCredit = 0;

    const rows = document.querySelectorAll("#gradeTable tbody tr");

    rows.forEach((row, index) => {

        const gradeValue = row.querySelector("select").value;
        const sub = selectedSubjects[index];

        if (!sub) return;
        if (gradeValue === "") return;

        const credit = parseFloat(sub.credit);

        const sciFlag = String(sub.core_science).toUpperCase();
        const engFlag = String(sub.core_engineering).toUpperCase();

        // ✅ ถ้าเป็น S → นับเครดิต แต่ไม่คิดคะแนน
        if (gradeValue === "S") {

            if (sciFlag === "TRUE" || sciFlag === "1") {
                sciCredit += credit;
            }

            if (engFlag === "TRUE" || engFlag === "1") {
                engCredit += credit;
            }

            totalCredit += credit;
            return;
        }

        // ❌ ถ้าเป็น U → ไม่เอาเลย
        if (gradeValue === "U") return;

        const grade = parseFloat(gradeValue);

        // วิทยาศาสตร์
        if (sciFlag === "TRUE" || sciFlag === "1") {
            sciTotal += grade * credit;
            sciCredit += credit;
        }

        // วิศวกรรม
        if (engFlag === "TRUE" || engFlag === "1") {
            engTotal += grade * credit;
            engCredit += credit;
        }

        totalTotal += grade * credit;
        totalCredit += credit;
    });

    const sciGPA = sciCredit ? (sciTotal / sciCredit).toFixed(2) : "-";
    const engGPA = engCredit ? (engTotal / engCredit).toFixed(2) : "-";
    const totalGPA = totalCredit ? (totalTotal / totalCredit).toFixed(2) : "-";

    document.getElementById("sciGPA").innerText = sciGPA;
    document.getElementById("engGPA").innerText = engGPA;
    document.getElementById("totalGPA").innerText = totalGPA;

    document.getElementById("sciCredit").innerText = sciCredit;
    document.getElementById("engCredit").innerText = engCredit;
    document.getElementById("totalCredit").innerText = totalCredit;
}




// ===============================
// SINGLE DEGREE SYSTEM
// ===============================
let singleSubjectDB = [];

function loadSingleExcel() {
    fetch("datagrade1.xlsx")
        .then(res => res.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            singleSubjectDB = XLSX.utils.sheet_to_json(sheet);
        });
}
let singleSelectedSubjects = [];

function searchSingleSubject() {

    const input = document.getElementById("singleSubjectInput").value.trim();
    const resultBox = document.getElementById("singleSearchResult");
    resultBox.innerHTML = "";

    if (!input) return;

    const results = singleSubjectDB.filter(sub =>
        String(sub.code).includes(input)
    );

    results.forEach(sub => {

        const div = document.createElement("div");
        div.className = "search-item";
        div.innerText = `${sub.code} - ${sub.name}`;
        div.onclick = () => addSingleSubject(sub);

        resultBox.appendChild(div);
    });
}

function addSingleSubject(sub) {

    if (singleSelectedSubjects.find(s => s.code === sub.code)) {
        alert("เพิ่มวิชานี้แล้ว");
        return;
    }

    singleSelectedSubjects.push(sub);

    const tableBody = document.querySelector("#singleGradeTable tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${sub.code}</td>
        <td>${sub.name}</td>
        <td>${sub.credit}</td>
        <td>
            <select>
                <option value="">เลือก</option>
                <option value="4">A</option>
                <option value="3.5">B+</option>
                <option value="3">B</option>
                <option value="2.5">C+</option>
                <option value="2">C</option>
                <option value="1.5">D+</option>
                <option value="1">D</option>
                <option value="0">F</option>
                <option value="S">S</option>
                <option value="U">U</option>
            </select>
        </td>
        <td>
   <button class="delete-btn" onclick="removeSingleSubject('${sub.code}', this)">✕</button>
</td>
    `;

    tableBody.appendChild(row);

    document.getElementById("singleSubjectInput").value = "";
    document.getElementById("singleSearchResult").innerHTML = "";
}

function removeSingleSubject(code, btn) {

    singleSelectedSubjects =
        singleSelectedSubjects.filter(s => s.code !== code);

    btn.closest("tr").remove();

    calculateSingleGPA();
}

function calculateSingleGPA() {

    let totalScore = 0;
    let totalCredit = 0;

    const rows =
        document.querySelectorAll("#singleGradeTable tbody tr");

    rows.forEach((row, index) => {

        const gradeValue = row.querySelector("select").value;
        const sub = singleSelectedSubjects[index];

        if (!sub) return;
        if (gradeValue === "") return;

        const credit = parseFloat(sub.credit);

        // ถ้าเป็น S → นับเครดิต แต่ไม่คิดเกรด
        if (gradeValue === "S") {
            totalCredit += credit;
            return;
        }

        // ถ้าเป็น U → ไม่นับทั้งเกรดและเครดิต
        if (gradeValue === "U") return;

        const grade = parseFloat(gradeValue);

        totalScore += grade * credit;
        totalCredit += credit;
    });

    const gpa = totalCredit
        ? (totalScore / totalCredit).toFixed(2)
        : "-";

    document.getElementById("singleTotalCredit").innerText = totalCredit;
    document.getElementById("singleGPA").innerText = gpa;
}

function addManualRow() {

    const tableBody = document.querySelector("#gradeTable tbody");
    const row = document.createElement("tr");

    const typeOptions = Object.keys(groupDisplayMap).map(key =>
        `<option value="${key}">${groupDisplayMap[key]}</option>`
    ).join("");
    row.innerHTML = `
        <td><input type="text" class="manual-code" placeholder="รหัส"></td>
        <td><input type="text" class="manual-name" placeholder="ชื่อวิชา"></td>
        <td><input type="number" class="manual-credit" placeholder="หน่วยกิต" min="0" step="0.5"></td>
        <td>
            <select class="manual-group">
                ${typeOptions}
            </select>
        </td>
        <td>
            <select>
                <option value="">เลือก</option>
                <option value="4">A</option>
                <option value="3.5">B+</option>
                <option value="3">B</option>
                <option value="2.5">C+</option>
                <option value="2">C</option>
                <option value="1.5">D+</option>
                <option value="1">D</option>
                <option value="0">F</option>
                <option value="S">S</option>
                <option value="U">U</option>
            </select>
        </td>
<td>
    <div style="display:flex; flex-direction:row; gap:4px; justify-content:center; align-items:center;">
        <button class="save-btn" onclick="saveManualSubject(this)">✔</button>
        <button class="delete-btn" onclick="this.closest('tr').remove()">✕</button>
    </div>
</td>
    `;

    tableBody.appendChild(row);
}

function saveManualSubject(btn) {

    const row = btn.closest("tr");

    const code = row.querySelector(".manual-code").value.trim();
    const name = row.querySelector(".manual-name").value.trim();
    const credit = parseFloat(row.querySelector(".manual-credit").value);
    const group = row.querySelector(".manual-group").value;

    if (!code || !name || isNaN(credit) || !group) {
        alert("กรอกข้อมูลให้ครบ");
        return;
    }

    const template = subjectDB.find(s => s.group === group);

    const newSubject = {
        code: code,
        name: name,
        credit: credit,
        group: group,
        core: template?.core || 0,
        elective: template?.elective || 0,
        core_engineering: template?.core_engineering || 0,
        core_science: template?.core_science || 0,
        gened_ed_science: template?.gened_ed_science || 0
    };

    selectedSubjects.push(newSubject);

    // 🔥 ดึง select เกรด "ตัวจริง"
    const gradeSelect = row.querySelectorAll("select")[1];

    // ล้าง row
    row.innerHTML = "";

    // สร้าง td ใหม่
    row.insertCell().innerText = code;
    row.insertCell().innerText = name;
    row.insertCell().innerText = credit;
    row.insertCell().innerText = groupDisplayMap[group] || group;

    const gradeCell = row.insertCell();
    gradeCell.appendChild(gradeSelect); // 👈 ย้าย element เดิม

    const deleteCell = row.insertCell();
    deleteCell.innerHTML =
        `<button class="delete-btn" onclick="removeSubject('${code}', this)">✕</button>`;
}

function addSingleManualRow() {

    const tableBody = document.querySelector("#singleGradeTable tbody");
    const row = document.createElement("tr");

    row.innerHTML = `
        <td><input type="text" class="single-manual-code" placeholder="รหัส"></td>
        <td><input type="text" class="single-manual-name" placeholder="ชื่อวิชา"></td>
        <td><input type="number" class="single-manual-credit" placeholder="หน่วยกิต" min="0" step="0.5"></td>
        <td>
            <select>
                <option value="">เลือก</option>
                <option value="4">A</option>
                <option value="3.5">B+</option>
                <option value="3">B</option>
                <option value="2.5">C+</option>
                <option value="2">C</option>
                <option value="1.5">D+</option>
                <option value="1">D</option>
                <option value="0">F</option>
                <option value="S">S</option>
                <option value="U">U</option>
            </select>
        </td>
<td>
    <div style="display:flex; flex-direction:row; gap:4px; justify-content:center; align-items:center;">
        <button class="save-btn" onclick="saveSingleManualSubject(this)">✔</button>
        <button class="delete-btn" onclick="this.closest('tr').remove()">✕</button>
    </div>
</td>
    `;

    tableBody.appendChild(row);
}
function saveSingleManualSubject(btn) {

    const row = btn.closest("tr");

    const code = row.querySelector(".single-manual-code").value.trim();
    const name = row.querySelector(".single-manual-name").value.trim();
    const credit = parseFloat(row.querySelector(".single-manual-credit").value);

    if (!code || !name || isNaN(credit)) {
        alert("กรอกข้อมูลให้ครบ");
        return;
    }

    const gradeSelect = row.querySelector("select");

    // เพิ่มเข้า array
    singleSelectedSubjects.push({
        code: code,
        name: name,
        credit: credit
    });

    // เปลี่ยน row เป็นโหมดปกติ
    row.innerHTML = "";

    row.insertCell().innerText = code;
    row.insertCell().innerText = name;
    row.insertCell().innerText = credit;

    const gradeCell = row.insertCell();
    gradeCell.appendChild(gradeSelect);

    const deleteCell = row.insertCell();
    deleteCell.innerHTML =
        `<button class="delete-btn" onclick="removeSingleSubject('${code}', this)">✕</button>`;
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