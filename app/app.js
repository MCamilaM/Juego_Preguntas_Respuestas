fetch('../app/rondas.json')
    .then(resp => resp.json())
    .then(data => {
        localStorage.setItem('historico', data);
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
        createPregunta(i,cod,data,val);
    })
    .catch(error => console.log("Hubo un error: " + error.message))


    function sigPregunta(i){
        let res=document.getElementById("resultado");
        console.log("contPregunta"+(i+1))
        let pregunta=document.getElementById("contPregunta"+(i+1));
        console.log(pregunta);
        res.removeChild(pregunta);
        
    }


    function createPregunta(i,cod,data,val){
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
            cod+=`<button type="button" class="btn btn-success" id="boton">Responder</button>
            <button type="button" class="btn btn-danger">Rendirse</button></div>`
            document.getElementById("resultado").innerHTML=cod
            document.getElementById("boton").addEventListener("click", function(){                 
                //invocar a validate Response enviar i, j, y la respuesta selecionada.
                if(i+1<data.length){
                    i++;
                    cod='';
                    validateAnswer(i,val,data,cod)
                   
                }
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

    function validateAnswer(index,val,data,cod)  {
        let si= document.getElementsByClassName("form-check-input");
        let no= document.getElementsByClassName("form-check-label");
        for (let i = 0; i < si.length; i++) {
            if(si[i].checked){
               if(no[i].innerText == data[index-1][val].answer ) {
                console.log(":'D")    
                createPregunta(index,cod,data,val);
               }
            }
            
        }
    
    }      
/**
 * val, es el rango
 */

        