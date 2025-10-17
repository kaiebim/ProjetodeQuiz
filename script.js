
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

function sortearArray(array){
    return array.sort((a, b) => 0.5 - Math.random());
}

function verificarTentativa(x){
    if (quiz[0].respostas.includes(x.id)) {
        x.classList.add("certo");
    } 
    else {
        x.classList.add("errado");
    }

    for (let i = 0; i < quiz[0].respostas.length; i++) {
        //se a resposta for certa
        if (quiz[0].respostas[i] === x.id){
            document.getElementById(x.id).disabled = true
            quiz[0].alternativasErradas[i].forEach(y => {
                document.getElementById(y).disabled = true
            });
        }
        //se a resposta for errada
        else {
            for (let i = 0; i < quiz[0].alternativasErradas.length; i++) {
                for (let j = 0; j < 3; j++) {
                    if (quiz[0].alternativasErradas[i][j] === x.id){
                        document.getElementById(quiz[0].respostas[i]).disabled = true
                        document.getElementById(quiz[0].respostas[i]).classList.add("certo")
                        quiz[0].alternativasErradas[i].forEach(y => {
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
    QuizPlace.appendChild(texto('h1', quiz[0].nome))
    for(let i = 0; i < quiz[0].perguntas.length; i++){
        QuizPlace.appendChild(texto('h2', quiz[0].perguntas[i]))
        array = [quiz[0].respostas[i], quiz[0].alternativasErradas[i][0], quiz[0].alternativasErradas[i][1], quiz[0].alternativasErradas[i][2]]
        sortearArray(array)
        for(let j = 0; j < 4; j++){    
            QuizPlace.appendChild(texto('button', array[j]))
        }
    }
}

GerarQuiz();