$( document ).ready(function() {
$('#rom').html("Laster inn romnummer...");
//legg til: get timeedit fra localstorage - add options
let timeedit = gettimeedit()
//

if(timeedit === null){
  $('#error').html("Du har ikke satt din egen timeedit ennå. Se <a href='hjelp.html'>her</a> for hjelp til oppsett. Du ser min som eksempel.");
  console.log("No timetable has been set in the localStorage")
  timeedit = "https://cloud.timeedit.net/hvl/web/studbergen/ri10Yf506550Z9QY2XQ4757XZX076405702546Yy566Y5Q1g05Y10u5c47l5Q76X7Q70ZY7Y2ZQ0p9u0107xXZX4Q71l1502557Y651Qæl617W74WL3ZwX7ve87l5a5W78W6aX8WwE7Ynq5jX9n1W1Ww3p7wcxc6bmncUb9ceWjlXrn7rlrjQZ8e3tW6ra2wwK7XWc172aWWbn7rLW8vXpWmWet8nweXwcxbæ1wrjacWw3nnU6Emr1tacrXanjKw697WeWXW7vXXW55Won6cE65w26jWxX99196w1WX6a0W5v6KcXtnW7c)wv6v(V)aaw61xcXV5WX6X6KYoujxj(anj5w5v5Wop6b4a15p6w7175n9ZwWQQDeWQmdXr6tZ6Ewk00dZr0u1XtW43D06081E6C80F273E7912877DD9FE4.phtml"
}else{
  console.log("Successfully got timeedit from localStorage")
}

//change to variable 'timeedit'
$.get( timeedit, function(response) {
//$( ".result" ).html( data );
$('#testDiv').html(response);
var date = new Date()

var time = checkTime(date.getHours())

//date.getMinutes() + ":" + date.getSeconds();
let dato = formatDate(date)

let firstrun = true;
for(let i = 1; i<12;i++){

  if(firstrun){
    let newtime = checkTimePrevious(date.getHours())
    console.log("test" +  newtime)
    var newnode = document.querySelector('[title*=" ' + dato + ' '+ newtime + '"]')
    if(newnode !== null){
      $('#running').html("Du har en pågående time: "+newnode.innerHTML.substr(8) + " (startet klokken " + newtime + ")")
    } else{
      $('#running').html("")
    }
    firstrun = false
  }
  let timeint = date.getHours()

  console.log("time: " + time)
  console.log(timeint)
  var node = document.querySelector('[title*=" ' + dato + ' '+ time + '"]')
  if(node !== null){
    if(node.innerHTML.substr(0,3) === "MAT"){
      //gjør custom greier for matte
      //no clue if this works
      $('#rom').html(node.innerHTML.substr(74,10))
      $('#fag').html(node.innerHTML.substr(0,6))
      $('#type').html(node.innerHTML.substr(64,10))
      $('#tid').html("Klokken " + time)
      console.log("Matte?")
      break
    } else{
    console.log(node.innerHTML) // .substr(7)
    $('#rom').html(node.innerHTML.substr(29,6))
    $('#fag').html(node.innerHTML.substr(0,6))
    $('#type').html(node.innerHTML.substr(15,12))

    $('#tid').html("Klokken " + time)

    break
    }
  } else{
    console.log("Adding one hour")
    time = (date.getHours()+i) + ":" + "15"
    timeint += i
  }
}

if(node === null){
  $('#rom').html("Ingen timer videre i dag.")
}

});
});

function checkTime(time){
  var date = new Date()
  if(time < 10){
    console.log("small number")
    time = '0' + time + ":" + "15"
  } else{
    console.log("large number")
    time = date.getHours() + ":" + "15"
  }
  return time
}
function checkTimePrevious(time){
  var date = new Date()
  if(time < 10){
    console.log("small number")
    time = time-1
    time = '0' + time + ":" + "15"
    console.log("checktime" + time)
  } else{
    console.log("large number")
    time = date.getHours()-1 + ":" + "15"
  }
  return time
}
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

    return [day, month, year].join('.')
}

function save(){
  let timeedit = document.getElementById('timeedit-link').value
  localStorage.setItem('timeedit', timeedit)
  location.reload()
}
function gettimeedit(){
  let timeedit = localStorage.getItem('timeedit')
  return timeedit
}
