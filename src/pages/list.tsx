import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import React, { useState } from 'react';
import { FaArrowLeft, FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import CardComic from '../components/CardComic';
import Header from '../components/Header';
import { useCart } from '../hooks/CartContext';
import '../landing.css';


export default function List() {

    const { comicsCart, removeCart } = useCart();
    const QUANTITY_PER_PAGE = 10;
    const [page, setPage] = useState<number>(1);

    return (
        <article>
            <div className="App">

                <Header />
                <h1>Lista Pessoal de Quadrinhos</h1>
                <Link to="/">
                    <Button
                        className="minha-list"
                        variant="contained"

                        startIcon={<FaArrowLeft />}>
                        Voltar
                    </Button>
                </Link>

                
                <div className="list-comics-list">
                    {
                        comicsCart?.slice(0, page * QUANTITY_PER_PAGE).map(element =>
                    
                                <CardComic comic={element} clickAction={() => {
                                    removeCart(element.id)
                                }} text="Remover da lista" />
                      
                        )
                    }
                </div>
                {
                    comicsCart.length > 0 ? <Button
                        className="mais"
                        variant="contained"
                        onClick={() => {
                            setPage(page + 1);
                        }}
                        startIcon={<FaPlusCircle />}>
                        Ver mais
                    </Button> : <div>Nenhum item na lista</div>
                }
            </div>
        </article>
    );
};