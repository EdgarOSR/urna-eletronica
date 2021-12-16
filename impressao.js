// variáveis globais
var arrFiltro = [];

// imprime a contagem dos votos para cada candidato
function imprimirContagem(html)
{
    let doc = document.getElementById('votos-corpo');
    doc.innerHTML = null;
    let pHtml = '';
    for(let i = 0; i < etapas.length; i++)
    {
        pHtml += `<tr class="table-primary"><td colspan="4">${etapas[i].titulo}</td></tr>`;
        pHtml += `<tr class="table-dark"><th scope="col">Nº</th>`;
        pHtml += `<th scope="col">Candidato</th><th scope="col">Partido</th>`;
        pHtml += `<th scope="col">Votos</th></tr>`;

        let arrCandidatos = etapas[i].candidatos;
        arrCandidatos.sort();
        for (let j= 0; j < arrCandidatos.length; j++ )
        {
            filtroArray(arrCandidatos[j].numero,i);
            pHtml += `<tr><td>${arrCandidatos[j].numero}</td>`;
            pHtml += `<td>${arrCandidatos[j].nome}</td>`;
            pHtml += `<td>${arrCandidatos[j].partido}</td>`;
            pHtml += `<td>${arrFiltro.length}</td></tr>`;
        }
        filtroArray('branco',i);
        pHtml += `<tr><td colspan="3">Branco</td>`;
        pHtml += `<td>${arrFiltro.length}</td></tr>`;
        filtroArray('nulo',i);
        pHtml += `<tr><td colspan="3">Nulo</td>`;
        pHtml += `<td>${arrFiltro.length}</td></tr>`;
    }

    doc.innerHTML = pHtml;
    divUrna.style.display = 'none';
    tabelaVotos.style.display = 'block';
}

// filtra o array de votos de acordo com o candidato da etapa em questão
function filtroArray(numero,etapa)
{
    arrFiltro = [];
    for (let i = 0; i < arrVotos.length; i++)
    {
        if(numero === arrVotos[i].numero && etapa === arrVotos[i].etapa)
        {
            arrFiltro.push(arrVotos[i]);
        }
    }
}