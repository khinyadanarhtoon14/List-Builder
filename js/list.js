//selector
const app=document.querySelector('#app');
const inputText=document.querySelector('#inputText');
const addBtn=document.querySelector('#addBtn');
const doneListCounter=document.querySelector('#doneListCounter');
const totalListCounter=document.querySelector('#totalListCounter');
const lists=document.querySelector('#lists');
   



//randomId for check from label becoz id is dynamic
const getRndInteger=(min, max)=> {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
const makeRandId=(length) => {
    let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');
    // console.log(chars.length)
    let result='';
    for(let i=1;i<=length;i++){
        result+=chars[getRndInteger(0,chars.length)]
    }
    
    return result
}
console.log(makeRandId(5))
console.log(makeRandId(7))


//countlist
const countList=() => {
  const totalList=lists.querySelectorAll('.list').length


    //totallistcounter
totalListCounter.innerText=totalList;
//donelistcounter
doneListCounter.innerText=lists.querySelectorAll('.list-checker [type="checkbox"]:checked').length

  //emptylist
  if(totalList===0){
  lists.innerHTML=`<div class='empty-stage'><p class='text-center'>There is no list</p><br><img src="./file.png" alt="" width='150'class='d-block m-auto'></div>`;}
  else{
    lists.querySelector('.empty-stage')?.remove();//if list appear,this stage is remove
  }

}

//function divide for reusable and return
const createList=(text) => {

    const list=document.createElement('div');
    list.classList.add('list');
  list.innerHTML=`<div class="border border-2 border-primary p-3 d-flex justify-content-between align-items-center mb-4">
  <div class="form-check list-checker">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked">
      <label class="form-check-label list-label" for="flexCheckChecked">
        ${text}
      </label>
    </div>

    <div class="listControl">
      <button class="btn btn-outline-primary list-edit-btn">
          <i class="bi bi-pen-fill"></i>
      </button>
      <button class="btn btn-outline-primary list-del-btn"> 
          <i class="bi bi-trash3-fill"></i>
      </button>
    </div>
</div>`;

//delete Btn
const listDelbtn=list.querySelector(".list-del-btn");
listDelbtn.addEventListener("click",() => {
    const decision=window.confirm('Are you sure to delete?');
    decision && list.remove();
    countList()
    
});


//checklist
const listChecker=list.querySelector('.list-checker');
listChecker.addEventListener('click',() => {
    countList()
})

//list edit Btn
const listEditbtn=list.querySelector('.list-edit-btn');
const listLabel=list.querySelector('.list-label')
listEditbtn.addEventListener('click',() => {
  console.log('u  edit');
  //create edit input box
  const editInput=document.createElement('input');
  editInput.classList.add('form-control');
  editInput.value=listLabel.innerText;//even editbtn click previous value apper
  listLabel.innerText=null;//old value list delete
  listLabel.append(editInput);//remove space replace create input
  editInput.addEventListener('blur',() => {
    listLabel.innerText=editInput.value
  })
  console.log(listLabel.innerText)
})







return list;
}

//process
countList();
addBtn.addEventListener('click',() => {
  //  console.log(inputText.value);

lists.append(createList(inputText.value));
    inputText.value=null;
    countList();

  

})