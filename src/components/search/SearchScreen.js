import React, { useMemo } from 'react'
import queryString from 'query-string'

import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';

export const SearchScreen = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse(location.search);


  const [{ searchText }, handleInputChange] = useForm({ searchText: q });

  const heroesFiltered = useMemo(() => getHeroesByName(q), [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchText);
    navigate(`?q=${searchText}`)
  }

  return (
    <>
      
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Buscar</h4>
          <hr />

          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Busca un heroe"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={handleInputChange} />

            <div className="d-grid gap-2">
              <button type="submit" className="btn btn-outline-primary mt-1" >Buscar</button>
            </div>

          </form>
        </div>

        <div className="col-7">
          <h4>Resultados</h4>
          <hr /> 
          {
            (q === '')
              ? <div className="alert alert-info animate__animated animate__headShake">Buscar un héroe</div>
              : (heroesFiltered.length === 0) && <div className="alert alert-danger animate__animated animate__headShake">No hay resultados para "{q}"</div>
          }

          {
            heroesFiltered.map(hero => (<HeroCard key={hero.id} {...hero} />))
          }
        </div>
      </div>
    </>
  )
}

