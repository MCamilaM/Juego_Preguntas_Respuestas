document.getElementById('jsonBtn').addEventListener('click', cargarJSON)

function cargarJSON(){
    (fetch('../rondas.json'))
    .then(resp => resp.json())
    .then(data => {
        let i=0;
        let val=Math.floor(Math.random() * (4 - 0)) + 0;
        
        let cad='<tr><th>Preguntas</th><th>Respuesta</th></tr>'
        for (let categoria of data){
            cad+=`<tr><td id="${categoria[val].answer}">
            ${categoria[val].question}</td>
                    <td>${categoria[val].answer}</td></tr>`
        }
        document.getElementById("tabla1").innerHTML=cad
        console.log(data[i][val].question)
        let cod=''
        while (i!=data.length) {
            cod+=`<h5>${data[i][val].question}</h5>` 
            for (let j = 0; j < data[i][val].items.length; j++) { 
                cod+=`<div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                <label class="form-check-label" for="flexRadioDefault1">
                  ${data[i][val].items[j]}
                </label>
                </div>`
            }
            i++;   
        }
        document.getElementById("resultado").innerHTML=cod
    })
    .catch(error => console.log("Hubo un error: " + error.message))
}