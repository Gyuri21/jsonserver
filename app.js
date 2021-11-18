var addButton = document.querySelector('#addButton');
var getButton = document.querySelector('#getButton');
var getallButton = document.querySelector('#getallButton');
var modifyButton = document.querySelector('#modifyButton');
var delButton = document.querySelector('#delButton');

const idElem= document.querySelector('#id');
const FullnameElem= document.querySelector('#fullname');
const cityElem= document.querySelector('#city');
const salaryElem= document.querySelector('#salary');

const list= document.querySelector('#list');

addButton.addEventListener('click',event =>{
    addEmpoyee();
    alert('Hozzáadás vége')
});

getButton.addEventListener('click', event =>{
    getEmpoyee();
});

modifyButton.addEventListener('click', event =>{
    modifyEmpoyee();
});

getallButton.addEventListener('click', event =>{
    getAllEmpoyee();
});

delButton.addEventListener('click', event =>{
    deleteEmpoyee();
});


function addEmpoyee(){
var url = "http://localhost:9000/employees";
fetch(url,{
    method: "post",
    body: JSON.stringify({
        //id: idElem.value,
        fullname: FullnameElem.value,
        city: cityElem.value,
        salary: salaryElem.value
    }),
    headers:{
        "Content-Type": "application/json"
    }
})
.then(res => res.text())
.then(data => {
    console.log(data);
})
.catch(error => console.log(error))
}

function getEmpoyee(){
    var id= idElem.value;
    var url = "http://localhost:9000/employees/"+id;

    fetch(url,{
        method: "get",
    })

    .then(res => res.text())
    .then(data => {
        console.log(data);
        var employee = JSON.parse(data);
        FullnameElem.value= employee.fullname;
        cityElem.value= employee.city;
        salaryElem.value= employee.salary;

    })
    .catch(error => console.log(error))
    }

    function modifyEmpoyee(){
        var id= idElem.value;
        var url = "http://localhost:9000/employees/"+id;
        fetch(url,{
            method: "put",
            body: JSON.stringify({
                //id: idElem.value,
                fullname: FullnameElem.value,
                city: cityElem.value,
                salary: salaryElem.value
            }),
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error))
        }

    function getAllEmpoyee(){

        var url = "http://localhost:9000/employees";
    
        fetch(url,{
            method: "get",
        })
    
        .then(res => res.text())
        .then(data => {
            console.log(data);
            let employees= JSON.parse(data);
            list.innerHTML=("");
            employees.forEach(employees =>{
                let delButton= document.createElement('button');
                delButton.innerHTML='Törlés';
                delButton.setAttribute('data-id', employees.id);
                let li= document.createElement('li');
                li.innerHTML= employees.id+ ".) ";
                li.innerHTML+= employees.fullname;
                list.appendChild(li);
                li.appendChild(delButton);
                addEventToButtons(delButton,li);
            });   
        })
        .catch(error => console.log(error))
    }   
    
    function deleteEmpoyee(id){
        
        var url = "http://localhost:9000/employees/"+id;
        fetch(url,{
            method: "delete",
        })
        .then(res => res.text())
        .then(data => {
            console.log(data);
        })
        .catch(error => console.log(error))
    }

    function addEventToButtons(button,li){
        button.addEventListener('click', event => {
            console.log('Törlésre ítélve' + event.target.dataset.id);
            deleteEmpoyee(event.target.dataset.id);
            li.parentNode.removeChild(li);
        })
    }