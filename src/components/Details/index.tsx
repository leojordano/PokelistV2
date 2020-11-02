import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'

import './animation.css'

type TParams = { poke: string }

interface DinnerInterface {
  backgroundColor: any
}

const Dinner = styled.div<DinnerInterface>`
   position: absolute;
   left: 500px;
   width: 10px;
   height: 40px;
   background-color: ${props => props.backgroundColor};
   border-radius: 10px;
   transition-duration: 0.5s;
   text-transform: capitalize;
`
const Stat = styled.span<{width: any}>`
  width: 300px;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;

    &:after {
      position: relative;
      content: '';
      width: ${props => `${props.width}%`};
      height: 10px;
      background-color: white;
      left: 5px;
    }
`

const Abilitie = styled.p`
  color: white;
  padding: 5px;
`

interface PokeDataInterface {
  color: {name: string}
}

interface PokeInterface {
  name: string,
  sprites: {
    front_default: string,
    other: {
      'official-artwork': {
        front_default: any
      }
    }
  },
  id: number,
  types: Array<{type: {name: string}}>,
  stats: Array<{base_stat: number, stat: {name: string}}>,
  abilities: Array<{ ability: { name: string }, hidden: boolean }>
}

function Details({ match }: RouteComponentProps<TParams>, props: any) {
  const [open, setOpen] = useState<Boolean>(false)
  const [run, setRun] = useState<Boolean>(false)
  
  const [data, setData] = useState<PokeDataInterface>()
  const [poke, setPoke] = useState<PokeInterface>()
  
  async function fetchPokemon() {
    await fetch(`https://pokeapi.co/api/v2/pokemon-species/${match.params.poke}/`)
    .then(data => data.json())
    .then(data => setData(data))
          .catch(err => console.log(err))

    await fetch(`https://pokeapi.co/api/v2/pokemon/${match.params.poke}/`)
      .then(data => data.json())
      .then(data => setPoke(data))
      .catch(err => console.log(err))
    }

    useEffect(() => {
      fetchPokemon()
      console.log(poke)
    }, [])

  setTimeout(() => {
    setOpen(true)
  }, 0)

  setTimeout(() => {
    setRun(true)
    console.log(poke)
  }, 500)

  return (
    <div className='body'>
          <Dinner className={open && 'actived'}  backgroundColor={data?.color.name}>
          </Dinner>
        <div className="details">

          <div className="card">
            <div className="header">
              {run && <h2>{match.params.poke}</h2>}
            </div>

            <div className="body">
              {run && <img src={poke?.sprites.other["official-artwork"].front_default} alt={poke?.name} />}
            </div>

            <div className="footer">
                <div className="side-one">
                  #{poke?.id}
                </div>

                <div className="side-two">
                  {poke?.types.map(type => (
                    <p>{type.type.name}</p>
                  ))}
                </div>
            </div>
          </div>

          <div className="box">
            <div className="habilits">
                <h3 className='abilities'>Abilities</h3>
                <div className='abilities-body'>
                  {poke?.abilities.map(item => (
                    <div>
                      <Abilitie>{item.ability.name}</Abilitie>
                    </div>
                  ))}
                </div>
            </div>

            <div className="stats">
                  <div>
                    <span>HP</span>
                    <Stat width={poke?.stats[0].base_stat}>{poke?.stats[0].base_stat}</Stat>
                  </div>

                  <div>
                    <span>ATK</span>
                    <Stat width={poke?.stats[0].base_stat}>{poke?.stats[1].base_stat}</Stat>
                  </div>

                  <div>
                    <span>DEF</span>
                    <Stat width={poke?.stats[0].base_stat}>{poke?.stats[2].base_stat}</Stat>
                  </div>

                  <div>
                    <span>SPA</span>
                    <Stat width={poke?.stats[0].base_stat}>{poke?.stats[3].base_stat}</Stat>
                  </div>

                  <div>
                    <span>SDF</span>
                    <Stat width={poke?.stats[0].base_stat}>{poke?.stats[4].base_stat}</Stat>
                  </div>

                  <div>
                    <span>SPD</span>
                    <Stat width={poke?.stats[0].base_stat}>{poke?.stats[5].base_stat}</Stat>
                  </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Details;