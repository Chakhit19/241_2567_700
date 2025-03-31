const BASE_URL = 'http://localhost:8000';
let mode = 'CREATE'; //default mode
let selectid = '';

window.onload = async() => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log('id', id);
    if (id) {
        mode = 'EDIT';
        selectid = id;

        //1. เราจะดึงข้อมูลของ user ที่ต้องการแก้ไข
        try{
            const response = await axios.get(`${BASE_URL}/user/${id}`);
            const user = response.data;

            //2. เราจะนำข้อมูลของ user ที่ดึงมา ใส่ใน input ที่เรามี
            let firstnameDOM = document.querySelector('input[name=firstname]');
            let lastnameDOM = document.querySelector('input[name=lastname]');
            let ageDOM = document.querySelector('input[name=age]');
            let descriptionDOM = document.querySelector('textarea[name=description]');

            firstnameDOM.value = user.firstname;
            lastnameDOM.value = user.lastname;
            ageDOM.value = user.age
            descriptionDOM.value = user.description;

            let genderDOMs = document.querySelectorAll('input[name=gender]');
            let interestDOMs = document.querySelectorAll('input[name=interest]');

            for (let i = 0; i < genderDOMs.length; i++) {
                if (genderDOMs[i].value == user.gender) {
                    genderDOMs[i].checked = true;
                }
            }
            for (let i = 0; i < interestDOMs.length; i++) {
                if(user.interests.includes(interestDOMs[i].value)) {
                    interestDOMs[i].checked = true;
                }
            }

        } catch (errors) {
            console.log('error', errors);
        }
    }
}

const validateData = (userData) => {
    let errors = [];

    if (!userData.firstname) {
        errors.push('กรุณากรอกชื่อ');
    }
    if (!userData.lastname) {
        errors.push('กรุณากรอกนามสกุล');
    }
    if (!userData.age) {
        errors.push('กรุณากรอกอายุ');
    }
    if (!userData.gender) {
        errors.push('กรุณาเลือกเพศ');
    }
    if (!userData.interests) {
        errors.push('กรุณาเลือกความสนใจ');
    }
    if (!userData.description) {
        errors.push('กรุณากรอกคำอธิบาย');
    }
    return errors;
};

const submitData = async () => {
    let firstnameDOM = document.querySelector('input[name=firstname]');
    let lastnameDOM = document.querySelector('input[name=lastname]');
    let ageDOM = document.querySelector('input[name=age]');
    let genderDOM = document.querySelector('input[name=gender]:checked') || {};
    let interestDOM = document.querySelectorAll('input[name=interest]:checked') || [];
    let descriptionDOM = document.querySelector('textarea[name=description]');
    let messageDOM = document.getElementById('message');

    try {
        let interest = '';
        for (let i = 0; i < interestDOM.length; i++) {
            interest += interestDOM[i].value;
            if (i != interestDOM.length - 1) {
                interest += ',';
            }
        }

        let userData = {
            firstname: firstnameDOM.value,  
            lastname: lastnameDOM.value,
            age: ageDOM.value,
            gender: genderDOM.value,
            interests: interest,
            description: descriptionDOM.value
        }

        console.log("submitData", userData);
/*
        const errors = validateData(userData);
        if (errors.length > 0) {
            throw {
                message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
                errors: errors
            };
        }
*/
        let message = 'บันทึกข้อมูลเรียบร้อย';
        if (mode == 'CREATE') {
            const response = await axios.post(`${BASE_URL}/user`, userData);
            console.log('response', response.data);
        }else{
            const response = await axios.put(`${BASE_URL}/user/${selectid}`, userData);
            message = 'แก้ไขข้อมูลเรียบร้อย';
            console.log('response', response.data);
        }
        messageDOM.innerText = message;
        messageDOM.className = 'message success';
    } catch (error) {
        console.log('error message', error.message);
        console.log('error', error.errors);

       if (error.response) {
            console.log('error.response', error.response.data.message);
            error.message = error.response.data.message;
            error.errors = error.response.data.errors;
        }
        let htmlData = '<div>';  
        htmlData += '<div>' + error.message + '</div>';
        htmlData += '<ul>';
        
        for (let i = 0; i < error.errors.length; i++) {
            htmlData += '<li>' + error.errors[i] + '</li>';
        }
        htmlData += '</ul>'; 
        htmlData += '</div>';

        messageDOM.innerHTML = htmlData;
        messageDOM.className = 'message danger';
    }

    
}