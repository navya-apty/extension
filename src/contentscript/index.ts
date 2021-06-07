import unique from 'unique-selector';

console.log('this is content script');
// let alpha  = [];
let g = window.location.href;
console.log(g);
var alpha = [];
var gamma;
var domData = {}
var innerdata = {};
let index;
var options = {
    // Array of selector types based on which the unique selector will generate
    selectorTypes : [ 'ID', 'Class', 'Tag', 'NthChild' ]
}
window.addEventListener('load', (event) => {
    console.log('The page has fully loaded');
    chrome.storage.sync.get(null, function(items) {
        var allKeys = Object.keys(items);
        index = allKeys.indexOf(g);
        // console.log(index)
        var allValues = Object.values(items);
        gamma = Object.values(allValues)
        // console.log(gamma[index]);
        // gamma = gamma[index];
        for (let valu of gamma) {
            // console.log(valu); //{key:value}
            // console.log(Object.values(valu))//[value]
            let yes = Object.values(valu)
            alpha.push(yes)
            
        }
        if(index !== -1){
            // console.log(alpha)
            // console.log(alpha[index][1])
            // console.log(alpha[index].length)
            for (let i=0;i< alpha[index].length;i++) {
                let domEle = alpha[index][i];
                // domEle.target.style.border = "solid gold"
                let beta = document.querySelector(alpha[index][i]).style.border = 'solid gold';
                // let beta = document.querySelector(alpha[index][i]);
                console.log(beta)
                // console.log(alpha[0][i]);
            }
        }
    });	

/*
        // console.log(alpha)//0: value
        // let alpha = Object.values(allValues)
        // for (const i of Object.values(allValues)) {
        //     let beta = document.querySelector(i);
        //     // beta.style.border = "gold"
        //     console.log(beta)//null
        // }
        // console.log(allKeys);
        // console.log(allValues);
        // console.log(gamma.length)
        // console.log(gamma.data)
    
    
    let gamma = []
    chrome.storage.sync.get(g, function (obj) {
        console.log(obj);//[{}]
        var f = Object.values(obj)
        console.log(f);
        for (let valu of f) {
            console.log(valu); 
            console.log(Object.values(valu))
            let yes = Object.values(valu)
            alpha.push(yes)
          }
        console.log(alpha)
        console.log(alpha[0])
        console.log(obj[0][1])//undefine
    });*/
});
window.addEventListener('dblclick',(event) =>{
    console.log(event.target);
    let swe = unique(event.target,options);
    innerdata = gamma[index];
    delete innerdata[swe]
    domData[g] = innerdata;
    chrome.storage.sync.set(domData);
    chrome.storage.sync.get(null, function (data) { console.log(data,"yhe data") });
})
        


interface MessageWithResponse {
    name: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function listenToMessages(): void {
    chrome.runtime.onMessage.addListener((message) => {
        console.log(message);
    });
}

function listenAndRespond() {
    chrome.runtime.onMessage.addListener((message: MessageWithResponse, _sender, sendResponse) => {
        console.log('Got message from CS');
<<<<<<< Updated upstream
=======
        
        // var domData = chrome.storage.sync.get(null, data => {return data});
        // console.log(domData);

        document.body.addEventListener('click', function(e){
            console.log(e.target)
            // e.target.style.border = "solid gold";
            let sele = unique(e.target,options);
            // let domId = sele;
            console.log(sele,"this is the selector");//.entry-content > :nth-child(2)
            if(index !== -1){
                innerdata = gamma[index];
            }
            console.log(innerdata)
            innerdata[sele] = sele;
            // for (let valu of gamma) {
            //     console.log(valu); //{key:value}
            //     innerdata = valu
            //     // console.log(innerdata)
            //     innerdata[sele] = sele;
            //     console.log(innerdata);
            //     // console.log(Object.values(valu))//[value]
            //     // let yes = Object.values(valu)
            //     // alpha.push(yes)
                
            // }
            // innerdata[sele] = sele;
            domData[g] = innerdata;
            chrome.storage.sync.set(domData);
            chrome.storage.sync.get(null, function (data) { console.log(data,"yhe data") });
            // let good = JSON.stringify({sele : sele});
            // chrome.storage.sync.get(['one'],function(item){
            //     console.log(item)
            //     console.log(item.one.value)
            //     var f = document.querySelector(item.one)
            //     console.log(f,"this is fffff")
            // });
            // let testPrefs = JSON.stringify({
            //     domId : sele
            // });
            // chrome.storage.sync.get(null, (data) => {
            //     console.log(data,"before data");
            // })
            // var ws = document.getSelection(e.target)
            // console.log(ws);
            // var f = document.getElementById(selector)
            // console.log(f,"the rerurn value")//return null
            // console.log(selector.type)//undefine
            // console.log(e.target.nodeName);// gives p,div
            // console.log(e.target.style.color)//blue
            // chrome.runtime.sendMessage({theId : selector}) // showing the selecotr
            // chrome.runtime.sendMessage({theId : e.target})//showing an object 
            // localStorage.setItem("one","1")
            // var d = localStorage.getItem("Name");
            // console.log(d)//null
            // console.log(e.target.type)//undefine
            // var mel = {type : "alpha",theEventId : selector,theEvent : e.target}
            // var q = localStorage.getItem("Name");
            // console.log(q)//null
            // chrome.runtime.sendMessage({theId : mel})""
            // let testPrefs = JSON.stringify(ws,["id", "className", "tagName"]);
            // JSON.stringify(container, ["id", "className", "tagName"])
            var self = this,
            old_bg = this.style.background;
            e.target.style.color = 'blue';
            this.style.background = this.style.background ='green';
            setTimeout(function(){
                self.style.background = old_bg;
            }, 1000);
        })
        document.addEventListener('mouseover',(e)=>{
            e.target.style.outline = "solid yellow";
            setTimeout(function(){
                e.target.style.outline = "";
            },500);
        })
>>>>>>> Stashed changes
        setTimeout(() => {
            sendResponse(`Hello, ${message.name}`);
        }, 1000);
        return true; // this indicates that we will send response asynchronously
    });
}
// listenToMessages();
listenAndRespond();
