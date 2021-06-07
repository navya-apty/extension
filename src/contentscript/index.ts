import unique from 'unique-selector';

console.log('this is content script');

let g = window.location.href;
var domData = {}
var innerdata = {};
let index;
var options = {
    // Array of selector types based on which the unique selector will generate
    selectorTypes : [ 'ID', 'Class', 'Tag', 'NthChild' ]
}

function listData(){
    return new Promise(resolve =>{
            chrome.storage.sync.get(null, function(items) {
            var allKeys = Object.keys(items);
            index = allKeys.indexOf(g);
            var allValues = Object.values(items);
            var gamma = Object.values(allValues);
            // console.log(gamma)//[{},{}]
            resolve(gamma)
        });
    })
}


async function listenTomark(): void {
    var gamma2 = await listData();
    
    async function getNewElements(mark){
        let alpha1 = [];
        var gamma1 = await listData();
        for (let valu of gamma1) {
            let yes = Object.values(valu)
            alpha1.push(yes)
        }
        if(index !== -1){
            for (let i=0;i< alpha1[index].length;i++) {
                let beta
                if(mark === 1){
                    beta = document.querySelector(alpha1[index][i]).style.border = 'solid gold';
                }
                else{
                    beta = document.querySelector(alpha1[index][i]).style.border = '';
                }
            }
        }

    }
    chrome.runtime.onMessage.addListener((message) => {
        if(message.type === "marked"){
            getNewElements(1);
        } 
        window.addEventListener('dblclick',(event) =>{
            let swe = unique(event.target,options);
            innerdata = gamma2[index];
            delete innerdata[swe]
            domData[g] = innerdata;
            chrome.storage.sync.set(domData);
            getNewElements(1);//check here
        })
    });
    chrome.runtime.onMessage.addListener((message) => {
        if(message.type === "unmarked"){
            getNewElements(0);
        }
    });
}

async function listenTosave(): void {
    var gamma2 = await listData();
    chrome.runtime.onMessage.addListener((message) => {
        if(message.type === "save"){
            document.body.addEventListener('click', function(e){
                let sele = unique(e.target,options);
                if(index !== -1){
                    innerdata = gamma2[index];
                }
                innerdata[sele] = sele;
                domData[g] = innerdata;
                chrome.storage.sync.set(domData);
                e.target.style.color = 'blue';
            });
            

            document.addEventListener('mouseover',(e)=>{
                e.target.style.outline = "solid green";
                setTimeout(function(){
                e.target.style.outline = "";
                },500);
            })
        }
        if(message.type === "unsave"){
            document.addEventListener('mouseover',(e)=>{
                e.target.style.outline = "";
            })

        }
    });
}

listenTosave();

listenTomark();