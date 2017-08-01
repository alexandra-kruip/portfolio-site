$(document).ready(function(){
    $('.sgt-form').on('click', '.btn-success', function(){
        var fdata = getFormData();
        addStudent(fdata.sid, fdata.sname, fdata.course, fdata.grade);
        clearForm();
    }).on('click', '.btn-info', function(){
        updateStudent($(this).attr('data-uid'));
        $(this).removeClass('btn-info').addClass('btn-success').attr('data-uid', null).text('Add Student');
        clearForm();
    }).on('click', '#clear-form', function(){
        $('#add-student').removeClass('btn-info').addClass('btn-success').attr('data-uid', null).text('Add Student');
        clearForm();
    });

    $('.sgt').on('click', '.delete', function(){
        var studentKey = $(this).closest('td').attr('data-uid');
        deleteStudent(studentKey, $(this));
    }).on('click', '.edit', function(){
        var studentKey = $(this).closest('td').attr('data-uid');
        $('#add-student').removeClass('btn-success').addClass('btn-info').attr('data-uid', studentKey).text('Update Student');
        var fdata = getRowData($(this).closest('tr'));
        populateFormData(fdata.sid, fdata.sname, fdata.course, fdata.grade);
    });
});



// Add config data
var config = {
    apiKey: "AIzaSyCqvQkjL7IcflzhVOz_9qAKDj9rBfPT97Y",
    authDomain: "student-grade-table-1abf6.firebaseapp.com",
    databaseURL: "https://student-grade-table-1abf6.firebaseio.com",
    projectId: "student-grade-table-1abf6",
    storageBucket: "student-grade-table-1abf6.appspot.com",
    messagingSenderId: "480009412451"
};

// Initialize Firebase
firebase.initializeApp(config);

// Create Firebase ref
var fbRef = firebase.database();

// Create event listener for the students node in your database
fbRef.ref('students').on('value', function (snapshot) {
    d = snapshot.val();
    updateDom(d);
});

// Complete the addStudent function
function addStudent(sid, sname, course, grade){
    var newStudent = {
        student_id: sid,
        student_name: sname,
        course: course,
        grade: grade
    };

    fbRef.ref('students').push(newStudent);
}

// complete the delete function
function deleteStudent(key, ele){
    var studentToDelete = getRowData(ele.closest('tr'));
    var c = confirm(
    'Are you sure you want to delete student: ' + studentToDelete.sid + ' ' + studentToDelete.sname + '?'
    );

    if (c == true) {
        fbRef.ref('students/' + key).remove();
    }
}

// complete the update function
function updateStudent(id){
    var updates = getFormData();
    updates['students/' + id + '/student_id'] = updates.sid;
    updates['students/' + id + '/grade'] = updates.grade;
    updates['students/' + id + '/course'] = updates.course;
    updates['students/' + id + '/student_name'] = updates.sname;

    fbRef.ref('students/' + id).update(updates)
}

function updateDom(d){
    var table = $('.sgt tbody');
    table.html('');
    for(var key in d){
        if(d.hasOwnProperty(key)){
            var row = $('<tr>');
            var id = $('<td class="sid">' + d[key].student_id + '</td>');
            var name = $('<td class="sname">' + d[key].student_name + '</td>');
            var course = $('<td class="course">' + d[key].course + '</td>');
            var grade = $('<td class="grade">' + d[key].grade + '</td>');
            var actions = $('<td>', {'data-uid': key});
            var edit = $('<button>', {
                class: 'btn btn-sm btn-info edit',
                text: 'Edit'
            });
            var del = $('<button>', {
                class: 'btn btn-sm btn-danger delete',
                text: 'Delete'
            });

            table.append(row.append(id, name, course, grade, actions.append(edit, del)));
        }
    }
}

function clearForm(){
    $('.sgt-form input').each(function(k, v){
        $(v).val('');
    });
}

function getFormData(){
    var output = {};
    $('.sgt-form input').each(function(k, v){
        var ele = $(v);
        output[ele.attr('id')] = ele.val();
    });

    return output;
}

function populateFormData(sid, sname, course, grade){
    $('#sid').val(sid);
    $('#sname').val(sname);
    $('#course').val(course);
    $('#grade').val(grade);
}

function getRowData(e) {
    return {
        sid: e.find('.sid').text(),
        sname: e.find('.sname').text(),
        course: e.find('.course').text(),
        grade: e.find('.grade').text()
    };
}
