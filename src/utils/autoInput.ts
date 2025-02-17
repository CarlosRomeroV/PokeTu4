export function autoInput (inputFieldId:string){
  const input = document.getElementById(inputFieldId);
  
  if (!input) {
    console.error(`No se encontró un input con el id: ${inputFieldId}`);
    return;
  }

  function handleKeydown(event) {
    if (event.target === input) return;
    
    if (event.key.length === 1) {
      inputFieldId.value += event.key;
      inputFieldId.focus();
    } else if (event.key === 'Backspace') {
      inputFieldId.value = inputFieldId.value.slice(0, -1);
      inputFieldId.focus();
    }
    
    event.preventDefault();
  }

  document.addEventListener('keydown', handleKeydown);

  // Retorna una función para remover el event listener si es necesario
  return () => {
    document.removeEventListener('keydown', handleKeydown);
  };
}