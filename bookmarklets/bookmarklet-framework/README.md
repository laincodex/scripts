# LX Bookmarklet framework
This framework will help to visualize your bookmark scripts, providing an easy way to see what's going on and debug your script as well providing some useful functions like waiting for an element to render after clicking on them.

# Usage
Write any script you desire in the main() function, you can take any example from the script/ folder.

Once you're done, copy and pass the code through a JS compressor, like https://jscompress.com/, (don't forget to select ECMAScript 2020). 
This will create a minified single line script, copy that and add to a bookmar with `javascript:` on the front, and you're done. Everytime you click the bookmark it will execute that code. (if you click several times, each time you click it will stop and remove the previous execution to avoid duplications)
## Example

```
javascript:(()=>{const a=document.getElementById("lx-bookmark-script");a&&a.exit();const b=document.createElement("div");b.id="lx-bookmark-script",Object.assign(b.style,{width:"500px",minHeight:"250px",backgroundColor:"white",position:"fixed",top:"50px",left:"calc(50% - 250px)",zIndex:"99999",boxShadow:"0px 4px 16px rgba(0,0,0,0.2)",borderRadius:"7px",display:"flex",justifyContent:"center",alignItems:"center"}),document.body.appendChild(b);const c=document.createElement("div");Object.assign(c.style,{display:"flex",flexDirection:"column",alignItems:"center"});const d=document.createElement("div");Object.assign(d.style,{width:"50px",height:"50px",border:"solid 8px #f1f1f1",borderTop:"solid 8px #0056FF",borderRadius:"50%",animation:"spin 2s linear infinite"});const e=document.createElement("style");e.innerHTML="@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}";const f=document.createElement("div");Object.assign(f.style,{fontSize:"1.5rem",marginTop:"20px",textAlign:"center"}),d.appendChild(e),c.appendChild(d),c.appendChild(f),b.appendChild(c);const g=document.createElement("div");g.id="lx-content",Object.assign(g.style,{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"1.5rem",padding:"20px"}),b.appendChild(g),b.handleClickOutside=a=>{a instanceof KeyboardEvent&&"Escape"!=a.key||(a.stopPropagation(),!b.contains(a.target)&&b.exit())},document.addEventListener("mouseup",b.handleClickOutside),document.addEventListener("keyup",b.handleClickOutside);var h=!1;const i=a=>{h="undefined"==typeof a?!h:a,h?(c.style.display="flex",g.style.display="none"):(c.style.display="none",g.style.display="flex")},j=a=>{f.textContent=a},k=a=>{g.innerHTML=a};b.exit=()=>{document.body.contains(b)&&(document.body.removeChild(b),document.removeEventListener("mouseup",b.handleClickOutside),document.removeEventListener("keyup",b.handleClickOutside))};const l=b.exit,m=async a=>new Promise(b=>{setTimeout(()=>{b()},a)});(async()=>{i(!0),j("Fetching");try{let a=await fetch("https://jsonplaceholder.typicode.com/posts/1");a=await a.json(),k(a.body),i()}catch(a){k("something went wrong"),i(!1)}finally{await m(5e3),l()}})()})();
```

# Functions
| Method | Functionality | Parameter | Example |
| :-- | :-- | :-- | :-- |
| `toggleLoading(): void` | Control the loading screen visibility | `forced`\|`true`\|`false`\|`none` will force the state, otherwhise will toggle the visibility. | toggleloading(true) -> hide content to show a loading logo.|
| `setLoadingMessage(): void` | Set text on loading screen | `string` | setLoadingMessage('Fetching object');
| `setContent(): void` | Set HTML on content screen | `string` | setContent('Fetch successful'); or setContent('<span> Success!</span>') |
| `async wait(): void` | Wait for milliseconds, useful for waiting for render after triggering an event |` number` in milliseconds | await wait(3000); |
| `waitForSelector(): HTMLElement` | Wait for a element to be present and return an array of found elements | `string` as queryselector | var el = await waitingForSelector('#myElementId') |
| `exit()` | Quit modal and remove every node | none | exit() |