$(document).ready(init);

function init(){
    email();
    phone();
}
function email(){
    var e = 'alex';
    e += 'kruip';
    e += '@';
    e += 'gmail.com';
    $('.email').text(e);
    e = 'mailto:' + e;
    $('.email ').attr('href', e);
}
function phone(){
    var p = '714';
    p += '-592';
    p += '-4742';
    $('.phone').text('Phone: ' + p);
}