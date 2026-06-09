// Mouse Glow Effect

document.addEventListener("mousemove", (e) => {

  const glow = document.querySelector(".background-glow");

  let x = e.clientX;
  let y = e.clientY;

  glow.style.left = x - 350 + "px";
  glow.style.top = y - 350 + "px";

});
window.addEventListener("load", ()=>{

    setTimeout(()=>{

        document.getElementById("loader").style.display="none";

    },3500);

});