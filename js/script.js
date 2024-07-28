let nameField=document.getElementById("name")
let urlField=document.getElementById("url")
let submitbtn=document.getElementById("submitBtn")
let bookList=[];


submitbtn.addEventListener('click',function(e){
    e.stopPropagation()
    addBook()
})

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

    if(validation()){
        book={
            bookName:nameField.value,
            siteUrl:urlField.value
        }
        bookList.push(book)
        localStorage.setItem("bookList",JSON.stringify(bookList))
        display()
        reset()
    }
    else{
        document.getElementById("dialog-box").style.display="block";
        document.getElementById("main").style.opacity=0.3;
    }
}

document.getElementById("closeBtn").addEventListener('click',function(e){
    e.stopPropagation()
    close()
})

function close(){
    document.getElementById("dialog-box").style.display="none";
    document.getElementById("main").style.opacity=1;
}

function display(){
    let cartona=``
    for(let i=0;i<bookList.length;i++){
        cartona+=`
            <tr>
                <td>${i+1}</td>
                <td>${bookList[i].bookName}</td>
                <td><button class="btn  btn-visit text-white" onclick="window.location.href='https:${bookList[i].siteUrl}';"><i class="fa-solid fa-eye me-2"></i>Visit</button></td>
                <td><button class="btn  btn-danger text-white" onclick="deletebook(${i})"><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
            </tr>`
    }
    document.getElementById("tablebody").innerHTML=cartona;
    
}

function deletebook(i){
    bookList.splice(i,1)
    localStorage.setItem("bookList",JSON.stringify(bookList))
    display()
}

//validation
function isNameValid(){
    let nameRegex=/^[a-zA-Z ]{3,12}$/
    let bookname=nameField.value
    if(nameRegex.test(bookname)){
        document.getElementById("trueicon-name").style.display="block"
        document.getElementById("erroricon-name").style.display="none"
        nameField.classList.add("true-field")
        nameField.classList.remove("false-field")
        return true
    }
    else{
        document.getElementById("trueicon-name").style.display="none"
        document.getElementById("erroricon-name").style.display="block"
        nameField.classList.remove("true-field")
        nameField.classList.add("false-field")
        return false
    }
}
function isUrlValid(){
    let urlRegex=/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/
    let siteurl=urlField.value
    if(urlRegex.test(siteurl)){
        document.getElementById("trueicon-url").style.display="block"
        document.getElementById("erroricon-url").style.display="none"
        urlField.classList.add("true-field")
        urlField.classList.remove("false-field")
        return true
    }
    else{
        document.getElementById("trueicon-url").style.display="none"
        document.getElementById("erroricon-url").style.display="block"
        urlField.classList.remove("true-field")
        urlField.classList.add("false-field")
        return false
    }
}

function isNameUnrepeated(){
    let unrepeated=true;
    let bookname=nameField.value
    for(let i=0;i<bookList.length;i++){
        if(bookList[i].bookName==bookname){
            console.log("repeat");
            unrepeated=false;
        }
    }
    return unrepeated;
}

function validation(){
    if(isNameUnrepeated()&&isNameValid()&&isUrlValid()){
        return true
    }
    else{
        return false
    }
}

document.addEventListener('click',function(e){
    close()
    e.stopPropagation()
})
document.getElementById("dialog-box").addEventListener('click',function(e){
    e.stopPropagation()
})
