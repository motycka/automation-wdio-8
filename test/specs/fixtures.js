export const username = 'da-app.admin@czechitas.cz';
export const password = 'Czechitas123';
export const userFullName = 'Lišák Admin';
export const expectedApplicationsPageRows = 30;

export function getRandomEmail() {
    const id = Date.now()
    return 'user-' + id + '@email.cz' 
}