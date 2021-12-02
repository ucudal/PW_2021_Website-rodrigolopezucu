let x = document.cookie;

const url_el = 'https://PW2021-APINodejsrodrigolopezucu.rodrigolopezucu.repl.co/experiencia-laboral';
var request_el = new Request(url_el, {
    method: 'GET',    
    headers: {
        'Content-Type': 'application/json'
    }
});

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}


  let user = getCookie("PW_2021-CV_Contacto");
  if (user != "") {
    alert("Welcome again " + user);
  } 


fetch(request_el).then(function(response) {
    if(response.ok) {
        response.json().then(function(data) {            
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            let v = data['experiencia-laboral'];            
            let ul = document.getElementById("expLaboral");
            for (var k in v) {
                let li=document.createElement('li');
                let h2_empr=document.createElement('h2');
                let h3_cargo=document.createElement('h3');
                let h3_desc=document.createElement('h3');                
                let fechaInicio = new Date(v[k].fechaInicio).toLocaleDateString(undefined, options)
                let fechaFin = new Date(v[k].fechaFin).toLocaleDateString(undefined, options)
                h2_empr.appendChild(document.createTextNode(v[k].empresa+" ("+fechaInicio+" - "+fechaFin+")"));
                h3_cargo.appendChild(document.createTextNode("Cargo"));
                h3_desc.appendChild(document.createTextNode("Descripción"));
                li.appendChild(h2_empr);    
                li.appendChild(h3_cargo);
                li.appendChild(document.createTextNode(v[k].puesto));
                li.appendChild(h3_desc);
                li.appendChild(document.createTextNode(v[k].descripcion));
                ul.appendChild(li);                
            }            
        });
    }else {
        console.log(response.statusText);
    }
}).catch(function(error) {
    console.log('Hubo un problema con la petición:' + error.message);
});

function formSend(e,form){
    const data = new URLSearchParams(new FormData(form));
    const url_form = 'https://PW2021-APINodejsrodrigolopezucu.rodrigolopezucu.repl.co/enviar-formulario';
    var request_form = new Request(url_form, {
        method: "POST",        
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: 'include',
        body: data        
    });

    fetch(request_form).then(function(response) {
        if(response.ok) {
            response.text().then(function(data) {            
                form.remove();
                let msg = document.getElementById("form_result");
                msg.appendChild(document.createTextNode(data));
                msg.parentElement.parentElement.parentElement.classList.remove("hidden");
            });
        }else {
            console.log(response.statusText);
        }
    }).catch(function(error) {
        console.log('Hubo un problema con la petición:' + error.message);
    });
    e.preventDefault();
}