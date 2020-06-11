var tax = {
    salaryType: ["month", "year"],
    salary: [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000],
    towns:
        [
            {city: 'Espoo', tax: 18, },
            {city: 'Helsinki', tax: 20, },
            {city: 'Vantaa', tax: 50, },
            {city: 'Tampere', tax: 17}

        ],

    country:[
        {min:0, max:18100, mintax:0,tax:0},
        {min:18100, max:27200, mintax:8,tax:6},
        {min:27200, max:44800, mintax:554,tax:17.25},
        {min:44800, max:78500, mintax:3590,tax:21.25},
        {min:78500, max:10000000, mintax:10751.25,tax:31.25}
    ],

    getTowns: function () {
        return this.towns;
    },
    getSalary: function(){
      if(glSalaryType != this.salaryType[0]){
          tSalaryArr=[]
          for(var i in this.salary){
              tSalaryArr.push(this.salary[i]*12)
          }
          return tSalaryArr;
      }
      else return this.salary;
    },
    getTownTax: function(town){
        for(var i in this.towns){

            if(this.towns[i].city == town){
                return this.towns[i].tax;
            }

        }
        return -1;
    }
};

var glTown = tax.getTowns()[0].city;
var glSalaryType = "month";