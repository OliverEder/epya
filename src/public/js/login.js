const password_input = document.querySelector("#password_input");
const email_input = document.querySelector("#email_input");
const show_password_cb = document.querySelector("#show_password_cb");
const send_btn = document.querySelector("#send_btn");
const mensaje_password = document.querySelector("#mensaje_password");

const show_password = (e) => {
    if(e.target.checked){
        password_input.setAttribute("type", "text");
    }else {
        password_input.setAttribute("type", "password");
    }
} 

const enviar = async (e) => {
    try {
        e.preventDefault();
        if(
            email_input.value.trim() === "" ||
            password_input.value.trim() === ""
        ){
            mensaje_password.innerText = "Los campos son obligatorios"
            mensaje_password.classList.add("has-text-weight-bold")
            setTimeout(() => {
                mensaje_password.classList.remove("has-text-weight-bold")
            }, 1000);
            return;
        }

        const data = {
            user_email: email_input.value,
            user_password: password_input.value
        }

        const response = await fetch("http://localhost:3001/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: new URLSearchParams(data)
        })

        const result = await response.json();

        const {error} = result;
        if(error){
            mensaje_password.innerText = error;
            mensaje_password.classList.add("has-text-weight-bold")
            setTimeout(() => {
                mensaje_password.classList.remove("has-text-weight-bold")
            }, 1000);
            return;
        }else{
            mensaje_password.innerText = "";
        }





        
    } catch (error) {
        console.log(error);
    }
} 

show_password_cb.addEventListener("click", show_password);
send_btn.addEventListener("click", enviar)
