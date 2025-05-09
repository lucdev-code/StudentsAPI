async function signin(e) {
    e.preventDefault()

    const password = document.getElementById('passwordSignin').value

    if (!password?.trim()) return console.log('Los datos no han sido llenados correctamente')

        const response = await fetch('http://localhost:3000/auth/student/login', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
    
        if (!response.ok) return console.log('Error en la petición');
    
        const result = await response.json();
        
        if(result.status !== 'OK') return alert('Credenciales incorrectas, ingresa nuevamente')
        else return window.location.href = '../../front-end/html/index.html'
}



document.addEventListener('DOMContentLoaded', async() => {


    const searchCookie = await fetch('http://localhost:3000/auth/student/cookie', 
        {
            credentials: 'include',
            method: 'GET' 
        }
    )
    
    if(!searchCookie.ok) {
        const errorData = await searchCookie.json();
            throw new Error(errorData.error || 'Error al verificar el email');
    }

    const infoCookie = await searchCookie.json()

    if (infoCookie.status !== 'OK') {
        console.log(infoCookie.status)
        window.location.href = '../../front-end/html/index.html'
    }

    const formLogin = document.getElementById('login')

    if(!formLogin) return console.log('No existe el form')

    const inputEmail = document.getElementById('emailSignin')
    inputEmail.value = infoCookie.mail

    formLogin.addEventListener('submit', signin)
})