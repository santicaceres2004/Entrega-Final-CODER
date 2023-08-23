
// //                          Bienvenida

// Input de SweetAlert
document.addEventListener("DOMContentLoaded", async function() {
  let nameLogIn = ""; 

  while (nameLogIn === "") { 
    const { value: inputName } = await Swal.fire({
      title: 'Bienvenido a MyCamio',
      input: 'text',
      inputLabel: 'Como te llamas?',
      inputPlaceholder: 'Nombre',
      background: '#fff ',
      backdrop: `
        #000000
      `,
      confirmButtonText: 'Siguiente',
    });

    nameLogIn = inputName; 

    if (nameLogIn === null) {
      return; 
    }
  }

  // Confirmacion de nombre
  let welcome = document.createElement("div");
  const h2 = document.createElement("h2");

  h2.innerText = 'Bienvenido ' + nameLogIn;
  welcome.append(h2);
  document.body.append(welcome);
});

// =========================================================================

const btn = document.createElement('button');
btn.textContent = 'INICIAR';
document.body.append(btn);


btn.addEventListener('click', () => {
    //Creo el parrafo inicial
    const date = new Date;
    const p =  document.createElement('p');
    p.innerText = 'La camioneta de hoy ' + 
    '(' + date.toLocaleDateString() + ') ' + 'esta formada por:';
    document.body.append(p);
    // Hacer que sea presionado una vez sola 
    btn.disabled = true;
    

    // Boton para agregar children
    let btnAdd = document.createElement('button');
    btnAdd.textContent = 'Agregar +';
    btnAdd.id = 'openPopup'
    document.body.append(btnAdd);

        btnAdd.addEventListener ('click', () => {

            add();
            // updateLocalStorage(); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        })


    // Boton para eliminar children
    let btnLess = document.createElement('button');
    btnLess.textContent = 'Eliminar -';
    document.body.append(btnLess);

        btnLess.addEventListener ('click', () => {
            less();
            // updateLocalStorage(); !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        })
    // Boton de Filtrado
    const btnFilter = document.createElement('button');
    btnFilter.textContent = 'Filtrar:';
    btnFilter.id = 'btnFilter'
    document.body.append(btnFilter);
        
    btnFilter.addEventListener ('click', () => {
        filtrado();
        
    })

    showList();

// Boton para finalizar
    const btnEnd = document.createElement('button');
    btnEnd.textContent = 'Finalizar';
    btnEnd.id = 'btnEnd'
    document.body.append(btnEnd);

    btnEnd.addEventListener ('click', (e) => {
        Swal.fire({
          title: 'Listo para partir!',
          text: 'Tienes ' + children.length + ' alumnos',
          icon: 'success',
          confirmButtonText: 'Vamos!'
        }) 
        e.preventDefault();
        localStorage.removeItem('ListaDeChildren')
    })   
})

//==============================================================================

//Array de objetos
const children = [
    { nombre: 'Santiago', edad: 19, colegio: 'ISASA' },
    { nombre: 'Juan', edad: 20, colegio: 'Ingles' },
    { nombre: 'Pedro', edad: 15, colegio: 'Colegio America' }
  ];
  
  //Funcion para mostrar la lista con nombres
  function showList() {
    const listaExistente = document.querySelector('ol');
  if (listaExistente) {
    listaExistente.remove();
  }
    const ol = document.createElement('ol'); 
    
    // Recorro el array con forEach
    children.forEach(objeto => {

        //Creo el li
        const li = document.createElement('li');
    li.innerHTML = `Nombre: ${objeto.nombre}, Edad: ${objeto.edad}, Colegio: ${objeto.colegio}`;
    ol.appendChild(li); 

    
    });
    document.body.append(ol);  
  }

  
//==============================================================================
//                                   BOTONES

// Función para agregar children
async function add() {

  // Inputs de SweeetAlert
  const { value: name } = await Swal.fire({
    title: 'Nombre',
    input: 'text',
    inputLabel: 'Ingrese nombre',
    inputPlaceholder: 'Nombre'
  });

  const { value: ageDeclare } = await Swal.fire({
    title: 'EDAD',
    icon: 'question',
    input: 'range',
    inputLabel: 'Ingrese edad',
    inputAttributes: {
      min: 0,
      max: 100,
      step: 1
    },
    inputValue: 0,
    inputValidator: (value) => {
      if (!value) {
        return 'Debe ingresar una edad';
      }
    }
  });

    const { value: school } = await Swal.fire({
    title: 'COLEGIO',
    input: 'text',
    inputLabel: 'Ingrese colegio',
    inputPlaceholder: 'Colegio'
  });

  const newChildren = {
    nombre: name,
    edad: parseInt(ageDeclare),
    colegio: school
  };

  const addChildren = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (newChildren.nombre === null || newChildren.nombre.trim() === '') {
          reject('Nombre no válido');
        } else if (isNaN(newChildren.edad) || newChildren.edad <= 0 || newChildren.edad > 100) {
          reject('Edad no válida');
        } else if (newChildren.colegio === null || newChildren.colegio.trim() === '') {
          reject('Colegio no válido');
        } else {
          children.push(newChildren);
          resolve(children);
        }
      }, 1500);
    });
  }

  async function fetchingChildren() {
    try {
      const childrenFetched = await addChildren();
      console.log(childrenFetched);
      showList();
      Toastify({
        text: "Agregado correctamente",
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function () { } // Callback after click
      }).showToast();
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Cerrar'
      });
    }
  }

  fetchingChildren();

  saveToLocalStorage();
}

//=======================================
async function less() {
  const { value: accept } = await Swal.fire({
    title: 'Seguro que quieres eliminar?',
    input: 'checkbox',
    inputValue: 1,
    inputPlaceholder:
      'Si, quiero eliminar.',
    confirmButtonText:
      'Continuar <i class="fa fa-arrow-right"></i>',
  });

  if (accept) {
    children.pop();
    showList();
    if (children.length === 0) {
      Swal.fire({
        title: 'La lista está vacía',
        icon: 'warning',
        confirmButtonText: 'Cerrar'
      });
    } else {
      Toastify({
        text: 'Eliminado correctamente',
        duration: 3000,
        destination: 'https://github.com/apvarun/toastify-js',
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: {
          background: 'linear-gradient(to right, #FF0000, #800040)'
        },
        onClick: function () {} // Callback after click
      }).showToast();
    }

    saveToLocalStorage();
  } else {
    showList();
  }
}  

//====================================================================
//                                FILTRADO

function filtrado () {

const inputName = document.createElement('input');
inputName.id = 'searchByName';
inputName.type = 'text'
inputName.placeholder = 'Ingrese un nombre';
document.body.append(inputName) 



let inputAge = document.createElement('input');
inputAge.id = 'searchByAge';
inputAge.type = 'Number'
inputAge.placeholder = 'Menor que: Ingrese edad';
document.body.append(inputAge)



let inputColegio = document.createElement('input');
inputColegio.id = 'searchByColegio';
inputColegio.type = 'text'
inputColegio.placeholder = 'Ingrese un colegio';
document.body.append(inputColegio)



const searchButton = document.createElement('button');
searchButton.textContent = 'Buscar';
searchButton.id = 'searchButton'
document.body.append(searchButton); 
searchButton.addEventListener('click', searchingButton);

function searchingButton() {
    const name = document.getElementById('searchByName').value.toLowerCase();
    const age = parseInt(document.getElementById('searchByAge').value);
    const colegio = document.getElementById('searchByColegio').value.toLowerCase();

    let filteredResults = children.filter((el) => {

        const nameMatch = el.nombre.toLowerCase().includes(name);

        const ageMatch = isNaN(age) || el.edad <= age;

        const colegioMatch = el.colegio.toLowerCase().includes(colegio);
    
        return nameMatch && ageMatch && colegioMatch;
      });
    

      console.log(filteredResults);
      showFilteredResults(filteredResults);
    }
  }


    function showFilteredResults (filtredChildren) {
        const filChildList = document.createElement('ul');
        document.body.append(filChildList);


        filtredChildren.forEach((objeto) => {
            const listChild = document.createElement('li');
            listChild.textContent = `Nombre: ${objeto.nombre}, Edad: ${objeto.edad}, Colegio: ${objeto.colegio}`;
            filChildList.appendChild(listChild);
        })
}

//===========================================================================
//                          LocalStorage

function updateLocalStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key === 'children') {
      localStorage.removeItem(key);
      saveToLocalStorage(); 
      break; 
    }
  }
}


const saveToLocalStorage = (clave, valor) => { 
  localStorage.setItem(clave, valor);
};

//Guardar en el local storage de a 1 niño
for ( const nombre of children) {
  saveToLocalStorage(nombre.nombre, JSON.stringify(nombre));
}

saveToLocalStorage('ListaDeChildren', JSON.stringify(children));