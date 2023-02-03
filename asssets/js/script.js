// se define el areglo principal

let tareas = [
    { 
        id:1,
        descripcion:"hacer mercado",
        completado: true

    }, 
    { 
        id:2,
        descripcion:"estudiar para la prueba",
        completado: true

    },  
    { 
        id:3,
        descripcion:"Sacar a pasear a tobby",
        completado: false

    }
];

//defino variables globales

let inputAgregar =  document.querySelector("#inputAgregar");
const botonAgregar =  document.querySelector("#botonAgregar");
const spanTareasTotales = document.querySelector("#tareasTotales");
const spanTareasRealizadas = document.querySelector("#tareasRealizadas");
const divTareas = document.querySelector("#tareas");
const botonBorrar = document.querySelector("#botonBorrar");

let nuevoId = tareas.length +1;
renderTareas()



botonAgregar.addEventListener("click", function(){
   
    crearTarea();

    renderTareas();
  
    
})

//se hace el evento del boton agregar
function crearTarea(){
    
    let nuevaTarea = inputAgregar.value;
    tareas.push(
        {
            id: nuevoId,
            descripcion: nuevaTarea,
            completado: false
        });

  

    nuevoId += 1;

}

//se hace el render de las tareas
function renderTareas(){
    let html ="";
    
    tareas.forEach(function(tarea){
        let checkboxChequeado = "";

        if(tarea.completado){
            checkboxChequeado = "checked"
        }

        let template = `
        <div style="width:10%">${tarea.id}</div>
        <div style="width:70%">${tarea.descripcion}</div>
        <div style="width:10%">
            <input type="checkbox" id="completado-${tarea.id}" ${checkboxChequeado} value=${tarea.id} onchange="actualizarTarea(this)">
        </div>
        <div style="width:10%" class="mt-2">
            <button class="btn btn-danger" onclick="borrarItem(${tarea.id})">X</button>
        </div>
        `;

        html += template;
        
    })
    divTareas.innerHTML = html;

    let totalDeTareas = spanTareasTotales;
    totalDeTareas.innerHTML = tareas.length;

    buscarTareasCompletadas();
}

function actualizarTarea(objeto){
   
    //busco si el elemento existe dentro del arreglo
    let i = tareas.findIndex(tarea => tarea.id == objeto.value);
    
     if(i >= 0){
         
        if(objeto.checked){
            tareas[i].completado = true;    
        }
        else{
            tareas[i].completado = false;
        }    
     }
    
    buscarTareasCompletadas()
}


function buscarTareasCompletadas(){
    let completadas = tareas.filter((x) => x.completado )
    let totalDeTareas = spanTareasRealizadas;
    totalDeTareas.innerHTML = completadas.length;
     

    
}

//se hace el elemento borrar

function borrarItem(id){
    const tareaBorrar = tareas.findIndex((tarea) => tarea.id == id)
    tareas.splice(tareaBorrar,1);
    renderTareas();  
}


