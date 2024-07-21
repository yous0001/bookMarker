let nameField=document.getElementById("name")
let urlField=document.getElementById("url")
let submitbtn=document.getElementById("submitBtn")
let bookList=[];


submitbtn.addEventListener('click',addBook)

if(localStorage.getItem("bookList")===null){
    bookList=[]
}
else{
    bookList=JSON.parse(localStorage.getItem("bookList"))
    display()
}

function reset(){
    nameField.value=""
    urlField.value=""
}

function addBook(){
    book={
        bookName:nameField.value,
        siteUrl:urlField.value
    }
    bookList.push(book)
    localStorage.setItem("bookList",JSON.stringify(bookList))
    console.log(bookList);
    display()
}

function display(){
    let cartona=``
    for(let i=0;i<bookList.length;i++){
        cartona+=`
            <tr>
                <td>${i+1}</td>
                <td>${bookList[i].bookName}</td>
                <td><button class="btn  btn-visit text-white"><i class="fa-solid fa-eye me-2"></i>Visit</button></td>
                <td><button class="btn  btn-danger text-white"><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
            </tr>`
    }
    document.getElementById("tablebody").innerHTML=cartona;
    
}


//validation
function isNameValid(){
    let nameRegex=/^[a-zA-Z ]{3,12}$/
    let bookname=nameField.value
    if(nameRegex.test(bookname)){
        document.getElementById("trueicon-name").display="block"
        document.getElementById("erroricon-name").display="none"
        nameField.style.borderColor="#198754"
        return true
    }
    else{
        document.getElementById("trueicon-name").display="none"
        document.getElementById("erroricon-name").display="block"
        nameField.style.borderColor="#DC3545"
        return false
    }
}
function isUrlValid(){
    let urlRegex=/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
    let siteurl=urlField.value
    if(urlRegex.test(siteurl)){
        return true
    }
    else{
        return false
    }
}