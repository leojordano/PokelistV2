import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import styled from 'styled-components';
import Cards from './components/cards';
import Details from './components/Details'

import './reset.css'

const Spinner = React.lazy(() => import('react-spinkit'));

const BodyStyled = styled.div`
  width: 80%;
  height: 100%;
  margin: 10px auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

// const arrTeste: Array<Object> = [{name: 'pikachu'}, {name: 'charmander'}, {name: 'bulbasaur'}]

export interface PokeInterface {
  name: string,
  url: string
}

interface ArrInterface {
  name: string
}

function App() {
  const [urlPokes, setUrlPokes] = useState<Array<PokeInterface>>()
  const [urlApi, setUrlApi] = useState<string>('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=151')
  const [animate, setAnimate] = useState<Boolean>(false)

 
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
  }, [urlApi])
  
  function getPokemon(poke: string): void {
    setAnimate(true)
    const el = document.getElementById('body')?.children
    let arr: Array<{ id: string }> = [].slice.call(el)
    // console.log(arr)
    arr.map((item) => {
      if(item.id == poke) {
        let teste = document.getElementById(item.id)
        return teste?.classList.add('setted')
        // console.log(teste)
      }
      return document.getElementById(item.id)?.classList.add('animate')
    })

  }

  function renderPokes(): any {
    if(urlPokes) {
      return urlPokes.map(( item: PokeInterface, index: number) => (
        <div id={item.name}>
          <Cards
            name={item.name}
            key={item.name}
            url={`https://pokeapi.co/api/v2/pokemon/${item.name}/`}
            getPokemon={getPokemon}
          />
        </div>
      ))
    }
  }


  return (
    <Suspense fallback={<Spinner name="ball-spin-fade-loader" />}>
      <Router>


        <Switch>
          <Route path='/' exact>
            <BodyStyled id='body'>
              {renderPokes()}
            </BodyStyled>
          </Route>
          <Route path='/:poke' component={Details} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
