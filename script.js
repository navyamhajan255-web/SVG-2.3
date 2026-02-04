const svg = document.getElementById("canvas");
const colorPicker = document.getElementById("colorPicker");
const undoBtn = document.getElementById("undoBtn");
const clearBtn = document.getElementById("clearBtn");

let drawing = false;
let currentPath = null;
let paths = [];

svg.addEventListener("mousedown", (e) => {
    drawing = true;
    const { offsetX, offsetY } = e;

    currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    currentPath.setAttribute("d", `M ${offsetX} ${offsetY}`);
    currentPath.setAttribute("stroke", colorPicker.value);
    currentPath.setAttribute("stroke-width", "3");
    currentPath.setAttribute("fill", "none");

    svg.appendChild(currentPath);
    paths.push(currentPath);
});

svg.addEventListener("mousemove", (e) => {
    if (!drawing) return;
    const { offsetX, offsetY } = e;
    let d = currentPath.getAttribute("d");
    currentPath.setAttribute("d", d + ` L ${offsetX} ${offsetY}`);
});

svg.addEventListener("mouseup", () => drawing = false);
svg.addEventListener("mouseleave", () => drawing = false);

undoBtn.addEventListener("click", () => {
    const last = paths.pop();
    if (last) svg.removeChild(last);
});

clearBtn.addEventListener("click", () => {
    svg.innerHTML = "";
    paths = [];
});
