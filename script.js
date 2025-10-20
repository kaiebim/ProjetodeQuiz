idQuiz = 1
qualQuiz = 0
quiz = [
    {
        nome: "Capitais de Países",
        perguntas:  [
            "1. Qual a capital da França?",
            "2. Qual a capital da Alemanha?",
            "3. Qual a capital da Inglaterra?",
            "4. Qual a capital do Brasil?",
            "5. Qual a capital da Argentina?"
        ],
        respostas: [
            "Paris",
            "Berlim",
            "Londres",
            "Brasília",
            "Buenos Aires"
        ],
        alternativasErradas: [
            ["Montpellier", "Marseilha", "Lille"],
            ["Munique", "Dortmund", "Leipzig"],
            ["Newcastle", "Liverpool", "Manchester"],
            ["Rio de Janeiro", "São Paulo", "Salvador"],
            ["Rio de La Plata", "Monterrey", "Córdoba"]
        ]
    }
]

function texto(tag, conteudo) {
    const el = document.createElement(tag);
    if (conteudo) el.textContent = conteudo;
    el.id = conteudo;
    if(tag === "button"){
        el.addEventListener('click', () => {verificarTentativa(el)})
    }
    return el;
}

function inputText(id, placeholder) {
    const el = document.createElement('input');
    el.type = 'text'
    el.id = id;
    el.placeholder = placeholder
    return el;
}

function criarButton(id, conteudo, idQ){
    const el = document.createElement('button');
    el.textContent = conteudo
    el.id = id;
    if (id === "FinalizarQuiz"){
        el.addEventListener('click', function(){
            LimparQuiz("QuizPlace");
            inputarQuiz.perguntas.length = numeroPergunta;
            inputarQuiz.respostas.length = numeroPergunta;
            inputarQuiz.alternativasErradas.length = numeroPergunta;
            inputarQuiz.nome = document.getElementById("nomeQuiz"+idQ).value
            for (let i = 0; i < numeroPergunta; i++) {
                inputarQuiz.alternativasErradas[i] = ["","",""]
                inputarQuiz.perguntas[i] = document.getElementById('PerguntaQuiz'+i+idQ).value
                inputarQuiz.respostas[i] = document.getElementById('RespostaCertaQuiz'+i+idQ).value
                for (let j = 1; j < 4; j++) {
                    inputarQuiz.alternativasErradas[i][j-1] = document.getElementById('RespostaQuiz'+j+i+idQ).value
                }
            }
            quiz[idQuiz] = structuredClone(inputarQuiz);
            idQuiz++
            GerarQuiz();
            numeroPergunta = 0
            LimparQuiz("CriarQuiz")
            InicioQuiz()
            EscolherQuiz()
        })
    }
    else if(id === "NovaPergunta"){
        el.addEventListener('click', function(){
            CriarPergunta(numeroPergunta)
        })
    }

    for (let i = 0; i < quiz.length; i++) {
        if(quiz[i].nome.includes(conteudo)){
            el.addEventListener('click', function(){
                console.log(idQ)
                qualQuiz = idQ
                LimparQuiz("QuizPlace")
                GerarQuiz();
                numeroPergunta = 0
                LimparQuiz("CriarQuiz")
                InicioQuiz()
                return;
            })
        }
    }
    return el;
}

function sortearArray(array){
    return array.sort((a, b) => 0.5 - Math.random());
}

function verificarTentativa(x){
    if (quiz[qualQuiz].respostas.includes(x.id)) {
        x.classList.add("certo");
    } 
    else {
        x.classList.add("errado");
    }

    for (let i = 0; i < quiz[qualQuiz].respostas.length; i++) {
        //se a resposta for certa
        if (quiz[qualQuiz].respostas[i] === x.id){
            document.getElementById(x.id).disabled = true
            quiz[qualQuiz].alternativasErradas[i].forEach(y => {
                document.getElementById(y).disabled = true
            });
        }
        //se a resposta for errada
        else {
            for (let i = 0; i < quiz[qualQuiz].alternativasErradas.length; i++) {
                for (let j = 0; j < 3; j++) {
                    if (quiz[qualQuiz].alternativasErradas[i][j] === x.id){
                        document.getElementById(quiz[qualQuiz].respostas[i]).disabled = true
                        document.getElementById(quiz[qualQuiz].respostas[i]).classList.add("certo")
                        quiz[qualQuiz].alternativasErradas[i].forEach(y => {
                            document.getElementById(y).disabled = true
                        });
                    }
                }
            }
        }
    }
}

function GerarQuiz(){
    QuizPlace = document.getElementById("QuizPlace")
    QuizPlace.appendChild(texto('h1', quiz[qualQuiz].nome))
    for(let i = 0; i < quiz[qualQuiz].perguntas.length; i++){
        QuizPlace.appendChild(texto('h2', quiz[qualQuiz].perguntas[i]))
        array = [quiz[qualQuiz].respostas[i], quiz[qualQuiz].alternativasErradas[i][0], quiz[qualQuiz].alternativasErradas[i][1], quiz[qualQuiz].alternativasErradas[i][2]]
        sortearArray(array)
        for(let j = 0; j < 4; j++){    
            QuizPlace.appendChild(texto('button', array[j]))
        }
    }
}

inputarQuiz = {
    nome: "",
    perguntas:  [
        ""
    ],
    respostas: [
        ""
    ],
    alternativasErradas: [
        ["", "", ""],
    ]
}

numeroPergunta = 0

function InicioQuiz(){
    div = document.getElementById("CriarQuiz")
    div.appendChild(texto('h2', 'Criar Novo Quiz'))
    div.appendChild(inputText(('nomeQuiz'+idQuiz), 'Insira o Nome do Quiz Aqui:'))
    CriarPergunta(numeroPergunta)

    div.appendChild(criarButton("NovaPergunta", "Nova Pergunta", idQuiz))
    div.appendChild(criarButton("FinalizarQuiz", "Finalizar Quiz", idQuiz))
}

function CriarPergunta(x){
    div.appendChild(inputText(('PerguntaQuiz'+x+idQuiz), 'Insira a ' + (x+1) + 'º pergunta: '))
    div.appendChild(inputText(('RespostaCertaQuiz'+x+idQuiz), 'Insira a ' + (x+1) + 'º Resposta Certa: '))
    for (let i = 1; i <= 3; i++) {
        div.appendChild(inputText(('RespostaQuiz'+i+x+idQuiz), 'Insira a ' + i + 'º resposta errada da ' + (x+1) + 'º pergunta: '))
    }
    numeroPergunta++
}

telaDeSelecao = []

function EscolherQuiz(){
    div = document.getElementById("EscolherQuiz")
    for (let i = 0; i < quiz.length; i++) {
        if (!telaDeSelecao.includes(quiz[i].nome)){
            div.appendChild(criarButton(("quizEscolha"+i), quiz[i].nome, i))
        }
        telaDeSelecao[i] = quiz[i].nome
    }
}

function LimparQuiz(qual){
    let alvo = document.getElementById(qual);
    alvo.innerHTML = "";
}

EscolherQuiz();
InicioQuiz();
GerarQuiz();