export const nameValue = 'Tomas Novak';
//pro kazdou registraci je potreba zadavat novy email
const seconds = new Date().getUTCSeconds();
const randomNumber = Math.round(Math.random() * seconds);
export const emailValue = 'tomasnovak_' + randomNumber + '@gmail.com';
export const secondEmailValue = 'novakt' + randomNumber + '@gmail.com';
export const pswdValue = 'StrongPswd079cz' //heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici
export const existingEmail = 'tomasnovak@gmail.com';
export const wrongPswdvalue = '787901';
export const toastMsgvalue = 'Některé pole obsahuje špatně zadanou hodnotu';
