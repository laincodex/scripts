# LX Bookmarklet framework
This framework will help to visualize your bookmark scripts, providing an easy way to see what's going on and debug your script as well providing some useful functions like waiting for an element to render after clicking on them.

# Functions
| Method | Functionality | Parameter | Example |
| :-- | :-- | :-- | :-- |
| `toggleLoading(): void` | Control the loading screen visibility | `forced`\|`true`\|`false`\|`none` will force the state, otherwhise will toggle the visibility. | toggleloading(true) -> hide content to show a loading logo.|
| `setLoadingMessage(): void` | Set text on loading screen | `string` | setLoadingMessage('Fetching object');
| `setContent(): void` | Set HTML on content screen | `string` | setContent('Fetch successful'); or setContent('<span> Success!</span>') |
| `async wait(): void` | Wait for milliseconds, useful for waiting for render after triggering an event |` number` in milliseconds | await wait(3000); |
| `waitForSelector(): HTMLElement` | Wait for a element to be present and return an array of found elements | `string` as queryselector | var el = await waitingForSelector('#myElementId') |
| `exit()` | Quit modal and remove every node | none | exit() |