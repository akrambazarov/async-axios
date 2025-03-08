const API = "https://67bebb90b2320ee0501120c8.mockapi.io/api/v1/soft";

 async function get() {
    try {

        let data = await axios.get(API);
        getData(data.data);
        //filteres(res)
    } catch (error) {
        console.error(error); 
    }
}
get();
let monthObj = {
    0:"January",
    1:"February",
    2:"March",
    3:"April",
    4:"May",
    5:"June ",
    6:"July",
    7:"August",
    8:"September",
    9:"October",
    10:"November",
    11:"December",
}
let idx = null;
let table = document.querySelector('.container');


function getData(user){
    
    table.innerHTML = "";
    user.forEach(element => {
        const data = new Date(element.date);
        let year = data.getFullYear();
        let day = data.getDate();
        let monthDate = data.getMonth();
        const week = ["Пн","Вт","Ср","Чт","Пт","Сб"];
        let addDate = data.setDate(data.getMonth() + element.limit*30+1);
        const laterDay = new Date(addDate).getDate();
        const laterYear = new Date(addDate).getFullYear();
        const laterMonth = new Date(addDate).getMonth();
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        <div class="titleBrand">${element.brand}</div>
            <div class="button fl-right"><button class="btn">31/12</button></div>
            <div class="cardMain">
                <div class="title">${element.name} </div>
                <div class="date"><span>${day} ${monthObj[monthDate]} ${year}</span><span> - ${laterDay} ${monthObj[laterMonth]} ${laterYear}</span></div>
                <div class="week"><span>${week}</span><span class="">${element.limit} month</span></div>
            </div>

        `;
        
        
        let cardFooter = document.createElement('div');
       cardFooter.classList.add('cardFooter');
       let status = document.createElement('div');
       status.classList.add('status');
       let action = document.createElement('div');
       let h4 = document.createElement('h4');
       h4.innerHTML = "Started";
       h4.classList.add("status")
        action.classList.add('actions');
        let faPapaer = document.createElement('i');
        faPapaer.classList.add('fa','fa-paper-plane');
        let faPapaerLink = document.createElement('a');
        faPapaerLink.setAttribute('href','https://t.me/onlineomuzapp');
        faPapaerLink.setAttribute("style","color:#fff")
        faPapaerLink.append(faPapaer)
        let faEdit = document.createElement('i');
        faEdit.classList.add('fa','fa-edit');
        let faDel = document.createElement('i');
        faDel.classList.add('fa','fa-trash')
        faDel.setAttribute("style","color:red");
        action.append(faPapaerLink,faEdit,faDel);
        table.append(card);
        card.append(cardFooter);
        cardFooter.append(h4,action)
        faEdit.onclick = ()=>{
            dialogEdit.showModal();
            idx = element.id;
            document.querySelector('.edit-name').value = element.name;
            document.querySelector('.edit-platdorm').value = element.brand,
            document.querySelector('.edit-date').value = element.date,
            document.querySelector('.edit-duration').value = element.limit;
        }
        document.querySelector('.editBtn').onclick = (event)=>{
            editUser(element.id,event);
            //idx = element.id
        }
        faDel.onclick = ()=>{
            DelUsers(element);
        }
    });
}  


const dialogEdit = document.querySelector('.dialogEdit');
const dialog = document.querySelector('.dialogAdd');
const btnAdd = document.querySelector('.add-button');
btnAdd.onclick = ()=>{
    dialog.showModal();
    
}

function closeModal(){
    dialog.close();
    dialogEdit.close();
}
// Add Users
let addBtn =document.querySelector('.addBtn');
addBtn.onclick = async (event)=>{
    event.preventDefault();
try {
    await axios.post(`${API}`,{
        name:document.querySelector('.add-name').value,
        brand:document.querySelector('.add-platdorm').value,
        date:document.querySelector('.add-date').value,
        limit:document.querySelector('.add-duration').value,
    })
    dialog.close();
    get();
} catch (error) {
    console.error(error);
    
}   
}
// Delete Users
async function DelUsers(element) {
    try {
        await axios.delete(`${API}/${element.id}`)
        get();
    } catch (error) {
        console.error(error);
        
    }
} 
// Edit Users
async function editUser(element,event) {
    event.preventDefault();
    try {
        await axios.put(`${API}/${idx}`,{
            name:document.querySelector('.edit-name').value,
                brand:document.querySelector('.edit-platdorm').value,
                date:document.querySelector('.edit-date').value,
                limit:document.querySelector('.edit-duration').value,
        })
        dialogEdit.close();
        get();
    } catch (error) {
        console.error(error);
        
    }
    
}
let select = document.getElementById("select");
let searchInput = document.getElementById("inputSearch");
async function filteredData() {
    inpSearchVal = searchInput.value.toLowerCase();
    try {
        let data = await axios.get(API);
        let result  = data.data.filter((element)=>{
           let searchInputValue = element.name.toLowerCase().includes(inpSearchVal);
           let selectValue = (select.value === "" || element.brand === select.value);
        return searchInputValue && selectValue
        });
        console.log(result);
        
        getData(result);
    } catch (error) {
        console.error(error);
    }
}
document.getElementById("inputSearch").addEventListener('input', filteredData);
document.getElementById("select").addEventListener('change', filteredData);

//export default  get()