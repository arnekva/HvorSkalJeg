
$(document).ready(function() {
    var date_input = $('input[name="date"]');
    var container = $('.bootstrap-iso form').length > 0 ? $('.bootstrap-iso form').parent() : "body";
    var options = {
        format: 'yyyy-mm-dd',
        container: container,
        todayHighlight: true,
        autoclose: true,
    };
    date_input.datepicker(options);
    $('.utbetalingsdato').datepicker();
    //Setter default utbetalingsdato til 3 måneder fra i dag.
    var today = new Date();
    today.setMonth(today.getMonth() + 3)
    let paymentdatestring = formatDate(today)
    $('.utbetalingsdato').datepicker("setDate", paymentdatestring);
    $('.innbetalingsdato').datepicker();
    $('.innbetalingsdato').datepicker("setDate", "2030-01-01");
    //Setter første betalingsmåned default til 1 måned etter utbetalingsmåned
    let paymentDue = new Date(document.getElementById('utbetalingdate').value)
    paymentDue.setMonth(paymentDue.getMonth() + 1)
    let datestring = formatDate(paymentDue)
    $('.forstebetaling').datepicker("setDate", datestring);
});
//Formaterer JS sin date til YYYY-mm-dd streng
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    return [year, month, day].join('-');
}
