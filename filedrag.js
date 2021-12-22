//Variables
const dropbox = document.getElementById("dropbox");
let filetable = document.getElementById("filetable");
let th = "<tr><th>Nombre</th><th>Tamaño</th> <th>Tipo</th><th>Icono</th></tr>";
let tamanyo = 1500;
let tipo = ".jpg";
let icono = "./img/img.png";
let archivos = new Array();

filetable.innerHTML = th;
filetable.style.display = "none";

//DragStart
dropbox.addEventListener("dragstart", (e) => {
  e.preventDefault();
  console.log("DragStart");
});
//DragOver
dropbox.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropbox.classList.add("active");
  dropbox.textContent = "Suelta aquí el archivo";
  console.log("DragOver");
});
//DragLeave
dropbox.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropbox.classList.remove("active");
  dropbox.textContent = "Arrastra y suelta ficheros aquí ...";
  console.log("DragLeave");
});
//Drag
dropbox.addEventListener("drag", (e) => {
  e.dataTransfer.setData("text", e.target.id);
});
//Drop
dropbox.addEventListener("drop", (e) => {
  e.preventDefault();
  dropbox.classList.remove("active");
  dropbox.textContent = "Arrastra y suelta ficheros aquí ...";

  filetable.style.display = "inline-block";

  //Creo las filas de la tabla:
  let archivos = e.dataTransfer.files;
  for (let f = 0; f < archivos.length; f++) {
    let td = `<tr><td>${archivos[f].name}</td><td>${archivos[f].size}</td><td>${archivos[f].type}</td><td>${type2icon(archivos[f].type).outerHTML}</td></tr>`;
    filetable.innerHTML += td;
  }
});

function type2icon(mime) {
  let node = document.createElement("img");

  if (mime.match("image/*")) {
    node.src = "./img/img.png";
  } else if (mime === "text/html") {
    node.src = "./img/html.png";
  } else if (mime === "text/css") {
    node.src = "./img/css.png";
  } else if (mime === "application/x-javascript") {
    node.src = "./img/js.png";
  } else if (mime === "application/pdf") {
    node.src = "./img/pdf.png";
  } else {
    node.src = "./img/text.png";
  }
  return node;
}

function humanFileSize(size) {
  let i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    " " +
    ["B", "kB", "MB", "GB", "TB"][i]
  );
}

function dragover_handler(ev) {
  ev.preventDefault();
}
function drop_handler(ev) {
  ev.preventDefault();
  let data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
  console.log(data);
}
function dragstart_handler(ev) {
  ev.dataTransfer.setData("text/plain", ev.target.id);
  let img = new Image();
  img.src = "example.gif";
  ev.dataTransfer.setDragImage(img, 10, 10);
  console.log(ev.target.id);
}
