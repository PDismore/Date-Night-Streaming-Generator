window.addEventListener
    ('DOMContentLoaded', () =>{
        const overlay = document.querySelector ('#overlay')
        const keysub = document.querySelector ('#key-sub')
        const modclose = document.querySelector ('#close-modal')

        keysub.addEventListener("click", function() {
            overlay.classList.remove('hidden')
            overlay.classList.add('flex')
        })
        modclose.addEventListener("click", function() {
            overlay.classList.add('hidden')
            overlay.classList.remove('flex')
        })
        
    })