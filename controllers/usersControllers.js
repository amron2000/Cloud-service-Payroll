
const fullacademics = require('../models/fullacademics');
const salary = require('../models/salary');
const deduct = require('../models/deduction');
const upassword = require('../models/upassword');
const transactions = require('../models/transactions');
const attendence = require('../models/attendence');

const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;
let dept = ['R&D','Production','Marketing','Human Resource','Finance and Accounting'];

let go = {};
let em = {}
let sal = {};
let de= {}
let p = {};
let e = {}
p.name = "Amro Okasha";
p.gender = "Male";
p.dob = "11/10/2000";
p.phone = "598083370";
p.address = "Gaza";
e.eid = "10101000";
e.dname = "IT";
e.designation = "Teacher";
e.doj = "11/03/2018";
['dname','designation','doj']

let s = {}


s.base = 40000;
s.hra = 1000;
s.da = 1000;
s.ma  = 1000;
let t = 0;
for(i in s)
 t  = t+s[i];
s.total = t
s.sid = 10001;
let d = {}

t = 0;
d.tax = 500;
d.leaves = 1400;
d.pf = 1000;
d.wf = 1000;
d.bus = 1000;
d.loan = 1000;
for(i in d)
 t  = t+d[i];
d.total = t;
d.did = 1012;
s.net = s.total-d.total;
console.log(t)
let user = {}
user.name = "Amro";
user.gender = "Male";

module.exports.userlog = function(req,res){

    user.username = req.body.username;
    user.pwd = req.body.password;
    let l;
    
      
    var errors;
    upassword.find({ username: user.username,password:user.pwd}, function (err, docs) {
        console.log(docs);
        if(docs.length==1)
        {
            go = docs[0];      
            return res.redirect('/user/home');
        }
        else
        {
            
            errors = 'username or password incorrect';
    
            return res.redirect('/?id='+errors); 
        }
        
        ;})


       
   
}

    



module.exports.home = function(req,res){
    console.log('Amro');
    console.log(go);
    fullacademics.find({ eid: go.eid}, function (err, docs) {
        console.log('post-emp');
        console.log(docs);
        em = docs[0];
        let dept = ['IT','Medicine','Marketing','Engineering','Finance and Accounting']
        let emp = docs[0];
        emp.dname = dept[docs[0].dno-1]
        emp.view = 0;
        if(err)
        {
            return res.redirect('/');
        }
        return res.render('user',{title:"user",personal:p,user:user,employment:e,list:emp});    
        
        ;})
    

}


module.exports.homeuser = function(req,res){
    console.log('Amro');
    console.log(go);
    fullacademics.find({ eid: go.eid}, function (err, docs) {
        console.log('post-emp');
        console.log(docs);
        em = docs[0];
        let dept = ['IT','Medicine','Marketing','Engineering','Finance and Accounting']
        let emp = docs[0];
        emp.dname = dept[docs[0].dno-1]
        emp.view = 0;
        if(err)
        {
            return res.redirect('/');
        }
        return res.render('usersAcad',{title:"user",personal:p,user:user,employment:e,list:emp});    
        
        ;})
    

}




module.exports.user = function(req,res){
    
    return res.render('user',{title:"Home"});

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
            list.view = 0;
            return res.render('salary',{title:"Salary",user:user,salary:sal,deduct:de,list:list});
            });    
       
        });
        

}
module.exports.payment = function(req,res){

    transactions.find({ eid: go.eid}, function (err, docs) {
        console.log('history');
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
        var list = {};
        list.view = 0;
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
          list.view = 0;  
        return res.render('attendence',{title:"Attendence",emp:emp,list:list});    
        
        ;})

}

