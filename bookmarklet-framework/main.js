(() => {
  async function main() {
    // Inser your script here.
    // Example
    toggleLoading(true);
    setLoadingMessage('Fetching');
    try {
      let exampleFetch = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      exampleFetch = await exampleFetch.json();
      setContent(exampleFetch.body);
      toggleLoading();
    } catch (err) {
      setContent('something went wrong');
      toggleLoading(false);
    }
    finally {
      await wait(5000);
      exit();
    }
  }
  const existedBefore = document.getElementById('lx-bookmark-script');
  if (existedBefore) {
    existedBefore.exit();
  }
  const containerEl = document.createElement('div');
  containerEl.id = 'lx-bookmark-script';
  Object.assign(containerEl.style, { 
    width: '500px',
    minHeight: '250px',
    backgroundColor: 'white',
    position: 'fixed',
    top: '50px',
    left: 'calc(50% - 250px)',
    zIndex: '99999',
    boxShadow: '0px 4px 16px rgba(0,0,0,0.2)',
    borderRadius: '7px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  });
  document.body.appendChild(containerEl);
  const loadingContainerEl = document.createElement('div');
  Object.assign(loadingContainerEl.style, {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  });
  const loadingEl = document.createElement('div');
  Object.assign(loadingEl.style, {
    width: '50px',
    height: '50px',
    border: 'solid 8px #f1f1f1',
    borderTop: 'solid 8px #0056FF',
    borderRadius: '50%',
    animation: 'spin 2s linear infinite'
  });
  const animationStyle = document.createElement('style');
  animationStyle.innerHTML = '@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}';
  const loadingMessageEl = document.createElement('div');
  Object.assign(loadingMessageEl.style, {
    fontSize: '1.5rem',
    marginTop: '20px',
    textAlign: 'center'
  });
  loadingEl.appendChild(animationStyle);
  loadingContainerEl.appendChild(loadingEl);
  loadingContainerEl.appendChild(loadingMessageEl);
  containerEl.appendChild(loadingContainerEl);

  const contentEl = document.createElement('div');
  contentEl.id = 'lx-content';
  Object.assign(contentEl.style, {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    padding: '20px'
  });
  containerEl.appendChild(contentEl);
  containerEl.handleClickOutside = (event) => {
    if (event instanceof KeyboardEvent && event.key != 'Escape') {
      return;
    }
    event.stopPropagation();
    if (!containerEl.contains(event.target)) {
      containerEl.exit();
    }
  }
  document.addEventListener('mouseup', containerEl.handleClickOutside);
  document.addEventListener('keyup', containerEl.handleClickOutside);

  var isLoading = false;
  const toggleLoading = (forced) => {
    if (typeof forced !== 'undefined') {
      isLoading = forced;
    } else {
      isLoading = !isLoading;
    }
    if (isLoading) {
      loadingContainerEl.style.display = 'flex';
      contentEl.style.display = 'none';
    } else {
      loadingContainerEl.style.display = 'none';
      contentEl.style.display = 'flex';
    }
  }
  setLoadingMessage = (message) => {
    loadingMessageEl.textContent = message;
  }
  setContent = (html) => {
    contentEl.innerHTML = html;
  }
  containerEl.exit = () => {
    document.body.removeChild(containerEl);
    document.removeEventListener('mouseup', containerEl.handleClickOutside);
    document.removeEventListener('keyup', containerEl.handleClickOutside);
  }
  const exit = containerEl.exit;
  const wait = async (time) => new Promise((res, rej) => { 
    setTimeout( () => {
      res();
    }, time);
  });

  const waitForSelector = async (selector, parent) => {
    if (!parent) {
      parent = document.body;
    }
    let el;
    let ticks = 0;
    do {
      console.log('searching..')
      await wait(200);
      ticks++;
      if (ticks/5 > 10)
        throw new Error('element not found');
      el = parent.getElementsBySelector(selector)
    } while (el.size() == 0)
    return el;
  }
  main();
})();