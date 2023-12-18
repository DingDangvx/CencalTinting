
    document.getElementById("Make").addEventListener("load",   myAirtable());
    document.getElementById("Make").addEventListener("change",   makemodel);
    
    let make_list = []; //make an empty list of makes
    let model_list = []; //make an empty list of models
    let year_list = [];  //make an empty list of years
    var json_list=[];
    var json = {};
    let modelfilter=[];
    let yearfilter = [];
    
    function myAirtable(){
    let xyy="";
    console.log("yes i have been called");
    var Airtable = require('airtable');
    
    var base = new Airtable({apiKey: 'patVdQLqyb4HiwQwy.d565b293b6eec2157f974f60aa3608c1120bad26a9b29c8f4fbddc3ed6cfe3bc'}).base('appEu3iPKkU8MBiYe');
    
    base('Imported table').select({
        
        maxRecords: 10000,
        view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
        
    
        records.forEach(function(record) {
           

           make_list.push(record.get("Make"));
           model_list.push(record.get("Model"));
           year_list.push(record.get("Year"));
           
           json={
           "Make":record.get("Make"),
           "Model":record.get("Model"),
           "Year":record.get("Year")
           }
           

         json_list.push(json);
         
        });
        

        make_list = make_list.filter((item, i, ar) => ar.indexOf(item) === i);

         
         for (let i=0; i<=make_list.length; i++){
        var myElem = document.getElementById("make"+i);
        if ((myElem === null) && make_list[i]!=undefined){
         var b = document.createElement("option");
         b.setAttribute('id','make'+i);
         document.getElementById("Make").appendChild(b);
         document.getElementById("make"+i).innerHTML = make_list[i];
        }

         //console.log(make_list);
      
         }
   

    

        fetchNextPage();

    }, function done(err) { 
    
        if (err) { console.error(err); return; }
      

    });
    
         
    }
 function makemodel(){
 /*filter json to remove duplicates and undefined and null values, clear dropdown to remove initial values, populate drop down with new values*/

//**********************filter arrays*******************
         var newArray=[];
         newArray = json_list.filter(function (el) {
  return el.Make === document.getElementById("Make").value
});
    //console.log(newArray);
    for (let element in newArray){
    if (newArray[element]!=null||newArray[element]!=undefined){
    modelfilter.push(newArray[element].Model);
    yearfilter.push(newArray[element].Year);
   
    }
    modelfilter = modelfilter.filter((item, i, ar) => ar.indexOf(item) === i);
 
     yearfilter = yearfilter.filter((item, i, ar) => ar.indexOf(item) === i);
            
 const parent = document.querySelector('#Model');

       while (parent.firstChild) {
       
        parent.removeChild(parent.firstChild);
        
      //  console.log(parent.firstChild);
    } 
    
    
  const parent2 = document.querySelector('#Year');

       while (parent2.firstChild) {
       
        parent2.removeChild(parent2.firstChild);
        
      //  console.log(parent.firstChild);
    } 
       

           
         for (let i=0; i<=modelfilter.length; i++){
        var myElem = document.getElementById("model"+i);
        if ((myElem === null) && modelfilter[i]!=undefined){
         var b = document.createElement("option");
         b.setAttribute('id','model'+i);
         document.getElementById("Model").appendChild(b);
         document.getElementById("model"+i).innerHTML = modelfilter[i];
        }


      
         }
        
        
        for (let i=0; i<=yearfilter.length; i++){
        var myElem = document.getElementById("year"+i);
        if ((myElem === null) && yearfilter[i]!=undefined){
         var b = document.createElement("option");
         b.setAttribute('id','year'+i);
         document.getElementById("Year").appendChild(b);
         document.getElementById("year"+i).innerHTML = yearfilter[i];
        }


      
         }
        
    }
//console.log(newArray);
modelfilter=[];
console.log(yearfilter);
yearfilter=[];

   }   
          
          
 
