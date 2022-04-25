fetch('../rondas.json')
    .then(resp => resp.json())
    .then(data => {
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
        let pregunta=document.getElementById("contPregunta"+i);
        console.log(pregunta);
        res.removeChild(pregunta);
        
    }
    function createPregunta(i,cod,data,val){
        cod+=`<div id="contPregunta${i+1}">
            <h5>${data[i][val].question}</h5>` 
            for (let j = 0; j < data[i][val].items.length; j++) { 
                cod+=`<div class="form-check" id="pregunta${j}">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                  ${data[i][val].items[j]}
                </label>
                </div>`
            }
            cod+=`<button type="button" class="btn btn-success" onClick=sigPregunta(${i}) id="boton">Responder</button>
            <button type="button" class="btn btn-danger">Rendirse</button></div>`
            document.getElementById("resultado").innerHTML=cod
            document.getElementById("boton").addEventListener("click", function(){ 
                if(i!=data.length){
                    i++;
                }
                cod='';
                createPregunta(i,cod,data,val);
            });
    }