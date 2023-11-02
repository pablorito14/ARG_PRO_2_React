
const year = (new Date()).getFullYear();
document.getElementById('year').innerHTML = year;

const emailContraints = {
  email: {
    email:true
  }
}

function formValidate(){
  let { nombre,apellido,dni,email,tel } = form;
  let valid = true;
  
  if(nombre.value.length < 3){
    nombre.classList.add('invalid')
    valid = false;
  } else {
    nombre.classList.remove('invalid');
  }

  if(apellido.value.length < 3){
    apellido.classList.add('invalid')
    valid = false;
  } else {
    apellido.classList.remove('invalid');
  }


  if(dni.value.length < 7 || dni.value.length > 8){
    dni.classList.add('invalid')
    valid = false;
  } else {
    dni.classList.remove('invalid');
  }

  let invalidEmail = validate({email:email.value},emailContraints,{format:'grouped'});
  
  if(invalidEmail){
    email.classList.add('invalid')
    valid = false;
  } else {
    email.classList.remove('invalid');
  }
  
  if(tel.value.length < 3){
    tel.classList.add('invalid')
    valid = false;
  } else {
    tel.classList.remove('invalid');
  }

  if(!valid)
    return false;

  return true;
}

const form = document.getElementById('form-contacto');

form.tipoSeguro.addEventListener('change',(value) => {
  let tipoSeguro = form.tipoSeguro.value;
  let precioSeguro = document.getElementById('precioSeguro');
  switch(tipoSeguro){
    case 'basico':
      precioSeguro.innerHTML = `Precio del seguro ${tipoSeguro} $500`;
      return;
    case 'intermedio':
      precioSeguro.innerHTML = `Precio del seguro ${tipoSeguro} $1000`;
      return;
    case 'premium':
      precioSeguro.innerHTML = `Precio del seguro ${tipoSeguro} $1500`;
      return;

  }
})

form.addEventListener('submit',(event) => {
  event.preventDefault();

  if(!formValidate()){
    return;
  }

  let { nombre,apellido,dni,email,tel,tipoSeguro } = form;

  let contacto = {
    nombre: nombre.value,
    apellido: apellido.value,
    dni: dni.value,
    email: email.value,
    tel: tel.value,
    tipoSeguro: tipoSeguro.value
  }

  let btnEnviar = document.getElementById('btnEnviar')
  btnEnviar.disabled = true;
  btnEnviar.innerHTML = 'Enviando...'
  btnEnviar.classList.add('btn-disabled')

  setTimeout(() => {
    Swal.fire({
      title: '¡Formulario completo!',
      text: `Se va a enviar mail a ${contacto.nombre} (${contacto.email}).\nEn consola se puede ver el objeto completo`,
      icon: 'success',
      allowOutsideClick: false,
      showCloseButton: true,
      confirmButtonText: 'Cerrar'
    })

    btnEnviar.disabled = false;
    btnEnviar.innerHTML = 'Enviar'
    btnEnviar.classList.remove('btn-disabled')
      
  }, 1000);

})


