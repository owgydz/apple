import { fetchGoogleHomepage } from './google';  
import Renderer from './render';  

async function initBrowser() {
  const renderer = new Renderer();
  const virtualDOM = await fetchGoogleHomepage();
  renderer.render(virtualDOM);
}

initBrowser();
// On caffeine 
