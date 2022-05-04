import React, { useMemo } from 'react'
import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { getHeroById } from '../../selectors/getHeroById';

export const HeroScreen = () => {

  const { heroId } = useParams();
  const navigate = useNavigate()


  const hero = useMemo( () => getHeroById(heroId), [heroId]);

  const handleReturn = () => {
    navigate(-1);
  }

  if (!hero) {
    return <Navigate to='/'/>
  }

  const { id,superhero,publisher,first_appearance,characters,alter_ego } = hero

  const imagePath = `/assets/img/${id}.jpg`;

  return (
    <div className="row mt-5">
        <div className="col-4">
            <img src={ imagePath } alt={ superhero } className="img-thumbnail animate__animated animate__fadeInLeft" />
        </div>

        <div className="col-8 animate__animated animate__fadeIn">
            <h2> <span className="badge bg-dark w-100">{superhero}</span></h2>
            <ul className="list-group mt-3">
                <li className="list-group-item"> <b>Alter ego:</b> { alter_ego } </li>
                <li className="list-group-item"> <b>Publisher:</b> { publisher } </li>
                <li className="list-group-item"> <b>First Appearance:</b> { first_appearance } </li>
                <li className="list-group-item"> <b>Characters:</b> { characters } </li>
            </ul>

            <button className="btn btn-outline-info mt-3 w-100" onClick={ handleReturn }>Regresar</button>
        </div>
    </div>
  )
}
