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
    var boton1 = document.getElementById('Movilnet');
    var boton2 = document.getElementById('Movistar');
    var boton3 = document.getElementById('Digitel');
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




//Botones de Cuentas
document.addEventListener('DOMContentLoaded', () => {
    var boton1 = document.getElementById('Netflix');
    var boton2 = document.getElementById('Disney+');
    var boton3 = document.getElementById('Amazon Prime');
    var ventana = document.getElementById('modal1');
    var title = document.getElementById('modtitle');
    var empresa = document.getElementById('empresa')
    boton1.onclick = function() {
        ventana.classList.toggle('is-active');
        title.innerHTML = "Cuentas Netflix";
        empresa.value = "Netflix";


    };
    boton2.onclick = function() {
        ventana.classList.toggle('is-active');
        title.innerHTML = "Cuentas Disney+";
        empresa.value = "Disney+";

    };
    boton3.onclick = function() {
        ventana.classList.toggle('is-active');
        title.innerHTML = "Cuentas Amazon Prime";
        empresa.value = "Amazon Prime";

    };

});





//Funcionalidad del Modal
document.addEventListener('DOMContentLoaded', () => {
    var boton = document.getElementById('boton');
    var ventana = document.getElementById('modal1');
    var ventana2 = document.getElementById('modal12');
    var ventana3 = document.getElementById('modal13');

    var close = document.getElementById('del');
    var back = document.getElementById('modalback');
    var cancel = document.getElementById('cancel');
    var close2 = document.getElementById('del2');
    var back2 = document.getElementById('modalback2');
    var cancel2 = document.getElementById('cancel2');
    var close3 = document.getElementById('del3');
    var back3 = document.getElementById('modalback3');
    var cancel3 = document.getElementById('cancel3');

    close.onclick = function() {
        ventana.classList.toggle('is-active');

    };
    back.onclick = function() {
        ventana.classList.toggle('is-active');

    };
    cancel.onclick = function() {
        ventana.classList.toggle('is-active');

    };

    close2.onclick = function() {
        ventana2.classList.toggle('is-active');

    };
    back2.onclick = function() {
        ventana2.classList.toggle('is-active');

    };
    cancel2.onclick = function() {
        ventana2.classList.toggle('is-active');

    };
    close3.onclick = function() {
        ventana3.classList.toggle('is-active');

    };
    back3.onclick = function() {
        ventana3.classList.toggle('is-active');

    };
    cancel3.onclick = function() {
        ventana3.classList.toggle('is-active');

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
            var content = JSON.parse(this.responseText);
            //console.log(nivel);
            //console.log(data);
            document.getElementById(div).innerHTML = '';
            if (nivel == 1) {
                for (let item of content.slice(1)) {
                    document.getElementById(div).innerHTML += ` <div class="card has-background-dark has-text-light" id='${item[1]}'>
                <div class="card-header has-background-link">
                &nbsp${item[1]}&nbsp&nbsp&nbspSaldo:` + ' ' + item[6].toFixed(1) +
                        `</div>
                <div class="card-content">
                Email: ${item[2]}<br>Conexion: ${item[4]}<br>Estatus: ${item[5]}<br>
                VendedorID: ${item[8]}
                </div>
                </div>

               </div><br>`;
                    conectado();
                }
            } else {
                for (let item of content.slice(1)) {
                    if (data == item[8]) {
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
                }
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




function Clicksaldo(ident, j) {
    //console.log(ident);
    var cliCard = document.getElementById(ident);
    //console.log(cliCard.childNodes[0].innerHTML.slice(6));
    var ventana = document.getElementById('modal13');
    ventana.classList.toggle('is-active');
    console.log('ahora');
    //var nom = j[1];
    //var reca = j[3].split("\n");
    //var reca = reca[0].split(",");
    //var ider = document.getElementById('ider');
    //var fecha = document.getElementById('fecha');
    //ventana.childNodes[3].childNodes[3].innerHTML = `<div>${cliCard.childNodes[0].innerHTML.slice(6)}</div>
    //<div>${cliCard.childNodes[1].innerHTML}</div>`;
    //ider.value = cliCard.childNodes[0].innerHTML.slice(6);
    //fecha.value = ident;
    //console.log(ventana.childNodes[3].childNodes[3])
};




function ClickCard(ident, j) {
    //console.log(ident);
    var cliCard = document.getElementById(ident);
    console.log(cliCard.childNodes[0].innerHTML.slice(6));
    var ventana = document.getElementById('modal1');
    ventana.classList.toggle('is-active');
    console.log('ahora');
    //var nom = j[1];
    //var reca = j[3].split("\n");
    //var reca = reca[0].split(",");
    var ider = document.getElementById('ider');
    var fecha = document.getElementById('fecha');
    ventana.childNodes[3].childNodes[3].innerHTML = `<div>${cliCard.childNodes[0].innerHTML.slice(6)}</div>
    <div>${cliCard.childNodes[1].innerHTML}</div>`;
    ider.value = cliCard.childNodes[0].innerHTML.slice(6);
    fecha.value = ident;
    //console.log(ventana.childNodes[3].childNodes[3])
};


function ClickCardcu(ident, j) {
    //console.log(j[1]);
    var cliCard = document.getElementById(ident);
    console.log(cliCard.childNodes[1].innerHTML);
    var ventana = document.getElementById('modal12');
    ventana.classList.toggle('is-active');
    //console.log('ahora');
    var nom = j[1];
    //var reca = j[3].split("\n");
    //var reca = reca[0].split(",");
    var ider = document.getElementById('ider2');
    var fecha = document.getElementById('fecha2');
    ventana.childNodes[3].childNodes[3].innerHTML = `<div>${cliCard.childNodes[0].innerHTML.slice(6)}</div>
    <div>${cliCard.childNodes[1].innerHTML}</div>`;
    ider.value = cliCard.childNodes[0].innerHTML.slice(6);
    fecha.value = ident;
    //console.log(cliCard.childNodes[0].innerHTML)

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
                if (item[4] == 0 && item[5] == data) {
                    var ord = item[3].split(',');
                    document.getElementById(div).innerHTML += `<div class="card has-background-dark has-text-light" id="${item[2]}" onclick="ClickCard(this.id,item)
                "><div class="card-header has-background-link">&nbsp${item[1]}</div><div class="card-content" style="cursor:pointer">
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


//Ajax carga listado de cuentas
function loadcuent(div, page) {
    //console.log('se ejecuta');
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var content = JSON.parse(this.responseText)
            document.getElementById(div).innerHTML = '';
            for (item of content) {
                if (item[5] == 0 && item[7] == data) {
                    var ord = item[3].split(',');
                    document.getElementById(div).innerHTML += `<div class="card has-background-dark has-text-light" id="${item[2]}" onclick="ClickCardcu(this.id,item)
                "><div class="card-header has-background-link">&nbsp${item[1]}</div><div class="card-content" style="cursor:pointer">
                    Fecha: ${item[2]}<br>Orden:<br>&nbsp&nbsp&nbsp
                                     Orden: ${item[3]}<br>&nbsp&nbsp&nbspCant: ${item[4]}<br>&nbsp&nbsp&nbspFecha de Corte:
                ${item[6]}
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
    loadrec('todosorden', 'http://localhost:5000/api/datos/?datos=rec');
    loadDoc('todos', 'http://localhost:5000/api/datos/?datos=todo');
    loadDoccont('tags', 'http://localhost:5000/api/datos/?datos=cuenta');
    loadcuent('todosordenc', 'http://localhost:5000/api/datos/?datos=cuentas');

    conectado();

    //loadrec('todosorden', 'http://uriell77.pythonanywhere.com/api/datos/?datos=rec');
    //loadDoc('todos', 'http://uriell77.pythonanywhere.com/api/datos/?datos=todo');
    //loadDoccont('tags', 'http://uriell77.pythonanywhere.com/api/datos/?datos=cuenta');

};