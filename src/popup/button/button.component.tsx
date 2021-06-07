import React, { useState } from 'react';
import {
    selectDomElements,
    savingDomElements,
} from '../utils/chrome.message';

function ButtonComponent(): JSX.Element {

    function getDomElements(){
        var checkbox = document.getElementById("mark");
        if (checkbox.checked == true){
            // alert("yes");
            selectDomElements({type : "marked"});
          } else {
            selectDomElements({type : "unmarked"});
          }
    }
    function addingDomElements(){
        var checkbox = document.getElementById("select");
        if (checkbox.checked == true){
            // alert("yes");
            savingDomElements({type : "save"});
          } else {
            savingDomElements({type : "unsave"});
          }
    }
    
    return (
        <div>
            
            <label for="mark">Mark: </label>
            <input type = "checkbox" id = "mark" onClick = {getDomElements}></input>
            
            <label for="select">Select: </label>
            <input type = "checkbox" id = "select" onClick = {addingDomElements}></input>

        </div>
    );
}

export default ButtonComponent;
