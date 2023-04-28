import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { FaPlusCircle, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { api } from '../api/marvel';
import CardComic from '../components/CardComic';
import Header from '../components/Header';
import { useCart } from '../hooks/CartContext';
import { IComic } from '../interfaces/comics';
import '../landing.css';


export default function Landing() {
    const QUANTITY_PER_PAGE = 10;
    const [query, setQuery] = useState<string>('');
    const [comics, setComics] = useState<IComic[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const { addCart } = useCart();

    useEffect(()=>{
        search("");
    },[])
    async function search(value: string) {
        setIsLoading(true)
        let url=`comics?ts=1&apikey=${process.env.REACT_APP_KEY}&hash=${process.env.REACT_APP_HASH}`
        if (value!="")
            url+=`&titleStartsWith=${value}`
        try {
            const { data } = await api.get(url)
            setComics(data.data.results);
            setPage(1);
        } catch {
            alert('Erro ao realizar pesquisa, tente novamente')
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <article>
            <div className="App">

                <Header />
                <TextField
                    className="box-search"
                    autoFocus
                    onChange={(e: any) => setQuery(e.target.value)}
                    value={query}
                    label="Qual quadrinho está buscando?"
                    variant="outlined"
                />

                <Button
                    className="search"
                    variant="contained"
                    onClick={() => {
                        search(query)
                    }}
                    startIcon={<FaSearch />}>
                    Pesquisar
                </Button>

                <Link to="/lista">
                    <Button
                        className="minha-list"
                        variant="contained"
                        onClick={() => {

                        }}
                        startIcon={<FaPlusCircle />}>
                        Minha Lista
                    </Button>
                </Link>

                {
                    isLoading && <div>Carregando...</div>
                }

                <div className="list-comics">
                    {
                        comics?.slice(0, page * QUANTITY_PER_PAGE).map(element =>
                            
                                <CardComic comic={element} clickAction={() => {
                                    addCart(element)
                                }} text="Adicionar a lista" />
  
                        )
                    }
                </div>
                {
                    comics && <Button
                        className="mais"
                        variant="contained"
                        onClick={() => {
                            setPage(page + 1);
                        }}
                        startIcon={<FaPlusCircle />}>
                        Ver mais
                    </Button>
                }
            </div>
        </article>
    );
};