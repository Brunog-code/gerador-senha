const gerarSenha = () => {
    // atribuição das variaveis
    let qtdeSenha = parseInt(document.getElementById('qtdeCarac').value)
    let numeros = document.getElementById('numeros').checked 
    let letras = document.getElementById('letras').checked
    let simbolos = document.getElementById('simbolos').checked

    // formar a string com todos os caracteres
    const todosNumeros = '0123456789';
    const todasLetras = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const todosSimbolos = '!@#$%^&*()_+{}[]|:;<>,.?/~`-=';
    let caracEscolhidos = '' 

    if(numeros) caracEscolhidos += todosNumeros
    if(letras) caracEscolhidos += todasLetras
    if(simbolos) caracEscolhidos += todosSimbolos

    // validando informacoes
    if(qtdeSenha < 3 || qtdeSenha > 15 || isNaN(qtdeSenha)){
        Toastify({
            text: "Favor digitar quantidade válida!",
            duration: 2000, // duração em ms (2 segundos)
            close: false, // botão de fechar
            gravity: "top", // "top" ou "bottom"
            position: "right", // "left", "center" ou "right"
            backgroundColor: "#FF0000", // cor de fundo
          }).showToast();
          animarCadeadoErro()
          return       
    }

    if (caracEscolhidos.length == 0){
        Toastify({
            text: "Favor selecionar pelo menos uma opção!",
            duration: 2000, 
            close: false, 
            gravity: "top", 
            position: "right", 
            backgroundColor: "#FF0000", 
          }).showToast(); 
          animarCadeadoErro()  
          return       
    }

    // Gerando a senha
    let senhaGerada = ''
    for(let i = 0; i < qtdeSenha; i++){
        let index = Math.floor(Math.random() * caracEscolhidos.length)
        senhaGerada += caracEscolhidos[index]
    }

    //exibir senha
    Toastify({
        text: "Senha gerada com sucesso",
        duration: 2000, 
        close: false, 
        gravity: "top", 
        position: "right", 
        backgroundColor: "#11C911", 
      }).showToast();  

    let resultado = document.getElementById('res')
    let inpSenha = document.getElementById('inpSenha')

    resultado.style.display = 'flex'
    inpSenha.value =`${senhaGerada}`

    piscarCadeadoAcerto() //chama a funcao para piscar a imagem

    //exibir botao recomeçar
    let recomecar = document.getElementById('btnRecomecar').style.display = 'flex'
}


const copiarSenha = () => {
    let senhaGerada = document.getElementById('inpSenha').value

    if(senhaGerada){
        navigator.clipboard.writeText(senhaGerada)
        .then(() => {
            Toastify({
                text: "Senha copiada para a área de transferência!",
                duration: 2000, 
                close: false, 
                gravity: "top", 
                position: "right", 
                backgroundColor: "#2C911C", 
              }).showToast();  
        }).catch(() => {
            Toastify({
                text: "Erro ao copiar a senha",
                duration: 2000, 
                close: false, 
                gravity: "top", 
                position: "right", 
                backgroundColor: "#FF0000", 
              }).showToast();  
        })
    }
}

//resetar todos os inputs
const resetar = (elem) => {
    let resultado = document.getElementById('res')
    let inpSenha = document.getElementById('inpSenha')
    let qtdeSenha = document.getElementById('qtdeCarac')
    let numeros = document.getElementById('numeros')
    let letras = document.getElementById('letras')
    let simbolos = document.getElementById('simbolos')

    //apaga todos os campos
    resultado.style.display = 'none'
    inpSenha.value = ''
    qtdeSenha.value = ''
    numeros.checked = false
    letras.checked = false
    simbolos.checked = false

    //volta o focus pro input
    qtdeSenha.focus()

    //esconde o botao recomecar
    elem.style.display = 'none'
}

// Função para animar o cadeado no acerto
const piscarCadeadoAcerto = () => {
    //trocar imagem para verde
    let imgCadeado = document.getElementById('imgCadeado')
    let isMobile = window.innerWidth <= 600

    let imagemAcerto = isMobile ? './imagens/cadeado-green-p.png' : './imagens/cadeado-green.png';
    let imagemNormal = isMobile ? './imagens/cadeado-p.png' : './imagens/cadeado.png';

    imgCadeado.src = imagemAcerto;

    //piscar imagem
    let intervalo = setInterval(() => {
        imgCadeado.style.opacity = (imgCadeado.style.opacity === '0' ? '1' : '0')
    }, 100);

    setTimeout(() => {
        clearInterval(intervalo); 
        imgCadeado.style.opacity = '1'; 
        imgCadeado.src = imagemNormal;
    }, 1000); //para depois de 1s
}


// Função para animar o cadeado no erro
const animarCadeadoErro = () => {
    const cadeado = document.getElementById('imgCadeado');

    // Troca o src da imagem
    let srcOriginal = cadeado.src;

    // Detecta se a tela é pequena (menos de 600px)
    let isMobile = window.innerWidth <= 600;

    // Define as imagens corretas
    let imagemErro = isMobile ? './imagens/cadeado-red-p.png' : './imagens/cadeado-red.png';
    let imagemNormal = isMobile ? './imagens/cadeado-p.png' : './imagens/cadeado.png';

    cadeado.src = imagemErro;

    // Adiciona a animação de erro
    cadeado.classList.add('animaErro');

    //remover animacao
    cadeado.addEventListener('animationend', function removerAnimacao() {
        cadeado.classList.remove('animaErro');
        cadeado.src = imagemNormal; // volta para a imagem normal
        cadeado.removeEventListener('animationend', removerAnimacao);
    });
}

// ouve o redimensionamento da tela para carregar a img correta
window.addEventListener('resize', () => {
    const cadeado = document.getElementById('imgCadeado');
    
    let isMobile = window.innerWidth <= 600;

    // Atualiza a imagem do cadeado conforme o tamanho da tela
    cadeado.src = isMobile ? './imagens/cadeado-p.png' : './imagens/cadeado.png';
});
