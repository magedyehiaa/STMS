// تتبع الحضور
let attendance = [];

// تحميل البيانات من Local Storage عند تحميل الصفحة
function loadAttendance() {
    const savedAttendance = localStorage.getItem('attendance');
    if (savedAttendance) {
        attendance = JSON.parse(savedAttendance);
    }
    displayAttendance();
}

// تسجيل الحضور
function markAttendance() {
    const name = document.getElementById('participant-name').value;
    const team = document.getElementById('team-selection').value;
    if (name) {
        const record = {
            name: name,
            team: team,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        };
        attendance.push(record);
        document.getElementById('participant-name').value = '';
        displayAttendance();
        saveAttendance(); // حفظ البيانات في Local Storage
    }
}

// عرض سجلات الحضور
function displayAttendance() {
    const attendanceList = document.getElementById('attendance-list');
    attendanceList.innerHTML = '';
    attendance.forEach(record => {
        attendanceList.innerHTML += `<li>${record.name} - ${record.team} - ${record.date} - ${record.time}</li>`;
    });
}

// حفظ البيانات في Local Storage
function saveAttendance() {
    localStorage.setItem('attendance', JSON.stringify(attendance));
}

// تصدير البيانات إلى ملف Excel
function exportToExcel() {
    if (attendance.length > 0) {
        const ws = XLSX.utils.json_to_sheet(attendance);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
        XLSX.writeFile(wb, 'attendance.xlsx');
    } else {
        alert("لا توجد بيانات لتصديرها.");
    }
}

// عرض الأقسام المختلفة عند الضغط على الأزرار في شريط التنقل
function showSection(section) {
    const fileSection = document.getElementById('file-section');
    const attendanceSection = document.getElementById('attendance-section');

    if (section === 'file') {
        fileSection.style.display = 'block';
        attendanceSection.style.display = 'none';
    } else if (section === 'attendance') {
        fileSection.style.display = 'none';
        attendanceSection.style.display = 'block';
    }
}

// تحميل البيانات عند تحميل الصفحة
loadAttendance();
