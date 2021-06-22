import { isConditionalExpression } from 'typescript';
import { sendChromeMessage } from '../popup/utils/chrome.message';


if (window.top === window) {
    var steps;
    var stepNumber = -1;
    function add_style_to_tooltip() {
        var tooltip_style = document.createElement('style');
        tooltip_style.innerHTML = `.theTooltip{
            z-index: 6;
            position: fixed;
            top: 100px;
            left: 300px;
            will-change: transform;
            display: flex;
            align-items: center;
            font-family: Roboto;
            background: #a5bcff;
            min-height: 32px;
            min-width: calc(260px - 100px);
            max-width: calc(260px + 50px);
            padding: 5px 15px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            word-wrap: break-word;
            cursor: default;
            -webkit-box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
            -moz-box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
            box-shadow: 0 2px 10px 0 rgb(0 0 0 / 10%);
            transition: box-shadow 0.6s ease;
            hyphens: none;
        }
        .theTooltip::after {
            content: "";
            display: block;
            position: absolute;
            width: 0;
            height: 0;
            border-color: transparent;
            border-style: solid;
            pointer-events: none;
            border-width: 5px;
            right: 100%;
            border-right-color: #a5bcff;
        }`;
        document.head.appendChild(tooltip_style);
    }

    async function fetch_workflow_step() {
        var message = { type: 'request' }
        var whole_step = await sendChromeMessage(message)
        steps = whole_step.steps
        var workflow = document.createElement('button');
        workflow.innerHTML = "start the workflow";
        workflow.style.cssText = 'position:fixed;z-index:500';
        document.body.prepend(workflow)
        workflow.addEventListener('click', theworkflow)
    }

    function add_tooltip() {
        var tooltip = document.createElement('div')
        tooltip.setAttribute('id', 'theTooltip')
        tooltip.setAttribute('class', 'theTooltip')
        document.body.append(tooltip)
        add_style_to_tooltip();
        var d = document.getElementById('theTooltip')
    }

    function sendingMsgToFrame(message) {
        window.postMessage(message, '*')
        var all_frames = document.getElementsByTagName('iframe');
        for (const i of all_frames) {
            i.contentWindow.postMessage(message, '*');
        }
    }

    function theworkflow() {
        stepNumber = 0;
        var step = steps[stepNumber]
        var current_step = { type: 'start_step', step: step, number: stepNumber }
        sendingMsgToFrame(current_step)
    }

    window.addEventListener('load', function () {
        fetch_workflow_step();
        add_tooltip();
        var mutation_observer = new MutationObserver(function (records) {
            if (stepNumber > -1 && stepNumber < steps.length) {
                var isValid = true;
                for (const mutation of records) {
                    if (mutation.target.id === 'theTooltip') {
                        isValid = false;
                        break;
                    }
                    else {
                        var message = { type: 'start_step', step: steps[stepNumber] }
                        sendingMsgToFrame(message);
                    }
                }
            }
        })
        mutation_observer.observe(document.body, {
            childList: true,
            attributes: true,
            subtree: true,
        })
    })

    window.addEventListener('message', function (event) {
        if (event.data.type === 'start_step' && event.data.step.iframes.length === 0) {
            let the_selector = document.querySelector(event.data.step.selector)
            if (the_selector) {
                var message = { type: 'get_selector', step: event.data.step }
                sendingMsgToFrame(message)
                let selector_position = the_selector.getBoundingClientRect();
                var message = { type: 'change_tooltip_position', step: event.data.step, selector_position: selector_position }
                sendingMsgToFrame(message)
            }
        }

        if (event.data.type === 'get_selector') {
            getting_selector_function(event.data.step)
        }

        if (event.data.type === 'change_tooltip_position') {
            changing_tooltip_position(event.data.step, event.data.selector_position)
        }

        if (event.data.type === 'increase_step') {
            goToNextStep();
        }
        if (event.data.type === 'mutation_iframe') {
            var step = steps[stepNumber]
            message = { type: 'start_step', step: step }
            sendingMsgToFrame(message)
        }
        if (event.data.type === 'iframe_selector_position') {
            var iframe = document.querySelector(event.data.step.iframes[0])
            var iframe_position = iframe.getBoundingClientRect();
            if (iframe_position && iframe_position.height > 0) {
                event.data.selector_position = {
                    width: event.data.selector_position.width,
                    height: event.data.selector_position.height,
                    left: event.data.selector_position.left + iframe_position.left,
                    top: event.data.selector_position.top + iframe_position.top,
                }
            }
            changing_tooltip_position(event.data.step, event.data.selector_position)
        }
    })

    function getting_selector_function(step) {
        var the_selector = document.querySelector(step.selector)
        the_selector.addEventListener(step.type, clicking_on_selector)
    }
    function clicking_on_selector(e) {
        e.target.removeEventListener(e.type, clicking_on_selector)
        var message = { type: 'increase_step' }
        sendingMsgToFrame(message)
    }
    function changing_tooltip_position(step, selector_position) {
        var tooltip = document.getElementById('theTooltip')
        tooltip.innerHTML = step.content
        var tooltip_position = tooltip.getBoundingClientRect();
        tooltip.style.top = selector_position.top + selector_position.height / 2 - tooltip_position.height / 2 + 'px';
        tooltip.style.left = selector_position.left + selector_position.width + 10 + 'px'
    }
    function goToNextStep() {
        stepNumber++;
        if (stepNumber >= steps.length) {
            var tooltip = document.getElementById('theTooltip');
            tooltip.style.visibility = 'hidden';
            console.log("Done with workflow")
        }
        else {
            var updated_step = { type: 'start_step', step: steps[stepNumber] }
            sendingMsgToFrame(updated_step)
        }
    }

}



else {
    window.onload = function () {
        var mutation_observer = new MutationObserver(function (records) {
            if (stepNumber > -1 && stepNumber < steps.length) {
                var message = { type: 'mutation_iframe' }
                window.top.postMessage(message, '*');
            }
        })
        mutation_observer.observe(document.body, {
            childList: true,
            attributes: true,
            subtree: true,
        })
    }
    function getting_selector_function(step) {
        var the_selector = document.querySelector(step.selector)
        the_selector.addEventListener(step.type, clicking_on_selector)
    }
    function clicking_on_selector(e) {
        e.target.removeEventListener(e.type, clicking_on_selector)
        var message = { type: 'increase_step' }
        window.top.postMessage(message, '*')
    }
    window.addEventListener('message', function (event) {
        if (event.data.type === 'start_step' && event.data.step.iframes[0] === '#brandBand_2 > div > div > div.windowViewMode-normal.oneContent.active.lafPageHost > iframe') {
            getting_selector_function(event.data.step)
            let the_selector = document.querySelector(event.data.step.selector)
            let selector_position = the_selector.getBoundingClientRect();
            var message = { type: 'iframe_selector_position', step: event.data.step, selector_position: selector_position }
            window.top.postMessage(message, '*')
        }
    })
}