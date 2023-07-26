function getRandomEmail(value){
    const time = new Date();
    const emailname = time.getTime();
    return `Albrecht${value}${emailname}@email.com`
}

export const newValidUser = { 
    name:'Albrecht Vodička', 
    email: getRandomEmail('A'), 
    password: 'Heslo123'
} 

export const alreadyExistingUser = { 
    name:'Jan Novák', 
    email: 'jan.novak@email.com', 
    password: 'Heslo123567'
} 

export const invalidPasswordUser = { 
    name:'Evžen Kreveta', 
    email: getRandomEmail('B'), 
    password: '1234567'
} 