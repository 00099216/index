console.log('loaded!');

const selector = document.getElementById('lang');
const encryptBtn = document.getElementById('encrypt');
const decryptBtn = document.getElementById('decrypt');
const target = document.getElementById('target');
const key = document.getElementById('key');
const result = document.getElementById('result');

const langs = {
  'eng': 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  'spa': 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZabcdefghijklmnñopqrstuvwxyz'
};

function encrypt(target, mask, table) {
  let encrypted = [];
  const valid = /^[A-Za-z]*$/.test(target);
  if (!valid) {
    alert(
      'Se han detectado caracteres no contemplados ' +
      'estas serán ignoradas en la encripción.'
    );
  }

  for (let i = 0; encrypted.length < target.length; i++) {
    const x = langs[selector.value].indexOf(target[i]);
    const y = langs[selector.value].indexOf(mask[i]);

    if (x === -1 || y === -1) {
      encrypted.push(target[i]);
    } else {
      encrypted.push(table[x][y]);
    }
  }

  return encrypted.join('');
}

function decrypt(target, mask, table) {
  let decrypted = [];

  for (let i = 0; decrypted.length < target.length; i++) {
    const x = langs[selector.value].indexOf(mask[i]);
    const y = table[x] && table[x].indexOf(target[i]);

    decrypted.push(langs[selector.value][y] || target[i]);
  }

  return decrypted.join('');
}

function eventWrapper(decryptVal=false) {
  const tgtVal = target.value;
  const keyVal = key.value;
  const selected = selector.value;

  if (tgtVal.length === 0 || keyVal.length === 0) {
    alert('Values must be filled');
    return;
  }

  const keyMask = keyVal.repeat(tgtVal.length).slice(0, tgtVal.length);
  let table = [...Array(langs[selected].length)];

  table = table.map((t, i) => {
    const langLength = langs[selected].length;
    let rowval = [];

    for (let j = i; rowval.length < langLength; j++) {
      rowval.push(langs[selected][j % langLength]);
    }

    return rowval.join('');
  });

  const valid = /^[A-Za-z\ ]*$/.test(keyVal);
  if (!valid) {
    alert('la llave ingresada no es valida, ingresar solo letras y espacios');
    return;
  }

  result.value = decryptVal ? decrypt(tgtVal, keyMask, table) :
    encrypt(tgtVal, keyMask, table);
}

encryptBtn.addEventListener('click', (evt) => eventWrapper());
decryptBtn.addEventListener('click', (evt) => eventWrapper(true));

document.addEventListener("DOMContentLoaded", function() {
  var inputs = document.querySelectorAll('[readonly]');
  for(var i=0; i < inputs.length; i++){
    inputs[i].addEventListener('keydown', function(e){
      var key = e.which || e.keyCode || 0;
      if(key === 8){
        e.preventDefault();
      }
    })
  }
});