//funcionalidad del Navbar
document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }
});




//Botones de recarga
document.addEventListener('DOMContentLoaded', () => {
    var boton1 = document.getElementById('boton1');
    var boton2 = document.getElementById('boton2');
    var boton3 = document.getElementById('boton3');
    var ventana = document.getElementById('modal1');
    var title = document.getElementById('modtitle');
    var empresa = document.getElementById('empresa')
    boton1.onclick = function() {
        ventana.classList.toggle('is-active');
        title.innerHTML = "Recarga Movilnet";
        empresa.value = "movilnet";


    };
    boton2.onclick = function() {
        ventana.classList.toggle('is-active');
        title.innerHTML = "Recarga Movistar";
        empresa.value = "movistar";

    };
    boton3.onclick = function() {
        ventana.classList.toggle('is-active');
        title.innerHTML = "Recarga Digitel";
        empresa.value = "digitel";

    };

});




//Funcionalidad del Modal
document.addEventListener('DOMContentLoaded', () => {
    var boton = document.getElementById('boton');
    var ventana = document.getElementById('modal1');
    var close = document.getElementById('del');
    var back = document.getElementById('modalback');
    var cancel = document.getElementById('cancel');
    close.onclick = function() {
        ventana.classList.toggle('is-active');

    };
    back.onclick = function() {
        ventana.classList.toggle('is-active');

    };
    cancel.onclick = function() {
        ventana.classList.toggle('is-active');

    };
});





//Desplegable del navbar
document.addEventListener('DOMContentLoaded', () => {
    var desplegable = document.getElementById('desplegable');
    desplegable.onclick = function() {
        desplegable.classList.toggle('is-active');

    };

});




//Funcionalidad de las Tabs
function openTab(evt, tabName) {
    var i, x, tablinks;
    x = document.getElementsByClassName("content-tab");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab");
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " is-active";
};




//Ajax carga listado de usuarios
function loadDoc(div, page) {
    //console.log('se ejecuta');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var content = JSON.parse(this.responseText)
            document.getElementById(div).innerHTML = '';
            for (let item of content.slice(1)) {
                document.getElementById(div).innerHTML += ` <div class="card has-background-dark has-text-light" id='${item[1]}'>
                <div class="card-header has-background-link">
                &nbsp${item[1]}&nbsp&nbsp&nbspSaldo:` + ' ' + item[6].toFixed(1) +
                    `</div>
                <div class="card-content">
                Email: ${item[2]}<br>Conexion: ${item[4]}<br>Estatus: ${item[5]}
                </div>
                </div>

               </div><br>`;
                conectado();
            }
            //document.getElementById(div).innerHTML = ;
        }
    };
    xhttp.open("GET", page, true);
    xhttp.send();
};



//Ajax carga el conteo de usuarios
function loadDoccont(div, page) {
    //console.log('se ejecuta');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var content = JSON.parse(this.responseText)
            document.getElementById(div).innerHTML = '';
            //for (let item of content.slice(0)) {
            document.getElementById(div).innerHTML = `<div class="tag is-primary">Total de Clientes: <div id="total"> ${content[0]}</div></div>
                <i class="fas fa-fw">&nbsp</i>
                <div class="tag is-link">Conectados: <div id="conect">${content[1]}</div></div>
                <div class="tag is-link">Desconectados: <div id="desc">${content[2]}</div></div>
                <i class="fas fa-fw">&nbsp</i>
                <div class="tag is-link">Activos: <div id="activ">${content[3]}</div></div>
                <div class="tag is-link">Inactivos: <div id="inact">${content[4]}</div></div>
                <i class="fas fa-fw">&nbsp</i>
                <div class="tag is-link">Al Dia: <div id="aldia">${content[5]}</div></div>
                <div class="tag is-link">Morosos: <div id="moros">${content[6]}</div></div>

`;
        }
        //document.getElementById(div).innerHTML = ;
    }

    xhttp.open("GET", page, true);
    xhttp.send();
};




//Pruebas
function pruebas() {
    console.log('esto si funciona');
    var content = document.getElementById("clientes");
    content.innerHTML = content.innerHTML;
};



//Ocultar Notificacion
function borrado() {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            var mensaje = document.getElementById("notification");
            mensaje.style.display = "none";
        }, 3000);
    });
};




//Usuario Conectado
function conectado() {
    //console.log('aqui1');
    var conectado = document.querySelectorAll('.card-content')
        //console.log('aqui2')
    for (i = 0; i < conectado.length; i++) {
        if (conectado[i].innerHTML.indexOf('Conectado') != -1) {
            //console.log(conectado[i].innerHTML);
            conectado[i].classList.remove('has-background-link');
            conectado[i].classList.add('has-background-primary');
            conectado[i].classList.remove('has-text-light');
            conectado[i].classList.add('has-text-black-bis');
            //console.log('aqui tambien');

        };
    };
};

function actu() {
    document.addEventListener('DOMContentLoaded', () => {
        var btn = document.getElementById('entrar');
        btn.onclick = function() {
            var dive = document.getElementById('client');
            var url = 'http://localhost:5000/api/datos/?datos=todo';

            loadDoc(dive, url);
            todos();
        };
    });
};


function ClickCard(ident) {
    var ClickCard = document.getElementById(ident);
    var ventana = document.getElementById('modal1');
    ventana.classList.toggle('is-active');
    var nom = ClickCard.children[0].innerText;
    var reca = ClickCard.children[1].innerText.split("\n");
    var ider = document.getElementById('ider');
    var fecha = document.getElementById('fecha');
    ventana.childNodes[3].childNodes[3].innerHTML = `<div>${nom}</div>
    <div>${reca[0]}</div>
    <div>${reca[1]}</div>
    <div>${reca[2]}</div>
    <div>${reca[3]}</div>
    <div>${reca[4]}</div>`;
    ider.value = nom.slice(1);
    fecha.value = reca[0].slice(7);
    //console.log(ventana.childNodes[3].childNodes[3])

};

//Ajax carga listado de recargas
function loadrec(div, page) {
    //console.log('se ejecuta');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var content = JSON.parse(this.responseText)
            document.getElementById(div).innerHTML = '';
            for (item of content) {
                if (item[4] == 0) {
                    var ord = item[3].split(',');
                    document.getElementById(div).innerHTML += `<div class="card has-background-dark has-text-light" id="rec${ item[1]}" onclick="ClickCard(this.id)
                "><div class="card-header has-background-link">&nbsp${item[1]}</div><div class="card-content">
                    Fecha: ${item[2]}<br>Orden:<br>&nbsp&nbsp&nbsp
                                     Empresa: ${ord[0]}<br>&nbsp&nbsp&nbspNumero: ${ord[1]}<br>&nbsp&nbsp&nbspMonto:
                ${ord[2]}
                             </div>
                      </div><br>
             </div>`
                };
            }
            //document.getElementById(div).innerHTML = ;
        }
    };
    xhttp.open("GET", page, true);
    xhttp.send();
};

function limpiar() {
    var ider = document.getElementById('ider');
    var fecha = document.getElementById('fecha');
    ider.value = '';
    fecha.value = '';

}


function todos() {
    //loadrec('todosorden', 'http://localhost:5000/api/datos/?datos=rec');
    conectado();
    loadrec('todosorden', 'http://uriell77.pythonanywhere.com/api/datos/?datos=rec');
    loadDoc('todos', 'http://uriell77.pythonanywhere.com/api/datos/?datos=todo');
    loadDoccont('tags', 'http://uriell77.pythonanywhere.com/api/datos/?datos=cuenta');
    //loadDoc('todos', 'http://localhost:5000/api/datos/?datos=todo');
    //loadDoccont('tags', 'http://localhost:5000/api/datos/?datos=cuenta');
};