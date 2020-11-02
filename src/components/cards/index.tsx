import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, Redirect, useHistory } from 'react-router-dom'

interface HeaderCardInterface {
  backgroundColor: any
}

const CardHeader = styled.div<HeaderCardInterface>`
        margin-top: 10px;
        width: 100%;
        padding: 10px 0px;
        text-align: center;
        position: relative;

          span {
            top: 0px;
            left: -5px;
            position: absolute;
            width: 10px;
            height: 100%;
            background-color: ${props => props.backgroundColor};
            border-radius: 10px;
          }

          h2 {
            font-size: 16px;
            font-weight: 700;
          }
`

const CardStyled = styled.div`
    background-color: #111218;
    width: 150px;
    height: 200px;
    margin: 5px;
    color: white;
    text-transform: capitalize;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

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
            font-size: 18px;
          }
      }
`

interface PokeUrlInterface {
    url: string,
    getPokemon: Function,
    name: string
}

interface SpeciesInterface {
  name: string,
  url: any

}

interface typesInterface {
  slot: number,
  type: {name: string, url: string}
}

interface PokeInterface {
  name: string,
  species: SpeciesInterface,
  sprites: any,
  id: number,
  types: Array<typesInterface>
}

interface DataPokeInterface {
  color: {name: string},
}

function Cards(props: PokeUrlInterface) {
  const [poke, setPoke] = useState<PokeInterface | undefined>(undefined)
  const [runData, setRunData] = useState<Boolean>(false)

  const [pokeData, setPokeData] = useState<DataPokeInterface>()
  const [gettedData, setGettedData] = useState<Boolean>(false)
  const [settedPoke, setSettedPoke] = useState<Boolean>(false)

  const history = useHistory()

  
  async function fetchPoke(url: string, setter: Function, getDataPoke: Boolean): Promise<void> {
    await fetch(url)
    .then(res => res.json())
      .then(data => {
        setter(data)
        // console.log(data)
        if(getDataPoke) {
          setRunData(true)
        }
        
      })
      .catch(err => console.log(err))
    }
    
    useEffect(() => {
      fetchPoke(props.url, setPoke, true)
    }, [])
    
    useEffect(() => {
      let getUrl: string = `https://pokeapi.co/api/v2/pokemon-species/${poke?.name}/`
      fetchPoke(getUrl, setPokeData, false )
      setGettedData(true)
    }, [runData])

    function Redirect():void {
      setTimeout(() => {
        history.replace(`/${poke?.name}`)
      }, 600)
      setSettedPoke(true)
      props.getPokemon(props.name)
    }

    return (
    <div>
    {poke &&
      <CardStyled className={settedPoke && 'breakfast'}>
        {gettedData && <CardHeader className='header' backgroundColor={pokeData?.color.name}>
          <span className={settedPoke && 'dinner'}></span>
           <h2 className={settedPoke && 'cardSetted'} onClick={() => Redirect()}>{poke.name}</h2>
        </CardHeader>}

        <div className={settedPoke ? 'cardSetted body' : 'body'}>
            <img loading='lazy' src={poke.sprites.front_default} alt={poke.name}/>
        </div>

        <div className={settedPoke ? 'cardSetted footer' : 'footer'}>
          <div className="side-one">
            <span>#{poke.id}</span>
          </div>

          <div className="side-two">
            {poke.types.map((type: typesInterface, index: any) => (
              <p key={index}>{type.type.name}</p>
            ))}
          </div>
        </div>
      </CardStyled>
    }
    </div>
  );
}

export default Cards;