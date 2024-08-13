document.addEventListener("DOMContentLoaded", loadContacts);

function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const table = document.getElementById('contactsTable');
    table.innerHTML = `
        <tr>
            <th>Ім'я</th>
            <th>Прізвище</th>
            <th>Телефон</th>
            <th>Електронна адреса</th>
            <th>Дії</th>
        </tr>`;
    contacts.forEach((contact, index) => {
        const row = table.insertRow();
        row.insertCell(0).innerText = contact.name;
        row.insertCell(1).innerText = contact.surname;
        row.insertCell(2).innerText = contact.phone;
        row.insertCell(3).innerText = contact.email;
        const actions = row.insertCell(4);
        actions.innerHTML = `
            <button onclick="editContact(${index})">Редагувати</button>
            <button onclick="deleteContact(${index})">Видалити</button>`;
    });
}

function addContact() {
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    if (name && surname && phone && email) {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push({ name, surname, phone, email });
        localStorage.setItem('contacts', JSON.stringify(contacts));
        loadContacts();
        clearInputs();
    } else {
        alert("Будь ласка, заповніть усі поля.");
    }
}

function deleteContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    loadContacts();
}

function editContact(index) {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts[index];
    document.getElementById('name').value = contact.name;
    document.getElementById('surname').value = contact.surname;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;
    deleteContact(index);
}
function clearInputs() {
    document.getElementById('name').value = '';
    document.getElementById('surname').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
}