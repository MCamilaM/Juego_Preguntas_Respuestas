
fetch('../app/rondas.json')
    .then(resp => resp.json())
    .then(data => {
        let puntajes=[0,50,100,150,200,250];
        let puntaje = 0;
        let i=0;
        let val=Math.floor(Math.random() * (4 - 0)) + 0;
        /*
        let cad='<tr><th>Preguntas</th><th>Respuesta</th></tr>'
        for (let categoria of data){
            cad+=`<tr><td id="${categoria[val].answer}">
            ${categoria[val].question}</td>
                    <td>${categoria[val].answer}</td></tr>`
        }
        document.getElementById("tabla1").innerHTML=cad*/
        let cod='';
        createPregunta(i,cod,data,val,puntajes);
    })
    .catch(error => console.log("Hubo un error: " + error.message))
    function sigPregunta(i){
        let res=document.getElementById("resultado");
        console.log("contPregunta"+(i+1))
        let pregunta=document.getElementById("contPregunta"+(i+1));
        console.log(pregunta);
        res.removeChild(pregunta);
        
    }


    function createPregunta(i,cod,data,val,puntajes){
        console.log(i+1)
        cod+=`<div id="contPregunta${i+1}">
            <h5>${data[i][val].question}</h5>` 
            for (let j = 0; j < data[i][val].items.length; j++) { 
                cod+=`<div class="form-check" id="pregunta${j}">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="${j}">
                <label class="form-check-label" for=${j}>
                  ${data[i][val].items[j]}   
                               
                </label>
                </div>`
            }
            /*cod+=`<button type="button" class="btn btn-success" onClick=sigPregunta(${i}) id="boton">Responder</button>
            <button type="button" class="btn btn-danger">Rendirse</button></div>`
            document.getElementById("resultado").innerHTML=cod
            document.getElementById("boton").addEventListener("click", function(){                 
                //invocar a validate Response enviar i, j, y la respuesta selecionada.
                if(i+1<data.length){
                    i++;
                    cod='';
                    createPregunta(i,cod,data,val);
                }1
            });*/
            cod+=`<button type="button" class="btn btn-success" disabled id="boton">Responder</button>
            <button type="button" class="btn btn-danger" id="boton2">Rendirse</button></div>`
            document.getElementById("resultado").innerHTML=cod
            if (document.querySelector('input[name="flexRadioDefault"]')) {
                document.querySelectorAll('input[name="flexRadioDefault"]').forEach((elem) => {
                  elem.addEventListener("change", function() {
                    let boton=document.getElementById("boton");
                    boton.disabled = false;
                  });
                });
              }
            document.getElementById("boton").addEventListener("click", function(){                 
                //invocar a validate Response enviar i, j, y la respuesta selecionada.
                if(i+1<data.length){
                    i++;
                    cod='';
                    validateAnswer(i,val,data,cod,puntajes)
                }
            });
            document.getElementById("boton2").addEventListener("click", function(){                 
                location.href="lostGame.html"
            });
    }

    function escribirHistorico(){
        let historico=document.getElementById("historico");
        let cod='';
        cod+=`<div class="card">
        <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
        </div>
        </div>`
        
        historico.innerHTML=cod;
    }

    function validateAnswer(index,val,data,cod,puntajes)  {
        let si= document.getElementsByClassName("form-check-input");
        let no= document.getElementsByClassName("form-check-label");
        console.log("index: "+index)
        for (let i = 0; i < si.length; i++) {
            if(si[i].checked){
               if(index == 4 && (no[i].innerText == data[index-1][val].answer)){
                    //pagina de ganar juego
                    console.log("ganaste :)");
                    setPuntaje(index,puntajes)
               }else if (no[i].innerText == data[index-1][val].answer) {
                    console.log(":'D") 
                    setPuntaje(index,puntajes)
                    createPregunta(index,cod,data,val,puntajes);
                }else{
                    setPuntaje(0,puntajes)
                    location.href="lostGame.html"
                    
            }
            }
            
        }
    } 
    function setPuntaje(idCategoria,puntajes) {
        let puntaje = puntajes[idCategoria];     
        console.log(puntaje)   
    }
/**
 * val, es el rango
 * 
 * Comparar si la pregunta es la ultima
 * guardar historico
 * mostrar historico
 * cambiar nombre variables
 */

        