// get total  ✔
// create product ✔
// save local storage ✔
// clear inputs ✔
// read  ✔
// delete
// count
// update
// search
// clean data 

// Inputs:

let title = document.getElementById('title')
let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let submit = document.getElementById('submit')

let mode = 'create'

let tem;

// 1 - get total

function getTotal() {

    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value
        total.innerHTML = result;
        total.style.backgroundColor = '#040'
    }
    else {
        total.innerHTML = ''
        total.style.backgroundColor = '#a00d02'
    }

}

// 2 - create product

    let dataPro;
    if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
    } else {
    dataPro = []
    }

    submit.addEventListener('click', function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,  // It's not an input
        count: count.value,
        category: category.value.toLowerCase()

    }

    // 6 - count

    if(title.value !='' &&  price.value != 0 && category.value !=0 && count.value <= 100){
        if (mode === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro)
                }
            } else {
                dataPro.push(newPro)
            }
        } else {
            dataPro[tem] = newPro
            mode = 'create'
            submit.innerHTML = 'Create'
            count.style.display = 'block'
        }
        clearData()
    }



    // save local storage
    localStorage.setItem('product', JSON.stringify(dataPro)) //Local storage => string
    console.log(dataPro)
    showData()
    

})

// 4 - clear inputs

function clearData() {
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''  // It's not an input
    count.value = ''
    category.value = ''
    total.style.backgroundColor = '#a00d02'
}

// 5 - read 

function showData() {
    let table = ''

    for (let i = 0; i < dataPro.length; i++) {
        table += `
         <tr>
            <td>${i + 1}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}0</td>
            <td>${dataPro[i].category}ne</td>
            <td><button onclick="updateData(${i})" class="px-3 py-2 mt-2" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" class="px-3 py-2 mt-2" id="delete">Delete</button></td>
        </tr>
        `
    }


    document.getElementById('tBody').innerHTML = table

    //Delete All Button
    let deleteAllBtn = document.getElementById('deleteAllBtn')
    if (dataPro.length > 0) {
        deleteAllBtn.innerHTML = `
        <button onclick="deleteAll()" class="w-100 mt-2 py-2"> Delete All (${dataPro.length})</button>
        `
    } else {
        deleteAllBtn.innerHTML = ''
    }
}
showData()

// 5 - delete

function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)   // local storage => string
    showData()
}


// delete all

function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}


// 7 - update

function updateData(i) {
    title.value = dataPro[i].title
    price.value = dataPro[i].price
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal()
    count.style.display = 'none'
    category.value = dataPro[i].category
    submit.innerHTML = 'Update'
    mode = 'update'
    tem = i;
    scroll({
        top: 0,
        behavior: "smooth"
    })
}

// 8 - search


let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search')

    if (id == 'searchTitle') {
        searchMood = 'Title'
        // search.placeholder = 'Search By Title'
    } else {
        searchMood = 'Category'
       // search.placeholder = 'Search By Category'
    }
    search.placeholder = 'Search By '+ searchMood
    search.focus()
    search.value='';
    showData()

}

function searchData(value) {
    let table = '';
    if (searchMood == 'Title') {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
         <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}0</td>
            <td>${dataPro[i].category}ne</td>
            <td><button onclick="updateData(${i})" class="px-3 py-2 mt-2" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" class="px-3 py-2 mt-2" id="delete">Delete</button></td>
        </tr>
        `
            }
        }


    } else {
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
            <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}0</td>
            <td>${dataPro[i].category}ne</td>
            <td><button onclick="updateData(${i})" class="px-3 py-2 mt-2" id="update">Update</button></td>
            <td><button onclick="deleteData(${i})" class="px-3 py-2 mt-2" id="delete">Delete</button></td>
            </tr>
            `
            }
        }
    }

    document.getElementById('tBody').innerHTML = table
}


