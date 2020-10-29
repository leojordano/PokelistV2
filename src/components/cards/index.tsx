import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

interface CardInterface {
  aftercolor: any
}

const CardStyled = styled.div<CardInterface>`
    background-color: #111218;
    width: 150px;
    height: 200px;
    margin: 5px;
    color: white;
    text-transform: capitalize;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

      .header {
        margin-top: 10px;
        width: 100%;
        padding: 10px 0px;
        background-color: ${props => props.aftercolor};
        text-align: center;
        position: relative;

          &::after {
            top: 0px;
            left: -5px;
            content: '';
            position: absolute;
            width: 10px;
            height: 100%;
            /* background-color: ${props => props.color || 'red'}; */
            border-radius: 10px;
          }
      }

      .body {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .footer {
        display: flex;
        justify-content: space-around;
        align-items: center;

          .side-one {
            font-size: 20px;
          }
      }
`

interface PokeUrlInterface {
    url: string
}

interface SpeciesInterface {
  name: string,
  url: any

}

interface PokeInterface {
  name: string,
  species: SpeciesInterface,
  sprites: any,
  id: number
}

interface DataPokeInterface {
  color: {name: string}
}

function Cards(props: PokeUrlInterface) {
  const [poke, setPoke] = useState<PokeInterface | undefined>(undefined)
  const [pokeData, setPokeData] = useState<DataPokeInterface>()

  setTimeout(() => {console.log(pokeData)}, 1000)

  async function fetchPoke(url: string, setter: Function): Promise<void> {
    await fetch(url)
      .then(res => res.json())
      .then(data => setter(data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchPoke(props.url, setPoke)
  }, [])

  useEffect(() => {
    fetchPoke(poke?.species.url,setPokeData )
  }, [])

  return (
    <>
    {poke &&
      <CardStyled>
        <div className="header" aftercolor="yellow">
          {poke.name}
        </div>

        <div className="body">
            <img src={poke.sprites.front_default} alt={poke.name}/>
        </div>

        <div className="footer">
          <div className="side-one">
            <span>#{poke.id}</span>
          </div>

          <div className="side-two">
            <p>types 1</p>
            <p>types 2</p>
          </div>
        </div>
      </CardStyled>
    }
    </>
  );
}

export default Cards;