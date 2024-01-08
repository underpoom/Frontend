import React from 'react'
import "./Toggle.css"
export const Toggle = () => {
    function myFunction() {
      var element = document.getElementById("myDIV");
      element.classList.toggle("mystyle");
    }
  return (
    
    <div>
      <p>
        Click the "Try it" button to toggle between adding and removing the
        "mystyle" class name of the DIV element:
      </p>

      <button onclick="myFunction()">Try it</button>
      <div id="myDIV">This is a DIV element.</div>

      
    </div>
  );
}
export default Toggle;