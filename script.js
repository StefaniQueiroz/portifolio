// 1. PLAYER DE MÚSICA AMBIENTE COM DIAGNÓSTICO
const btnMusica = document.getElementById('btn-musica');
const audioFundo = document.getElementById('musica-fundo');

if (btnMusica && audioFundo) {
    audioFundo.volume = 0.8;

    btnMusica.addEventListener('click', () => {
        if (audioFundo.paused) {
            audioFundo.play()
                .then(() => {
                    btnMusica.classList.add('tocando');
                    btnMusica.innerHTML = '<i class="fa-solid fa-pause"></i>';
                })
                .catch((erro) => {
                    alert('Motivo de não tocar: ' + erro.name + ' - ' + erro.message);
                });
        } else {
            audioFundo.pause();
            btnMusica.classList.remove('tocando');
            btnMusica.innerHTML = '<i class="fa-solid fa-music"></i>';
        }
    });
}

// 2. EFEITO MÁQUINA DE ESCREVER NO SUBTÍTULO (Com espaços preservados)
const subtitulo = document.querySelector('.inicio-texto h3');
if (subtitulo) {
    const textoOriginal = subtitulo.textContent.trim();
    subtitulo.textContent = '';

    let index = 0;
    function escreverTexto() {
        if (index < textoOriginal.length) {
            subtitulo.textContent += textoOriginal.charAt(index);
            index++;
            setTimeout(escreverTexto, 45);
        }
    }
    escreverTexto();
}

/// 3. BOTÃO "BAIXAR CURRÍCULO" (Abre o PDF em uma nova aba)
const btnCurriculo = document.querySelector('.btn-curriculo');
if (btnCurriculo) {
    btnCurriculo.addEventListener('click', () => {
        window.open('curriculo.pdf', '_blank');
    });
}

// 4. ANIMAÇÃO DE SURGIMENTO AO ROLAR A PÁGINA (Scroll Reveal)
const secoes = document.querySelectorAll('.sobre, .habilidades, .projetos, .certificados, .contato');
secoes.forEach(secao => secao.classList.add('animar'));

const observador = new IntersectionObserver((entradas) => {
    entradas.forEach(entrada => {
        if (entrada.isIntersecting) {
            entrada.target.classList.add('aparecer');
        }
    });
}, { threshold: 0.15 });

secoes.forEach(secao => observador.observe(secao));

// 5. ROLAGEM SUAVE PERSONALIZADA (Menu e botão "Ver Projeto")
function rolarSuavePara(elementoDestino, duracao = 1100) {
    const posicaoAlvo = elementoDestino.getBoundingClientRect().top + window.scrollY;
    const posicaoInicial = window.scrollY;
    const distancia = posicaoAlvo - posicaoInicial;
    let inicioTempo = null;

    function animacaoRolagem(tempoAtual) {
        if (inicioTempo === null) inicioTempo = tempoAtual;
        const tempoDecorrido = tempoAtual - inicioTempo;
        const progresso = Math.min(tempoDecorrido / duracao, 1);
        
        const ease = progresso < 0.5 
            ? 4 * progresso * progresso * progresso 
            : 1 - Math.pow(-2 * progresso + 2, 3) / 2;

        window.scrollTo(0, posicaoInicial + distancia * ease);

        if (tempoDecorrido < duracao) {
            requestAnimationFrame(animacaoRolagem);
        }
    }

    requestAnimationFrame(animacaoRolagem);
}

// Links do menu
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const idDestino = this.getAttribute('href');
        const secaoDestino = document.querySelector(idDestino);
        if (secaoDestino) {
            rolarSuavePara(secaoDestino, 1100);
        }
    });
});

// Botão "Ver Projeto"
const btnVerProjetos = document.querySelector('.btn-ver-projetos');
if (btnVerProjetos) {
    btnVerProjetos.addEventListener('click', () => {
        const secaoProjetos = document.getElementById('Projetos');
        if (secaoProjetos) {
            rolarSuavePara(secaoProjetos, 1100);
        }
    });
}
// 7. COPIAR E-MAIL AO CLICAR NA SEÇÃO CONTATO
const itemEmail = document.querySelector('.contato-container p:first-child');
if (itemEmail) {
    itemEmail.style.cursor = 'pointer';
    itemEmail.title = 'Clique para copiar o e-mail';

    itemEmail.addEventListener('click', () => {
        navigator.clipboard.writeText('stefaniluiza31@gmail.com');
        const textoOriginal = itemEmail.innerHTML;
        itemEmail.innerHTML = '<i class="fa-solid fa-check"></i> E-mail copiado!';
        itemEmail.style.color = '#F335CB';

        setTimeout(() => {
            itemEmail.innerHTML = textoOriginal;
            itemEmail.style.color = '';
        }, 2000);
    });
}