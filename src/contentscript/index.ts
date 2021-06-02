console.log('this is content script');

interface MessageWithResponse {
    name: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function listenToMessages(): void {
    chrome.runtime.onMessage.addListener((message) => {
        console.log(message + "good mrng");
    });
}

function listenAndRespond() {
    chrome.runtime.onMessage.addListener((message: MessageWithResponse, _sender, sendResponse) => {
        console.log('Got message from CS');
        let a = document.createElement('div');
        let h = document.createTextNode("hello");
        let as = document.createTextNode("click child");
        let mou = document.createElement('p');
        
        document.body.addEventListener('click', function(e){
            var self = this,
            old_bg = this.style.background;
            console.log(e.target)
            e.target.style.color = 'blue';
            this.style.background = this.style.background ='green';
            setTimeout(function(){
                self.style.background = old_bg;
            }, 1000);
        })
        document.addEventListener('mouseover',(e)=>{
            e.target.style.border = "solid yellow";
            setTimeout(function(){
                e.target.style.border = "";
            },500);
            
        })
        a.appendChild(h);
        a.setAttribute('id','navya');
        a.addEventListener("mouseover",function(e){
            e.target.style.color ='orange';
            setTimeout(function(){
                e.target.style.color = "";
            },1000)
        },false)
        a.addEventListener('click',function(e){
            mou.appendChild(as);
            document.body.appendChild(mou);
        })
        document.body.appendChild(a);
        console.log("element div is added");
        setTimeout(() => {
            sendResponse(`Hello, ${message.name}`);
        }, 1000);
        return true; // this indicates that we will send response asynchronously
    });
}

// listenToMessages();
listenAndRespond();
