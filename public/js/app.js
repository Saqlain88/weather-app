//allows us to fetch data from url

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

//message1.textContent = 'loading.'
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    
    if(!location){
        console.error('Please provide an input')
    }else{
        message1.textContent = 'Loading...'
        message2.textContent = ''
        fetch('/weather?address='+location).then((response) => {
            response.json()
            .then((data)=> {
                console.log(data)
                message1.textContent = data.location
                message2.textContent = data.forecastData
            })
            .catch(e =>{ message1.textContent = e.message})
        }).catch(e => {message1.textContent = e.message})
        
    }
})