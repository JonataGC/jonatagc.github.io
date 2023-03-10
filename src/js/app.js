// Projetos
class Selector {
	// Template html
	templateProjeto = `
	<div data-blockScroll>
		<h2 data-blockScroll>{titulo}</h2>
		<i data-blockScroll>{data}</i>
		<p data-blockScroll>{detalhes}</p>
	</div>`

	templateList = `<a href="#projetos" onclick="projeto.selecionar({pIndex}, this)" data-blockScroll>{projeto}</a>`

	last = null
	
	// Selecionar projeto para mostrar detalhes
	selecionar(projeto, e) {
		let pProjetos  = document.getElementById("p-projetos")
		let projSelecionado = JSON.parse(localStorage.getItem("projetos"))

		this.last != null ?	this.last.className = "" : true;
		this.last = e
		e.className = "p-projeto-selected"

		// fade overlay
		pProjetos.className = "p-projeto-fade-out"
		setTimeout(()=>{
			// Cria o template
			pProjetos.innerHTML = this.templateProjeto
				.replace("{titulo}", projSelecionado[projeto]["Titulo"])
				.replace("{data}", projSelecionado[projeto]["Data"])
				.replace("{detalhes}", projSelecionado[projeto]["Detalhes"])

			// fade overlay
			pProjetos.className = "p-projeto-fade-in"
		}, 300)
	}

	// Inicializar lista de projetos
	init() {
		// baixa os dados dos projetos de um json
		fetch('src/data/projetos.json')
			// await
			.then((response) => response.json())
			
			// processa os dados
			.then((json) => {
				localStorage.setItem("projetos", JSON.stringify(json))
				let listaAlvo = document.getElementById("p-projetos-list-ul")
				
				// Inicia a lista de projetos
				var i = 0
				Object.entries(json).forEach(proj => {
					// Cria o template
					// Adiciona o projeto pra lista
					listaAlvo.innerHTML += this.templateList
						.replace("{projeto}", proj[1]["Titulo"])
						.replace("{pIndex}", i)

					// Adiciona o index
					i++
				})
				
			})
	}
}

class ExpFormacoes {
	// Template html
	template = `
	<div class="p-expf-div" data-blockScroll>
		<h3 data-blockScroll>{titulo}</h3>
		<i data-blockScroll>{data}</i>
		<p data-blockScroll>{detalhes}</p>
	</div>`

	init() {
		fetch('src/data/expform.json')
		.then((response) => response.json())
		.then((json) => {
			let pexpformacoes = document.getElementById("p-expformacoes")

			Object.entries(json).forEach(ef => {
				var htmlExpForm = this.template
				.replace("{titulo}", ef[1]["Titulo"])
				.replace("{data}", ef[1]["Data"])
				.replace("{detalhes}", ef[1]["Detalhes"])

				pexpformacoes.innerHTML += htmlExpForm
			})

			projeto.selecionar(0, document.getElementById("p-projetos-list-ul").querySelector("a"))
		})
	}
}

var projeto = new Selector()
projeto.init()
// setTimeout(() => {
// 	projeto.selecionar(0, document.getElementById("p-projetos-list-ul").querySelector("a"))
// }, 100);
var expFormacoes = new ExpFormacoes()
expFormacoes.init()
