(function(){
  var WA='https://wa.me/5511947904394?text=';
  var chosen=null;
  var chips=document.querySelectorAll('.chip'),groups=document.querySelectorAll('.group'),empty=document.querySelector('.empty');
  chips.forEach(function(c){c.addEventListener('click',function(){
    var f=c.getAttribute('data-filter'),n=0;
    chips.forEach(function(x){var on=x===c;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on?'true':'false');});
    groups.forEach(function(g){var show=f==='all'||g.getAttribute('data-seg')===f;g.hidden=!show;if(show)n+=g.querySelectorAll('.card').length;});
    empty.hidden=n>0;
  });});
  var period='Mensal';
  function label(p){return p+' '+period;}
  document.querySelectorAll('.pbtn').forEach(function(b){b.addEventListener('click',function(){
    period=b.getAttribute('data-period');
    document.querySelectorAll('.pbtn').forEach(function(x){var on=x===b;x.classList.toggle('on',on);x.setAttribute('aria-pressed',on?'true':'false');});
    document.querySelectorAll('.pm').forEach(function(e){e.hidden=period!=='Mensal';});
    document.querySelectorAll('.pa').forEach(function(e){e.hidden=period!=='Anual';});
    refresh();
  });});
  function msg(model,plan){return WA+encodeURIComponent('Olá! Quero o modelo '+model+' no plano '+plan+'.');}
  function refresh(){
    document.getElementById('chosen-name').textContent=chosen||'nenhum ainda';
    document.querySelectorAll('.plan-cta').forEach(function(a){
      var p=label(a.getAttribute('data-plan'));
      if(a.hasAttribute('data-open')) a.href=WA+encodeURIComponent('Olá! Quero um orçamento do plano Premium para o meu negócio.');
      else if(chosen) a.href=msg(chosen,p);
    });
  }
  document.querySelectorAll('[data-model]').forEach(function(b){b.addEventListener('click',function(){
    chosen=b.getAttribute('data-model');
    document.querySelectorAll('.card.picked').forEach(function(c){c.classList.remove('picked');});
    b.closest('.card').classList.add('picked');
    refresh();
    document.getElementById('planos').scrollIntoView({behavior:'smooth'});
  });});
  // Sem modelo escolhido: o botão do plano leva à grade em vez de abrir o WhatsApp sem modelo.
  document.querySelectorAll('.plan-cta').forEach(function(a){a.addEventListener('click',function(ev){
    if(!chosen&&!a.hasAttribute('data-open')){ev.preventDefault();document.getElementById('modelos').scrollIntoView({behavior:'smooth'});}
  });});
  refresh();
})();
