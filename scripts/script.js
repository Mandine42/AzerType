function afficherResultat(score, nombreMotsProposes){
    let spanScore = document.querySelector(".zoneScore span")

    let affichageScore = `${score} / ${nombreMotsProposes}`

    spanScore.innerHTML = affichageScore
    console.log("Votre score est de " + score + " sur " + nombreMotsProposes)
}
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}+?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}
function validerNom(nom){
    if(nom.length < 2){
        throw new Error("Le nom est trop court.")
    }
    
}
function validerEmail(email){
    let emailRegExp = new RegExp ("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if(!emailRegExp.test(email)){
        throw new Error("L'email n'est pas valide.")
    }
    
}
function afficherMessageErreur(message){
   let spanErreurMessage = document.getElementById("erreurMessage")
    
   if(!spanErreurMessage){
    let popup = document.querySelector(".popup")
    spanErreurMessage = document.createElement("span")
    spanErreurMessage.id = "erreurMessage"
   
    popup.append(spanErreurMessage)
    }
    spanErreurMessage.innerText = message
}

function gererFormulaire(scoreEmail){
    try{
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)
        
        let baliseEmail = document.getElementById("email")
        let email = baliseEmail.value
        validerEmail(email)
        afficherMessageErreur("")
        afficherEmail(nom, email, scoreEmail)

    }catch (erreur){
        afficherMessageErreur(erreur.message)
    }
    
}
function lancerJeu(){
    initAddEventListenerPopup()
    let score = 0
    let i = 0
    let listeProposition = listeMot


   let boutonValiderMots = document.getElementById("boutonValiderMots")
   let inputEcriture = document.getElementById("inputEcriture")
    afficherProposition(listeProposition[i])
    boutonValiderMots.addEventListener("click", () => {
        console.log(inputEcriture.value)
        if (inputEcriture.value === listeProposition[i]){
            score++
        }
        i ++
        afficherResultat (score, i)
        inputEcriture.value = ''
        if (listeProposition[i] === undefined){
            afficherProposition("Le jeu est fini") 
            boutonValiderMots.disabled = true
        }else{
        afficherProposition(listeProposition[i])
        }
    })
    
    let listeBoutonRadio = document.querySelectorAll(".optionSource input")
    for(let j = 0; j < listeBoutonRadio.length; j++) {
        listeBoutonRadio[j].addEventListener("change", (event) =>{
            console.log(event.target.value)
            if (event.target.value === "1"){
                listeProposition = listeMot
            }else{
                listeProposition = listePhrase
            }
            afficherProposition (listeProposition[i])
        })
        
    }
    
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
            let scoreEmail = `${score} / ${i}`
            gererFormulaire(scoreEmail)
    
    })
    afficherResultat (score, i) 
}

lancerJeu()


