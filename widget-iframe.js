// Simple chat logic that runs inside the iframe (widget.html)
(function(){
  const form = document.getElementById('w-form');
  const input = document.getElementById('w-input');
  const messagesEl = document.getElementById('w-messages');
  const closeBtn = document.getElementById('w-close');

  const STORAGE_KEY = 'test_chat_widget_messages_v1';

  function loadMessages(){
    try{ return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') }catch{return []}
  }
  function saveMessages(arr){ localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)) }

  function render(){
    const msgs = loadMessages();
    messagesEl.innerHTML = '';
    msgs.forEach(m => {
      const el = document.createElement('div');
      el.className = 'w-message ' + (m.from === 'me' ? 'me' : '');
      const bubble = document.createElement('div');
      bubble.className = 'w-bubble';
      bubble.textContent = m.text;
      el.appendChild(bubble);
      messagesEl.appendChild(el);
    });
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function pushMessage(text, from='bot'){
    const arr = loadMessages();
    arr.push({text,from,t:Date.now()});
    saveMessages(arr);
    render();
  }

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const v = input.value.trim();
    if(!v) return;
    if(v === '/clear'){
      localStorage.removeItem(STORAGE_KEY);
      render();
      input.value = '';
      return;
    }
    // store user message
    const arr = loadMessages();
    arr.push({text:v,from:'me',t:Date.now()});
    saveMessages(arr);
    render();
    input.value = '';

    // Fake bot reply after slight delay
    setTimeout(()=>{
      const reply = generateReply(v);
      pushMessage(reply, 'bot');
    }, 400);
  });

  closeBtn.addEventListener('click', ()=>{
    // tell parent to hide the iframe
    try{ parent.postMessage({type:'widget-close'}, '*') }catch{ void 0 }
  });

  function generateReply(userText){
    // very simple replies for testing
    const t = userText.toLowerCase();
    if(t.includes('hello')||t.includes('hi')) return 'Hello! This is a test widget.';
    if(t.includes('time')) return 'Current time: ' + new Date().toLocaleTimeString();
    return "You said: '" + userText + "' — this is an echo for testing.";
  }

  // initial seed message
  if(loadMessages().length === 0){ pushMessage('Hi! Ask me something. (Type /clear to reset)', 'bot') }
  render();

  // notify parent that iframe is ready
  try{ parent.postMessage({type:'widget-ready'}, '*') }catch{ void 0 }
})();

