let string = "";
let btns = document.querySelectorAll(".button");
let display = document.querySelector(".display");

Array.from(btns).forEach((btns) => {
  btns.addEventListener("click", (e) => {
    // console.log(e.target);
    if(e.target.innerHTML === '='){
        try{
            string = eval(string.replace("×","*").replace("÷","/"));
            display.value = string;
        }catch(error){
            display.value = "Error";
            string = "";
        }
    }else if(e.target.innerHTML === 'AC'){
        string = "";
        display.value = " ";
    }else if(e.target.innerHTML === '←'){
        string = string.slice(0,-1);
    }else if(e.target.innerHTML === '%'){ 
        if(string !== ""){
            string = string + "/100";
            display.value = string;    
        }else{
            display.value = "";
        }
    }else{
        string = string + e.target.innerHTML;
    }  
    display.value = string;
  });
});