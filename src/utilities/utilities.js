const validatePhoneForE164 = (phoneNumber) =>{
    const regEx = /^\+[1-9]\d{10,14}$/;

    return regEx.test(phoneNumber);
};

const getListName =()=>{
    let date = new Date();
    return  `incoming_${date.toISOString().slice(0, 10)}`;
}

export default { validatePhoneForE164, getListName};