

function selectFilling(){
    var mySelect = $('#townChoose');
    for(var i in tax.towns){
        var newOptions= new Option(tax.towns[i].city, tax.towns[i].city);
        mySelect.append(newOptions);
    }
    var typeSelect = $('#salaryType')
    for(var j in tax.salaryType){
        var newOptions= new Option(tax.salaryType[j],tax.salaryType[j]);
        typeSelect.append(newOptions);
    }
}


function getRelSalary(town){
    var relSalary = [];
   // var tax = tax.getTaxes(town);
    for(var i in tax.salary){
        for(var j in tax.country){
            var yearSalary=tax.salary[i]*12;
            if(yearSalary>tax.country[j].min & yearSalary<tax.country[j].max){
                if(glSalaryType == "month"){
                    relSalary.push((yearSalary-(yearSalary-tax.country[j].min)*tax.country[j].tax/100-tax.country[j].mintax-yearSalary*tax.getTownTax(town)/100)/12);
                }else{
                    relSalary.push(yearSalary-(yearSalary-tax.country[j].min)*tax.country[j].tax/100-tax.country[j].mintax-yearSalary*tax.getTownTax(town)/100);
                }
            }
        }
    }
    return relSalary;
}
function drowGraf() {

    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: tax.getSalary(),
            datasets: [{
                label: "year's salary in "+glTown,
                //data: tax.getTaxes(tax.getTowns()[0]),
                data:getRelSalary(glTown),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}


$(document).ready(function() {
    selectFilling();
    var sel = $('#townChoose');
       sel.change(function () {
        glTown = $(this).val();
        console.log(glTown); // crashes in IE, if console not open
        // make the text of all label elements be the value
        $('label').text(glTown);
        drowGraf();
    }); // close the change listener
    var sel = $('#salaryType');
    sel.change(function () {
        glSalaryType = $(this).val();
        drowGraf();
    }); // close the change listener
    drowGraf();
});