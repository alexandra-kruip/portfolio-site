$(document).ready(function () {
    var sgt = new Sgt();
    sgt.init();
});

var studentArrTemp = [];

function Sgt() {
    this.model = null;
    this.view = null;
    this.init = function () {
        this.model = new Model(this);
        this.view = new View(this);
        this.view.init();
        this.model.init();
    };
    this.addClicked = function () {
        this.model.addStudent();
        this.cancelClicked();
    };
    this.cancelClicked = function () {
        this.clearAddStudentForm();
    };
    this.reset =  function () {
        this.model.reset();
        this.view.reset();
    };
    this.clearAddStudentForm = function () {
        this.model.name = this.model.name.val('');
        this.model.course = this.model.course.val('');
        this.model.grade = this.model.grade.val('');
    };
    this.calculateAverage = function () {
        var output = 0;
        for (var i = 0; i < this.model.student_array.length; i++){
            output += parseInt(this.model.student_array[i].grade);
        }
        output = Math.floor(output/this.model.student_array.length);
        return output;
    };

    this.getDataClicked = function () {
        this.model.getDataAjax();
    };
    this.ajaxErr = function (errorType) {
        $("#errorModal").modal("show");
        var errorDiv = $('<div>').text(errorType).prepend("<img src='images/fry-user-error.jpg' />");
        $(".modal-body").append(errorDiv);
        $('#errorModal').on('hidden.bs.modal', function () {
            $(".modal-body").text('');
        });
    };


    function Model(controller) {
        this.controller = controller;
        this.student_array = [];
        this.name = $('#studentName');
        this.course = $('#course');
        this.grade = $('#studentGrade');
        this.index = 0;
        this.init = function () {
            this.getDataAjax();
        };
        this.updateData = function () {
            this.index = 0;
            $('tbody tr').remove();
            this.updateStudentList();
            var avg = this.controller.calculateAverage();
            $('.avgGrade').text(avg);
        };
        this.updateStudentList = function () {
            for(var j = 0; j < controller.model.student_array.length; j++){
                this.addStudentToDom(this.student_array[j]);
            }
        };
        this.addStudent = function () {
            if(this.name.val() !== ''||this.course.val() !== '' || this.grade.val() !== '') {
                var newStudent = {
                    name: this.name.val(),
                    course: this.course.val(),
                    grade: this.grade.val()
                };
                $('*').css('cursor', 'progress');
                $.ajax({
                    url: 'https://s-apis.learningfuze.com/sgt/create',
                    data: {
                        api_key: "hFD9Rcq2bd",
                        name: newStudent.name,
                        course: newStudent.course,
                        grade: newStudent.grade
                    },
                    dataType: 'json',
                    type: 'post',
                    timeout: 10000,
                    success: function (response) {
                        newStudent.id = response.new_id;
                        $('*').css('cursor', 'default');
                        if (response.success === false) {
                            var errorRes = response.error + " ";
                            controller.ajaxErr(errorRes);
                        } else {
                            $('*').css('cursor', 'default');
                        }
                        controller.model.student_array.push(newStudent);
                        controller.model.updateData();

                    },
                    error: function (response) {
                        var errorRes = response.status + " " + response.statusText;
                        controller.ajaxErr(errorRes);
                    }
                });
            }
        };

        this.addStudentToDom = function (studentObj) {
            var studentRow = $('<tr>').attr('data', studentObj.data);
            var studentName = $('<td>').text(studentObj.name);
            var studentCourse = $('<td>').text(studentObj.course);
            var studentGrade = $('<td>').text(studentObj.grade);
            var operations = $('<button>', {
                class: 'btn btn-danger deleteButton',
                text: 'Delete',
                id: studentObj.id
            });
            $(studentRow).append(studentName, studentCourse, studentGrade, operations);
            $('tbody').append(studentRow);
            (function () {
                studentRow.on('click', 'button', function () {
                    $('*').css('cursor', 'progress');
                    $.ajax({
                        url: 'https://s-apis.learningfuze.com/sgt/delete',
                        data: {
                            api_key: "hFD9Rcq2bd",
                            student_id: this.id
                        },
                        dataType: 'json',
                        type: 'post',
                        timeout: 10000,
                        success: function (response) {
                            console.log(response);

                            $('#loadingModal').modal('hide');
                            if (response.success === false){
                                $('*').css('cursor', 'default');
                                var errorRes = response.errors + " ";
                                controller.ajaxErr(errorRes);
                            } else {
                                $('*').css('cursor', 'default');
                            }
                        },
                        error: function (response) {
                            $('*').css('cursor', 'default');
                            var errorRes = response.status + " " + response.statusText;
                            controller.ajaxErr(errorRes);
                        }
                    });
                    var removeIndex = studentRow.index();
                    studentRow.remove(); // removes the selected element
                    controller.model.student_array.splice(removeIndex, 1);
                    controller.model.updateData();
                });

            })(this);

            this.index++;

        };
        this.getDataAjax = function () {
            $('*').css('cursor', 'progress');
            $.ajax({
                url: 'https://s-apis.learningfuze.com/sgt/get',
                data: {api_key: "hFD9Rcq2bd"},
                dataType: 'json',
                type: 'post',
                timeout: 10000,
                success: function (response) {
                    console.log(response);
                    if (response.success === false){
                        var errorRes = response.error + " ";
                        controller.ajaxErr(errorRes);
                        $("*").css("cursor", "default");
                    } else {
                        for (var i = 0; i < response.data.length; i++) {
                            controller.model.student_array.push(response.data[i]);
                        }
                        studentArrTemp = controller.model.student_array;
                        controller.model.updateData();
                        $("*").css("cursor", "default");

                    }
                },
                error: function (response) {
                    var errorRes = response.status + " " + response.statusText;
                    controller.ajaxErr(errorRes);
                    $("*").css("cursor", "default");

                }
            });
        };
        this.reset = function () {
            this.student_array = [];
        }
    }

    function View(controller) {
        this.controller = controller;
        this.init = function () {
            this.addClickHandlers();
        };
        this.addClickHandlers = function () {
            $('#addButton').on('click', this.controller.addClicked.bind(this.controller));
            $('#cancelButton').on('click', this.controller.cancelClicked.bind(this.controller));
            $('#getDataButton').on('click', this.controller.getDataClicked.bind(this.controller));
        };
        this.reset = function () {
            this.init();
        }
    }
}

// function stringifyArray(array){
//     return JSON.stringify(array);
// }
// function parseArray(strArray){
//     return JSON.parse(strArray);
// }
// function compareArray(strArray1,strArray2){
//     var array1 = parseArray(strArray1);
//     var array2 = parseArray(strArray2);
//     var differentArray1 = [];
//     var differentArray2 = [];
//     for(var i = 0, j = 0; i < array1.length, j < array2.length; i++, j++){
//         if(!compareObject(array1[i],array2[j])){
//             differentArray1.push(array1[i]);
//             differentArray2.push(array2[j]);
//         }
//     }
//     return stringifyArray([differentArray1,differentArray2]);
// }
// function compareObject(obj1,obj2){
//     for(var objid in obj1) {
//         if(obj1[objid] !== obj2[objid]){
//             return false;
//         }
//     }
//     return true;
// }
