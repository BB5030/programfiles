const hostName = window.location.hostname;
const hostProfileUrl = '/profile/';
const hostUserUrl = '/login/';

function userInfo(){
    $.ajax({
        url: hostProfileUrl + 'user-info.php',
        type: 'GET',
        success: function(response) {   
            const userProfile = JSON.parse(response);
                              
            $('#name').text(userProfile[0].name);
            $('#phone').text(userProfile[0].phone);
            $('#email').text(userProfile[0].email);
        }
    })
}

async function schoolInfo() {
    try {
        const response = await $.ajax({
            url: hostProfileUrl + 'school-info.php',
            type: 'GET'
        });
        let schoolInfos = JSON.parse(response);

        let template = '';
        schoolInfos.forEach(sInfo => {
            template += `
                <tr>
                    <td class="hidden-row">${sInfo.idx}</td>
                    <td>${sInfo.period}</td>
                    <td>${sInfo.shcool}</td>
                    <td>${sInfo.major || ''}</td>
                    <td><button class="deleteButton" onclick="deleteSchool()">삭제</button></td>
                </tr>`;
        });
        $('#schoolInfos').html(template);
    } catch (error) {
        console.error('Error in schoolInfo:', error);
    }
}

function addSchool() {
    var period = document.getElementById('sPeriod').value;
    var school = document.getElementById('school').value;
    var major = document.getElementById('major').value;
    
    if (period.trim() === '' || school.trim() === '') {
        alert('모든 필수 입력란을 채워주세요.');
        return;
    }

    var formData = new FormData();
    formData.append('period', period);
    formData.append('school', school);
    formData.append('major', major);
    
    var confirmAdd = confirm('추가 하시겠습니까?');
    if(!confirmAdd) return;

    $.ajax({
        url: hostProfileUrl + 'school-add.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            if(response.result == "ok"){
                fetchUserProfile();
            }
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
        
    var form = document.getElementById("addSchoolForm");
    form.reset();
}

function deleteSchool() {
    var confirmDelete = confirm('삭제 하시겠습니까?');
    var button = event.target;
    var parentRow = button.parentNode.parentNode;
    var idx = parentRow.querySelector('td:first-child').innerText;
    var formData = new FormData();
    
    formData.append('idx', idx);
    
    if(confirmDelete){
        $.ajax({
        url: hostProfileUrl + 'school-delete.php',
            type: 'POST',
            data: formData,
           contentType: false,
            processData: false,
            success: function(response) {
                if(response.result == "ok"){
                    fetchUserProfile();
                }
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    }
}

async function certInfo() {
    try {
        const response = await $.ajax({
            url: hostProfileUrl + 'cert-info.php',
            type: 'GET'
        });
        let certInfos = JSON.parse(response);

        let template = '';
        certInfos.forEach(cInfo => {
            template += `
                <tr>
                    <td class="hidden-row">${cInfo.idx}</td>
                    <td>${cInfo.cert}</td>
                    <td>${cInfo.grade}</td>
                    <td>${cInfo.authority}</td>
                    <td><button class="deleteButton" onclick="deleteCert()">삭제</button></td>
                </tr>`;
        });
        $('#certInfos').html(template);
    } catch (error) {
        console.error('Error in certInfo:', error);
    }
}

function addCert() {
    var cert = document.getElementById('cert').value;
    var grade = document.getElementById('grade').value;
    var authority = document.getElementById('authority').value;
    
    if (cert.trim() === '' || grade.trim() === ''  || authority.trim() === '') {
        alert('모든 필수 입력란을 채워주세요.');
        return;
    }

    var formData = new FormData();
    formData.append('cert', cert);
    formData.append('grade', grade);
    formData.append('authority', authority);

    var confirmAdd = confirm('추가 하시겠습니까?');
    if(!confirmAdd) return;
    
    $.ajax({
        url: hostProfileUrl + 'cert-add.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            if(response.result == "ok"){
                fetchUserProfile();
            }
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
    
    var form = document.getElementById("addCertForm");
    form.reset();
}

function deleteCert() {
    var confirmDelete = confirm('삭제 하시겠습니까?');
    if(!confirmDelete){
        return;
    }
    
    var button = event.target;
    var parentRow = button.parentNode.parentNode;
    var idx = parentRow.querySelector('td:first-child').innerText;
    var formData = new FormData();
    formData.append('idx', idx);
    


    $.ajax({
        url: hostProfileUrl + 'cert-delete.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            if(response.result == "ok"){
                fetchUserProfile();
            }
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

async function workInfo() {
    try {
        const response = await $.ajax({
            url: hostProfileUrl + 'work-info.php',
            type: 'GET'
        });
        let workInfos = JSON.parse(response);

        let template = '';
        workInfos.forEach(wInfo => {
            template += `
                <div class="workDiv">
                    <p class="hidden-row">${wInfo.idx}</p>
                    <button class="deleteButton" onclick="deleteWork()">삭제</button>
                    <p>${wInfo.period}</p>
                    <p>${wInfo.company}</p>
                    <p>${wInfo.position}</p>
                    <description>${wInfo.description}</description>
                </div>`;
        });
        $('#workInfos').html(template);
    } catch (error) {
        console.error('Error in workInfo:', error);
    }
}

function addWork() {    
    var period = document.getElementById('wPeriod').value;
    var company = document.getElementById('company').value;
    var position = document.getElementById('position').value;
    var description = document.getElementById('description').value;
    
    if (period.trim() === '' || company.trim() === ''  || position.trim() === ''  || description.trim() === '') {
        alert('모든 필수 입력란을 채워주세요.');
        return;
    }
    
    var formData = new FormData();
    formData.append('period', period);
    formData.append('company', company);
    formData.append('position', position);
    formData.append('description', description);

    var confirmAdd = confirm('추가 하시겠습니까?');
    if(!confirmAdd) return;
    
    $.ajax({
        url: hostProfileUrl + 'work-add.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            console.log(response.result);
            if(response.result == "ok"){
                fetchUserProfile();
            }
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
        
    var form = document.getElementById("addWorkForm");
    form.reset();
}

function deleteWork() {
    var confirmDelete = confirm('삭제 하시겠습니까?');
    if(!confirmDelete){
        return;
    }
    
    var button = event.target;
    var workDiv = button.parentElement;
    var idx = workDiv.querySelector('.hidden-row').innerText;
    
    var formData = new FormData();
    formData.append('idx', idx);

    $.ajax({
        url: hostProfileUrl + 'work-delete.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function(response) {
            if(response.result == "ok"){
                fetchUserProfile();
            }
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}

async function isUserLoggedIn() {
    let state = false;
 
    const response = await $.ajax({
        url: hostUserUrl + 'check-login.php',
        type: 'GET'
    });

    if(response.result === "ok"){
        state = true;
    }
    
    return state;
}

function expire() {
    $.ajax({
        url: "/login/login.php", 
        type: "POST",
        dataType: "json", 
        data: {
            id: '',
            password: ''
        },
        success: function(data) {
            console.log("login-expired");
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

setTimeout(expire, 300000);

function logout() {    
    $.ajax({
        url: hostUserUrl + 'logout.php', 
        type: 'GET',
        success: function(response) {
            alert(response.msg);
            update();
        }
    });
}

async function update() {
    if (await isUserLoggedIn()) {
        $('#loginButton').text('Log Out');
        $('form').show();
        $('.deleteButton').show();
    } else {
        $('#loginButton').text('Log In');
        $('form').hide();
        if ($('.deleteButton').length > 0) {
            $('.deleteButton').hide();
        }
    }
}
    
async function fetchUserProfile() {
    await userInfo();
    await schoolInfo();
    await certInfo();
    await workInfo();
}

$(document).ready(async function () {
    await fetchUserProfile();
    await update();
    
    $('#loginButton').on('click', async function () {
        if (await isUserLoggedIn()) {
            var confirmLogout = confirm('로그아웃 하시겠습니까?');
            if(!confirmLogout) return;
            logout();
            
        } else {
            window.location.href = 'login.html';
        }
    });
});

$('#addSchool').on('click', function () {
       addSchool();
});

$('#addCert').on('click', function () {
       addCert();
});

$('#addWork').on('click', function () {
       addWork();
});
