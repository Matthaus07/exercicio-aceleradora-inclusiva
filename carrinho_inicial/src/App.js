import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPlus,faTrash,faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const App = () => {

	//Iniciando os itens do carrinho com um objeto no array
	const [itens, setItens] = useState([
		{ nome: 'Melancia', quantidade: 1 },
	]);

	//Vamos usar o inputValor para armazenar a entrada do nosso campo onde digitaremos o produto do carrinho
	const [inputValor, setinputValor] = useState('');

	//Adicionando 1 como valor inicial, pois é iniciado com o produto Melancia ao carrinho :)
	const [totalDeItensDoProduto, setTotalDeItensDoProduto] = useState(1);

	//Função para adicionar novo item no carrinho de compras
	const adicionarNovoItemNoCarrinho = () => {
		//Vamos criar um objeto para adicionar a quantidade e o nome, que irá vir do useState inputValor
		const novoItem = {
			nome: inputValor,
			quantidade: 1	
			};

		//Spread Operator(Tres pontinhos ...), responsável por iterar e expandir um objeto iterável em um array(lista).
		const novaLista = [...itens, novoItem];
		setItens(novaLista);
		//Vamos limpar nosso input após adicionar um novo objeto à nossa lista de itens
		setinputValor('')
		calcularTotalDoCarrinho()
	};

	//Função para remover produto clicado no carrinho de compras
	const removerProdutoDoCarrinho = posicaoItem =>{
		//Array Filter é responsável por filtrar, de acordo com a implementação, itens de um array. Leia mais em: https://mzl.la/3EXrxNb
		const removerProduto = itens.filter((_, index) => index !== posicaoItem)
		setItens(removerProduto);
		calcularTotalDoCarrinho()

	}

	//Função para adicionar mais itens do produno no carrinho
	const incrementarQuantidadeNoCarrinho = (index) => {
		//Criando uma cópia do array de itens do
		const copiaListaItem = [...itens];
		//Aqui, podemos abreviar a posição que queremos acessar do nosso objeto, usando a posição do index dele.
		//O ++ serve para incrementar 1 a nossa quantidade
		copiaListaItem[index].quantidade++;
		setItens(copiaListaItem);
		calcularTotalDoCarrinho()
	};

	//Função para remover itens do produto no carrinho
	const decrementarQuantidadeNoCarrinho = (index) => {
		const copiaListaItem = [...itens];
		//Mesma ideia do incremento. Mas ao invés de adicionar 1, remove-se 1 da quantidade.
		copiaListaItem[index].quantidade--;
		setItens(copiaListaItem);
		calcularTotalDoCarrinho()
	};

	const calcularTotalDoCarrinho = () => {
		//O array.reduce irá percorrer todos os itens de quantidade da nossa matriz e irá adicionando o valor de cada uma, ao nosso
		//elemento atual, resultando em um único valor das somas de todas as quantidades.
		const totalQuantidadeCarrinho = itens.reduce((total, item) => {
			return total + item.quantidade;
		}, 0);
		setTotalDeItensDoProduto(totalQuantidadeCarrinho)
	};
	
	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>

					<input value={inputValor} onChange={event => setinputValor(event.target.value)}  placeholder='Adicione um item ao carrinho' />
					<FontAwesomeIcon icon={faPlus} onClick={()=>adicionarNovoItemNoCarrinho()} />
				</div>
				<div className='item-list'>
					{itens.map((item, index) => (
						<div className='item-container'>
							<div key={index} className='item-name'>
								<span>{item.nome}</span>
							</div>
							<div className="agroup-items">
								<div className='quantity'>
									<button>
										<FontAwesomeIcon icon={faChevronLeft} onClick={()=>decrementarQuantidadeNoCarrinho(index)} />
									</button>
										
									<span> {item.quantidade} </span>
									<button>
										<FontAwesomeIcon icon={faChevronRight}  onClick={()=>incrementarQuantidadeNoCarrinho(index)}/>
									</button>
								</div>

								<FontAwesomeIcon icon={faTrash}  onClick={() =>removerProdutoDoCarrinho(index)}/>
								
							</div>
						</div>
					))}
				</div>
				<div className="agroup-items">
					<FontAwesomeIcon icon={faShoppingCart} />
					<div className='total'>{totalDeItensDoProduto}</div>
				</div>
			</div>
		</div>
	);
};

export default App;
