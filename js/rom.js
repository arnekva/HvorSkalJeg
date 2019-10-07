$( document ).ready(function() {
$('#rom').html("Laster inn romnummer...");
//legg til: get URL fra localstorage - add options
let url = getUrl()
//

if(url === null){
  $('#error').html("Du har ikke satt din egen URL ennå. Se <a href='hjelp.html'>her</a> for hjelp til oppsett. Du ser min som eksempel.");
  console.log("whops")
  url = "https://cloud.timeedit.net/hvl/web/studbergen/ri10Yf506550Z9QY2XQ4757XZX076405702546Yy566Y5Q1g05Y10u5c47l5Q76X7Q70ZY7Y2ZQ0p9u0107xXZX4Q71l1502557Y651Qæl617W74WL3ZwX7ve87l5a5W78W6aX8WwE7Ynq5jX9n1W1Ww3p7wcxc6bmncUb9ceWjlXrn7rlrjQZ8e3tW6ra2wwK7XWc172aWWbn7rLW8vXpWmWet8nweXwcxbæ1wrjacWw3nnU6Emr1tacrXanjKw697WeWXW7vXXW55Won6cE65w26jWxX99196w1WX6a0W5v6KcXtnW7c)wv6v(V)aaw61xcXV5WX6X6KYoujxj(anj5w5v5Wop6b4a15p6w7175n9ZwWQQDeWQmdXr6tZ6Ewk00dZr0u1XtW43D06081E6C80F273E7912877DD9FE4.phtml"
}else{
  console.log("Successfully got URL from localStorage")
}
$.get( url, function(response) {
//$( ".result" ).html( data );
$('#testDiv').html(response);
var date = new Date()
var time = "10" + ":" + "15"//date.getMinutes() + ":" + date.getSeconds();
let dato = formatDate(date)

//lag for-løkke for å finne ikke null, break; når funnet
for(let i = 1; i<9;i++){
  var node = document.querySelector('[title*="' + dato + ' '+ time + '"]');
  if(node !== null){
    console.log(node.innerHTML) // .substr(7)
    $('#rom').html(node.innerHTML.substr(29,6));
    $('#fag').html(node.innerHTML.substr(0,6));
    $('#type').html(node.innerHTML.substr(15,12));

    $('#tid').html("Klokken " + time);
    break;
  } else{
    console.log("Adding one hour")
    time = (date.getHours()+i) + ":" + "15"
  }
}

if(node === null){
  $('#rom').html("Ingen timer videre i dag.");
}

});
});
//https://cloud.timeedit.net/hvl/web/studbergen/ri10Yf506550Z9QY2XQ4757XZX076405702546Yy566Y5Q1g05Y10u5c47l5Q76X7Q70ZY7Y2ZQ0p9u0107xXZX4Q71l1502557Y651Qæl617W74WL3ZwX7ve87l5a5W78W6aX8WwE7Ynq5jX9n1W1Ww3p7wcxc6bmncUb9ceWjlXrn7rlrjQZ8e3tW6ra2wwK7XWc172aWWbn7rLW8vXpWmWet8nweXwcxbæ1wrjacWw3nnU6Emr1tacrXanjKw697WeWXW7vXXW55Won6cE65w26jWxX99196w1WX6a0W5v6KcXtnW7c)wv6v(V)aaw61xcXV5WX6X6KYoujxj(anj5w5v5Wop6b4a15p6w7175n9ZwWQQDeWQmdXr6tZ6Ewk00dZr0u1XtW43D06081E6C80F273E7912877DD9FE4.phtml
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('.');
}

function save(){
  let url = document.getElementById('timeedit-link').value
  localStorage.setItem('url', url)
}
function getUrl(){
  let url = localStorage.getItem('url')
  return url
}
