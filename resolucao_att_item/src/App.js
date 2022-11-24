import React, { useState,useEffect,useCallback } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPlus,faTrash,faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const App = () => {

	//Iniciando os itens do carrinho com um objeto no array
	const [itens, setItens] = useState([
		{ nome: 'Carro', quantidade: 1 },
	]);
	const [inputValor, setinputValor] = useState('');
	const [totalDeItensDoProduto, setTotalDeItensDoProduto] = useState(1);

	//Função para adicionar novo item no carrinho de compras
	const adicionarNovoItemNoCarrinho = () => {
		const novoItem = {
			nome: inputValor,
			quantidade: 1	
			};
		//Spread Operator(Tres pontinhos ...), responsável por iterar e expandir um objeto interável em um array(lista).
		const novaLista = [...itens, novoItem];
		setItens(novaLista);
		setinputValor('')
	};

	//Função para remover produto clicado no carrinho de compras
	const removerProdutoDoCarrinho = posicaoItem =>{
		//Array Filter é responsável por filtrar, de acordo com a implementação, itens de um array. Leia mais em: https://mzl.la/3EXrxNb
		const removerProduto = itens.filter((_, index) => index !== posicaoItem)
		setItens(removerProduto);
	}

	//Função para adicionar mais itens do produno no carrinho
	const incrementarQuantidadeNoCarrinho = (index) => {
		const copiaListaItem = [...itens];
		copiaListaItem[index].quantidade++;
		setItens(copiaListaItem);
	};

	//Função para remover itens do produto no carrinho
	const decrementarQuantidadeNoCarrinho = (index) => {
		const copiaListaItem = [...itens];
		copiaListaItem[index].quantidade--;
		setItens(copiaListaItem);
	};
	
	//UseCallback retorna uma função memorizada. Leia mais em: https://bit.ly/3tX8Gf0
	const calcularTotalDoCarrinho = useCallback(() => { 
		const totalQuantidadeCarrinho = itens.reduce((total, item) => {
			return total + item.quantidade;
		}, 0);
		setTotalDeItensDoProduto(totalQuantidadeCarrinho);
	},[itens]);
	
	//UseEffect Observa e gerencia mudanças no estado do componente Leia mais em: https://bit.ly/3OuuZlL
	useEffect(() => {
		calcularTotalDoCarrinho()
	}, [itens,calcularTotalDoCarrinho])

	
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
