let boxes= document.querySelectorAll(".box");
let resetbtn= document.querySelector("#reset");
let newgmebtn= document.querySelector("#new-btn");
let msgcontainer= document.querySelector(".msg-cont");
let msg= document.querySelector("#msg");
let turnO= true;
const winpattern= [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(box.innerHTML=="" && turnO){
            box.innerHTML="O";
            turnO=false;
        }else if(box.innerHTML=="" && !turnO){
            box.innerHTML="X";
            turnO=true;
        }
        box.disabled=true;
        checkWinner();
    });
});


const checkWinner=()=>{
 for(pattern of winpattern){
    let pos1val= boxes[pattern[0]].innerHTML;
    let pos2val= boxes[pattern[1]].innerHTML;
    let pos3val= boxes[pattern[2]].innerHTML;
      if(pos1val !='' && pos2val !='' && pos3val !=''){if (pos1val==pos2val && pos2val==pos3val){
       
        showWinner(pos1val);
      }
    }

 }
}

const disabledBoxes=()=>{
    boxes.forEach((box)=>{
        box.disabled=true;
    });
}

const enabledBoxes=()=>{
    boxes.forEach((box)=>{
        box.disabled=false;
    });
}


const showWinner=(winner)=>{
    msg.innerHTML=winner +" Player is the winner 🎉🍾";
    msgcontainer.classList.remove("hide");
    disabledBoxes();
}

const resetgame=()=>{
    turnO=true;
    enabledBoxes();
    boxes.forEach((box)=>{
        box.innerHTML="";
    });
    msgcontainer.classList.add("hide");
}

newgmebtn.addEventListener("click",()=>{
    resetgame();
});
resetbtn.addEventListener("click",()=>{
    resetgame();
}
);

