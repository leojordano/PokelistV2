import { url } from 'inspector';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Cards from './components/cards';
import Header from './components/Header'
import './reset.css'

const BodyStyled = styled.div`
  width: 80%;
  height: 500px;
  margin: 10px auto;
  display: flex;
`

// const arrTeste: Array<Object> = [{name: 'pikachu'}, {name: 'charmander'}, {name: 'bulbasaur'}]

interface PokeInterface {
  name: string,
  url: string
}

function App() {
  const [urlPokes, setUrlPokes] = useState<Array<PokeInterface>>()

  const urlApi: string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=3'
  
  async function fetchData(url: string): Promise<void> {
    await fetch(url)
    .then(res => res.json())
    .then(data => {
        setUrlPokes(data.results)
    })
    .catch(err => console.log(err))
  }
  
  useEffect(() => {
    fetchData(urlApi)
  }, [])
  
  function renderPokes(): any {
    if(urlPokes) {
      return urlPokes.map(( item: PokeInterface, index: any) => (
        <Cards
          key={index}
          url={item.url}
        />
      ))
    }
    }


  return (
    <>
      <Header name='Jordanoo'></Header>

      <BodyStyled>
        {renderPokes()}
      </BodyStyled>
    </>
  );
}

export default App;
