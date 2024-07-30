
colors = {
    "home" : "#dbc136",
    "resumes" : "#d4a299", 
    "recordings" : "#8eb7e5", 
    "projects" : "red",
    "resumes_music": "#d4a299",
    "resumes_tech": "#d4a299"
}

function Navigate(page, container_class){
    document.querySelectorAll('.nav-links > a').forEach(element => {
        element.style.color = "white"; 
    })

    document.getElementById(page).firstChild.style.color = colors[page]; 
    const container = document.querySelector(container_class);
    fetch("page/" + page + ".html")
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html;
            if(page == "resumes"){
                handleResumes(container)
                navigateResume("resumes_tech")
            }
        })
        .catch(error => {
            console.error("Error fetching page: ", error)
        })
}

function handleResumes(container) {
    Array.from(container.getElementsByTagName("a")).forEach(resume => {
        resume.addEventListener("click", event => {
            event.preventDefault()
            let name = resume.getAttribute("href").substring(1)
            navigateResume(name)
        })
    })
}

function navigateResume(page){
    document.querySelectorAll('.resumes-links > a').forEach(element => {
        element.style.color = "white"; 
    })
    document.getElementById(page).firstChild.style.color = colors[page]; 

    const container = document.querySelector(".resume");
    console.log(container)
    fetch("page/" + page + ".html")
        .then(response => response.text())
        .then(html => {
            container.innerHTML = html
        })
        .catch(error => {
            console.error("Error fetching page: ", error)
        })
}

document.querySelectorAll('.nav-links a').forEach(page => {
    page.addEventListener("click", event => {
        
        event.preventDefault()
        let name = page.getAttribute("href").substring(1)
        Navigate(name, ".container")
    })
})

Navigate("home", ".container")


