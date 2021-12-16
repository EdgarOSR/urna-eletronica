// controle de interface
var seuVotoPara = document.querySelector('.tela-1-1-1 span');
var divCargo = document.querySelector('.tela-1-1-2');
var divNumero = document.querySelector('.tela-1-1-3');
var divCandidato = document.querySelector('.tela-1-1-4');
var divTeclado = document.querySelector('.teclado-linha');
var img1 = document.getElementById('foto-candidato');
var img2 = document.getElementById('foto-vice');
var divTela1 = document.querySelector('.tela-1');
var divTela2 = document.querySelector('.tela-2');
var divFim = document.querySelector('.tela-fim');
var tabelaVotos = document.querySelector('.tabela-votos');
var divControles = document.querySelector('.botoes-controle');
var divUrna = document.querySelector('.urna');

divTela1.style.display = 'none';
divTela2.style.display = 'none';
divFim.style.display = 'none';
tabelaVotos.style.display = 'none';
divUrna.style.display = 'none';

// variaveis de ambiente
var etapaAtual = 0;
var numeroDigitado = '';
var arrVotos = [];
var candidatoNome = '';
var candidatoPartido = '';

function comecarEtapa()
{
    numeroDigitado = '';
    candidatoNome = '';
    candidatoPartido = '';
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numeroHtml = '<span>Número: </span>';

    for (let i = 0; i < etapa.digitos; i++)
    {
        if(i === 0)
        {
            numeroHtml += '<label class="numero-digitado pisca"></label>';
        } else
        {
            numeroHtml += '<label class="numero-digitado"></label>';
        }
        
    }
    divUrna.style.display = 'flex';
    divTela1.style.display = 'flex';
    divTela2.style.display = 'none';
    divFim.style.display = 'none';
    seuVotoPara.style.display = 'none';
    divCargo.innerHTML = `<label id="cargo"><b>${etapa.titulo}</b></label>`;
    divNumero.innerHTML = numeroHtml;
    divCandidato.innerHTML = null;
    img1.style.display = 'none';
    img2.style.display = 'none';
    divTela2.style.display = 'none';
    divFim.style.display = 'none';
    tabelaVotos.style.display = 'none';
    divControles.style.display = 'none';
}

function atualizaInterface()
{
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>
        {
            if(item.numero === numeroDigitado)
            {
                return true;
            } else
            {
                return false;
            }
        }
    );

    seuVotoPara.style.display = 'block';
    divTela2.style.display = 'block';
    let htmlCandidato = '';

    if(candidato.length > 0)
    {
        candidato = candidato[0];       
        candidatoNome = candidato.nome;
        candidatoPartido = candidato.partido;
        htmlCandidato += `<label>Candidato: ${candidato.nome}</label></br>`;
        htmlCandidato += `<label>Partido: ${candidato.partido}</label></br>`;
        img1.innerHTML = `<img alt="foto-vice" src="../projeto-urna-eletronica/images/${candidato.fotos[0].url}" />`;
        
        if(candidato.vice !== null)
        {
            htmlCandidato += `<label>Vice: ${candidato.vice}</label></br>`;
            img2.innerHTML = `<img alt="foto-vice" src="../projeto-urna-eletronica/images/${candidato.fotos[1].url}" />`;
            img2.style.display = 'block';
        }

        divCandidato.innerHTML = htmlCandidato;
        divTela2.style.display = 'block';
        img1.style.display = 'block';
    } else
    {
        htmlCandidato += `<label>NÚMERO ERRADO</label></br></br>`;
        htmlCandidato += `<label class="voto-nulo">VOTO NULO</label></br>`;
        divCandidato.innerHTML = htmlCandidato;
        candidatoNome = numeroDigitado;
        numeroDigitado = 'nulo';
        candidatoPartido = 'VOTO NULO';
    }
}

function clicou(valor)
{
    audioClique();
    let numeroPisca = document.querySelector('.numero-digitado.pisca');
    if(numeroPisca !== null)
    {
        numeroPisca.innerHTML = valor;
        numeroDigitado = `${numeroDigitado}${valor}`;

        numeroPisca.classList.remove('pisca');
        if(numeroPisca.nextSibling !== null)
        {
            numeroPisca.nextSibling.classList.add('pisca');
        } else
        {
            atualizaInterface();
        }
    }
}

function branco()
{
    audioClique();
    if(numeroDigitado === '')
    {
        divCandidato.innerHTML = `<label class="voto-nulo">VOTO EM BRANCO</label></br>`;
        divNumero.innerHTML = null;
        numeroDigitado = 'branco';
        candidatoNome = null;
        candidatoPartido = null;
        seuVotoPara.style.display = 'block';
        divTela2.style.display = 'block';
    }
}

function corrige()
{
    audioClique();
    comecarEtapa();
}

function confirma()
{
    // toca o aúdio de clique do botão
    audioClique();

    // validação para finalizar o voto da etapa atual
    let etapa = etapas[etapaAtual];
    if(numeroDigitado === 'nulo' || numeroDigitado === 'branco' || numeroDigitado.length === etapa.digitos)
    {
        // toca o aúdio do fim
        audioFim();

        // salva o voto no array
        salvarVoto();
        
        // verifica se existe próxima etapa ou fim da votação
        if(etapaAtual < (etapas.length - 1))
        {
            etapaAtual += 1;
            comecarEtapa();
        } else
        {
            etapaAtual = 0;
            divTela1.style.display = 'none';
            divTela2.style.display = 'none';
            divFim.style.display = 'block';
            divControles.style.display = 'flex';
        }
    }
}

function audioClique() {
	let audio = new Audio("../projeto-urna-eletronica/misc/clique.mp3");
	audio.play();
}

function audioFim() {
	let audio = new Audio("../projeto-urna-eletronica/misc/fim.mp3");
	audio.play();
}

function salvarVoto()
{
    arrVotos.push({
        numero: numeroDigitado,
        candidato: candidatoNome,
        partido: candidatoPartido,
        etapa: etapaAtual
    });
}