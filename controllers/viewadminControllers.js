const fullacademics = require('../models/fullacademics');
const salary = require('../models/salary');
const deduct = require('../models/deduction');
const upassword = require('../models/upassword');
const transactions = require('../models/transactions');
const attendence = require('../models/attendence');
let go = {};
let em = {}
let sal = {};
let de= {}


module.exports.view = function(req,res){
    console.log('view');
    let id = req.query.id;
    console.log(id);
    go.eid = id;
    return res.redirect('home');  
}

module.exports.home = function(req,res){
    console.log('view/home');
    console.log('Amro');
    console.log(go);
    fullacademics.find({ eid: go.eid}, function (err, docs) {
        console.log('post-emp');
        console.log(docs);
        em = docs[0];
        let dept = ['IT','Medicine','Marketing','Engineering','Finance and Accounting']
        let emp = docs[0];
        emp.dname = dept[docs[0].dno-1]
        emp.view = 1;
        if(err)
        {
            return res.redirect('/admin');
        }
        return res.render('user',{title:"user",list:emp});    
        
        ;}) 

      
}


module.exports.salary = function(req,res){

    console.log(em)
    salary.find({ sid: em.sid}, function (err, docs) {
        console.log('salary');
        console.log(docs);
        sal = docs[0];
        sal.total = sal.base+sal.hra+sal.da+sal.ma;
        deduct.find({ did: em.did}, function (err, docs) {
            console.log('deduct');
            console.log(docs);
            de = docs[0];
            de.total = de.tax+de.pf+de.wf+de.loan+de.bus; 
            var list = {};
            list.view = 1;
            return res.render('salary',{title:"Salary",salary:sal,deduct:de,list:list});
            });    
        });
        

}

module.exports.payment = function(req,res){

    transactions.find({ eid: go.eid}, function (err, docs) {
        console.log('history');
        console.log(docs);
        let dept = ['IT','Medicine','Marketing','Engineering','Finance and Accounting']
        let emp = docs;
        function compare( a, b ) {
            if ( a.month > b.month ){
              return -1;
            }
            if ( a.month < b.month ){
              return 1;
            }
            return 0;
          }
        var list = {};
        list.view = 1;
        emp.sort( compare );
        return res.render('payment',{title:"Payment",emp:emp,list:list});    
        
        ;})

}


module.exports.attendence = function(req,res){
    attendence.find({ eid: go.eid}, function (err, docs) {
        console.log('atd');
        console.log(docs);
        let emp = docs;
        function compare( a, b ) {
            if ( a.month > b.month ){
              return -1;
            }
            if ( a.month < b.month ){
              return 1;
            }
            return 0;
          }
          
          emp.sort( compare );
          var list = {};
          list.view = 1;  
        return res.render('attendence',{title:"Attendence",emp:emp,list:list});    
        
        ;})
}


