(function(){
var grid=document.getElementById('product-grid');
if(grid){
  var cats=['All'].concat(Array.from(new Set(PRODUCTS.map(function(p){return p.c}))));
  var active='All',q='',f=document.getElementById('filters'),s=document.getElementById('search');
  function render(){
    grid.innerHTML='';
    PRODUCTS.filter(function(p){return(active==='All'||p.c===active)&&(p.n+' '+p.d).toLowerCase().indexOf(q)>-1}).forEach(function(p){
      var a=document.createElement('article');a.className='card';
      a.innerHTML='<div class="thumb" aria-hidden="true">'+p.i+'</div><h3></h3><p></p><span class="tag"></span> <a href="contact.html?product='+encodeURIComponent(p.n)+'">Request a quote</a>';
      a.querySelector('h3').textContent=p.n;a.querySelector('p').textContent=p.d;a.querySelector('.tag').textContent=p.c;
      grid.appendChild(a);
    });
    if(!grid.children.length)grid.innerHTML='<p>No products match. <a href="contact.html">Ask us</a>, we can usually source it.</p>';
  }
  cats.forEach(function(c){var b=document.createElement('button');b.type='button';b.textContent=c;b.setAttribute('aria-pressed',c===active);
    b.onclick=function(){active=c;Array.prototype.forEach.call(f.children,function(x){x.setAttribute('aria-pressed',x===b)});render()};f.appendChild(b)});
  s.oninput=function(){q=s.value.toLowerCase();render()};
  render();
}
var p=new URLSearchParams(location.search).get('product'),m=document.getElementById('message');
if(p&&m)m.value='Quote request: '+p+'\nQuantity:\n';
// Forms: no backend yet. Set data-endpoint on a form (e.g. Formspree URL) to post for real.
document.querySelectorAll('form[data-form]').forEach(function(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();var ep=form.getAttribute('data-endpoint'),ok=form.querySelector('.ok');
    function done(){ok.style.display='block';form.reset()}
    if(ep){fetch(ep,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}}).then(function(r){r.ok?done():alert('Sorry, something went wrong. Please call us.')})}
    else done();
  });
});
})();
