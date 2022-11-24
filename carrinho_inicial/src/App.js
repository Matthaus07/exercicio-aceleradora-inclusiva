import React, { useState } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faPlus,faTrash,faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const App = () => {

	//Iniciando os itens do carrinho com um objeto no array
	const [items, setItems] = useState([
		{ nome: 'Carro', quantidade: 1 },
	]);

	const [inputValor, setinputValor] = useState('');
	const [totalItemCount, setTotalItemCount] = useState(1);

	//Função para adicionar novo item no carrinho de compras
	const adicionarNovoItemNoCarrinho = () => {
		const novoItem = {
			nome: inputValor,
			quantidade: 1	
			};

		//Spread Operator(Tres pontinhos ...), responsável por interar e expandir um objeto interável em um array(lista).
		const novaLista = [...items, novoItem];
		setItems(novaLista);
		setinputValor('')
		calcularTotalDoCarrinho()	
	};

	//Função para remover produto clicado no carrinho de compras
	const removerItemDoCarrinho = posicaoItem =>{
		//Array Filter é responsável por filtrar, de acordo com a implementação, itens de um array. Leia mais em: https://mzl.la/3EXrxNb
		setItems(item => item.filter((_, index) => index !== posicaoItem));
		calcularTotalDoCarrinho()
	}

	//Função para adicionar mais itens do produno no carrinho
	const incrementarQuantidadeNoCarrinho = (index) => {
		const copiaListaItem = [...items];
		copiaListaItem[index].quantidade++;
		setItems(copiaListaItem);
		calcularTotalDoCarrinho()
	};

	//Função para remover itens do produto no carrinho
	const decrementarQuantidadeNoCarrinho = (index) => {
		const copiaListaItem = [...items];
		copiaListaItem[index].quantidade--;
		setItems(copiaListaItem);
		calcularTotalDoCarrinho()		
	};
	const calcularTotalDoCarrinho = () => {
		const totalQuantidadeCarrinho = items.reduce((total, item) => {
			return total + item.quantidade;
		}, 0);
		// let sum=0;
		// for (const n of items) sum += n.quantidade
		// console.log('asasa', items)
		setTotalItemCount(totalQuantidadeCarrinho);
	};
	return (
		<div className='app-background'>
			<div className='main-container'>
				<div className='add-item-box'>
					<input value={inputValor} onChange={event => setinputValor(event.target.value)}  placeholder='Adicione um item ao carrinho' />
					<FontAwesomeIcon icon={faPlus} onClick={()=>adicionarNovoItemNoCarrinho()} />
				</div>
				<div className='item-list'>
					{items.map((item, index) => (
						<div className='item-container'>
							<div className='item-name'>
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
								<FontAwesomeIcon icon={faTrash}  onClick={() =>removerItemDoCarrinho(index)}/>
							</div>
						</div>
					))}
				</div>
				<div className="agroup-items">
					<FontAwesomeIcon icon={faShoppingCart} />
					<div className='total'>{totalItemCount}</div>
				</div>
			</div>
		</div>
	);
};

export default App;
