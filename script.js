const addBtn = document.getElementById('add-user');
const btnText = addBtn.innerText;
const name = document.getElementById('username');
const recordDisplay = document.getElementById('record');
let edit_id = null;
let user_array = [];

let obj_str = localStorage.getItem('user');

if (obj_str != null) {
    user_array = JSON.parse(obj_str); // after refresh do no delete data using this line
}
display();

addBtn.onclick = () => {
    const names =  name.value;
    if (edit_id != null) {
        user_array.splice(edit_id,1,{'name':names });
    }
    else {
        
        user_array.push({ 'name': names });
    }
    save(user_array);
    name.value = '';
    display();
    addBtn.innerText = 'Sumbit'
}
function save(item) {
    let string = JSON.stringify(item);   // change the object into stirng
    localStorage.setItem('user', string);

}
function display() {
    let statement = '';
    user_array.forEach((user, i) => {
        statement += `<tr>
        <th scope="row">${i + 1}</th>
        <td>${user.name}</td>
        
        <td><i class=" btn-primary fa-regular fa-pen-to-square" onclick='edit(${i})'></i><i class=" btn fa-solid fa-trash" onclick='delete_data(${i})'></i></td>
       
    </tr>`;
    });
    recordDisplay.innerHTML = statement;

}
function edit(index) {
    edit_id = index;
    name.value = user_array[edit_id].name;
    addBtn.innerText = "Save changes";

}
function delete_data(index) {
    user_array.splice(index, 1);
    save(user_array);
    display();

}