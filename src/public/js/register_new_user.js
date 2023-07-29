const register_form = document.querySelector("#register_form");
const send_btn = document.querySelector("#send_btn");

const fields_validations = [
    {
        field_name: "alias_input",
        validations: ["not_empty"],
        errors: []
    },
    {
        field_name: "email_input",
        validations: ["not_empty", "email"],
        errors: []
    },
    {
        field_name: "password_input",
        validations: ["min_length-3", "max_length-4"],
        errors: []
    },
];

send_btn.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = new FormData(register_form);
    const fields = Object.fromEntries(formData);

    for (const field in fields) {
        validate(field);
    }

    console.log("fields_validations:", fields_validations);
});


const validate_string = (str, patern) => {
    const regex = new RegExp(patern);
    return regex.test(str.trim());
}

const not_empty = (field) => {
    const input = document.querySelector(`#${field}`);
    if(validate_string(input.value, "^(?=\s*$)")){
        return "El campo es requerido";
    }
    return;
}

const email = (field) => {
    const input = document.querySelector(`#${field}`);
    if(!validate_string(input.value, "[a-z0-9]+@[a-z]+\.[a-z]{2,3}")){
        return "El campo requiere un email valido";
    }
    return;
}

const min_length = (field, min_length) => {
    const input = document.querySelector(`#${field}`);
    console.log("min_length:", validate_string(input.value, `^.{${min_length}}`));
    if(!validate_string(input.value, `^.{${min_length}}`)){
        return `Se requiren màs de ${min_length} caracteres`;
    }
    return;
}

const max_length = (field, max_length) => {
    const input = document.querySelector(`#${field}`);
    if(validate_string(input.value, `^.{${max_length},}`)){
        return `Se requiren menos de ${max_length} caracteres`;
    }
    return;
}

const validate = (field ) => {
    for (const field_validation of fields_validations) {
        if(field_validation.field_name === field){
            for (const validation of field_validation.validations) {
                if(validation === "not_empty"){
                    const result = not_empty(field_validation.field_name);
                    if(result){
                        field_validation.errors.push(result);
                    }
                }

                if(validation === "email"){
                    const result = email(field_validation.field_name);
                    if(result){
                        field_validation.errors.push(result);
                    }
                }

                if(validation.includes("min_length")){
                    const validation_parts = validation.split("-");
                    const result = min_length(field_validation.field_name, validation_parts[1]);
                    if(result){
                        field_validation.errors.push(result);
                    }
                }

                if(validation.includes("max_length")){
                    const validation_parts = validation.split("-");
                    const result = max_length(field_validation.field_name, validation_parts[1]);
                    if(result){
                        field_validation.errors.push(result);
                    }
                }
            }
        }
    }
}