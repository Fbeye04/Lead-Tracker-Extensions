//chrome://extensions/
let myLeads = []; // Menyimpan data user pada array
const inputEl = document.getElementById('input-el');
const inputBtn = document.getElementById('input-btn');
const ulEl = document.getElementById('ul-el');
const deleteBtn = document.getElementById('delete-btn');
const tabBtn = document.getElementById('tab-btn');
const leadsFromLocalStorage = JSON.parse(localStorage.getItem(("myLeads")));

// Memuat kembali leads yang disimpan pada localStorage
if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
} 

// Me-render daftar leads yang diberikan
function render(leads) {
    let listItems = "";

    for(let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a href="${leads[i]}" target="_blank">
            ${leads[i]}
            </a>
            <button class="delete-item-btn" data-index="${i}">Delete</button>
        </li>`;
    }
    
    ulEl.innerHTML = listItems;

    // Tambahkan event listener untuk setiap tombol delete
    const deleteItemBtns = document.querySelectorAll('.delete-item-btn');
    deleteItemBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const index = btn.getAttribute('data-index');
            myLeads.splice(index, 1);
            localStorage.setItem("myLeads", JSON.stringify(myLeads));
            render(myLeads);
        });
    });
}

inputBtn.addEventListener('click', function() {
    const inputValue = inputEl.value.trim(); // Menghilangkan spasi kosong di awal dan akhir

    if (inputValue !== "") { // Memastikan input tidak kosong
        myLeads.push(inputValue);
        inputEl.value = "";
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    } else {
        alert("Please enter a valid URL.");
    }
});

deleteBtn.addEventListener('dblclick', function() {
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

tabBtn.addEventListener('click', function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
      });
});