// Embeddable loader script. Paste into any site to inject the widget.
(function(){
  if(window.__test_widget_loaded) return; // prevent double-load
  window.__test_widget_loaded = true;

  const ID = 'test-widget-container-v1';

  function createStyles(){
    const css = `
      #${ID}{position:fixed;right:20px;bottom:20px;z-index:999999;font-family:Inter,system-ui,Arial}
      #${ID} .tw-launch{width:56px;height:56px;border-radius:50%;background:#0b74ff;color:white;border:0;cursor:pointer;box-shadow:0 6px 18px rgba(11,116,255,.25);}
      #${ID} iframe{width:360px;height:520px;border:0;border-radius:12px;box-shadow:0 12px 30px rgba(0,0,0,.2);display:block}
      @media(max-width:420px){ #${ID} iframe{width:94vw;height:60vh} }
    `;
    const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
  }

  function inject(){
    const container = document.createElement('div');
    container.id = ID;
    // launcher
    const launch = document.createElement('button');
    launch.className = 'tw-launch';
    launch.title = 'Open chat';
    launch.innerHTML = '💬';
    container.appendChild(launch);

    // iframe wrapper (hidden initially)
    const frameWrapper = document.createElement('div');
    frameWrapper.style.display = 'none';
    frameWrapper.style.marginTop = '10px';
    const iframe = document.createElement('iframe');
    // use relative path so widget works when site is hosted under a subpath
    iframe.src = 'widget.html';
    iframe.setAttribute('aria-label','Test chat widget');
    iframe.onload = function(){ /* optional */ };
    frameWrapper.appendChild(iframe);
    container.appendChild(frameWrapper);

    // toggle
    launch.addEventListener('click', ()=>{
      frameWrapper.style.display = frameWrapper.style.display === 'none' ? 'block' : 'none';
    });

    // listen to messages from widget iframe (close command)
    window.addEventListener('message', (ev)=>{
      try{
        if(!ev.data || typeof ev.data !== 'object') return;
        if(ev.data.type === 'widget-close'){
          frameWrapper.style.display = 'none';
        }
      }catch(e){}
    });

    document.body.appendChild(container);
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>{ createStyles(); inject() });
  }else{ createStyles(); inject(); }
})();

