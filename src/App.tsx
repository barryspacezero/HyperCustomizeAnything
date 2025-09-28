
// import { useEffect, useState, type SetStateAction } from 'react';
// import './App.css'

// function App() {
//   const [color, setColor] = useState('white')
//   const [selector, setSelector] = useState('body')
//   const [isSelecting, setIsSelecting] = useState(false)

//   useEffect(() => {
//     const messageListener = (message: { type: string; selector: SetStateAction<string>; }) => {
//       if (message.type === 'ELEMENT_SELECTED') {
//         console.log('Selected element:', message.selector);
//         setSelector(message.selector); // Store the received selector
//         setIsSelecting(false); // Exit selecting mode
//       }
//     };

//     chrome.runtime.onMessage.addListener(messageListener);

//     // Cleanup function to remove the listener when the component unmounts
//     return () => {
//       chrome.runtime.onMessage.removeListener(messageListener);
//     };
//   }, []);
//   const onclick = async () => {
//     const [tab] = await chrome.tabs.query({ active: true})
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id!, allFrames: true },
//       args:[color],
//       function: (color: string) => {
//         document.body.style.backgroundColor = color
//       },
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     })
//   }

//   // This function will be called when your "Select Element" button is clicked
// async function startElementSelection() {
//   // Find the current active tab
//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//   // Send a message to the content script in that tab
//   chrome.tabs.sendMessage(tab.id, { action: "startSelection" }, (response: { selector: string; }) => {
//     // The content script will send a response back with the selected element's CSS selector
//     if (response && response.selector) {
//       console.log("Element selected:", response.selector);
//       // Now you can do something with the selector, like store it in state
//       // e.g., setSelectedElement(response.selector);
//     }
//   });
// }
//   return (
//     <>
//       <h3>Fine, I'll do it myself</h3>
//       <div className="card">
//         <input type="" />
//         <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
//         <button onClick={() => onclick()}>
//           Set new background color
//         </button>
//       </div>
//     </>
//   )
// }

// export default App;


import { useState } from 'react';
import './App.css'

function App() {
  const [color, setColor] = useState('#ffffff'); 

  const onclick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (tab && tab.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        args: [color], 
        func: (injectedColor) => { 
          document.body.style.backgroundColor = injectedColor;
        },
      });
    }
  };

  return (
    <>
      <h1>Website Color Changer</h1>
      <div className="card">
        <input 
          type="color" 
          value={color} 
          onChange={(e) => setColor(e.target.value)} 
        />
        <button onClick={onclick}>
          Change Color
        </button>
      </div>
    </>
  )
}

export default App