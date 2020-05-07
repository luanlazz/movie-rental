import React, { useEffect } from 'react'
import styled from 'styled-components'
import {
  Grid,
  Typography,
  LinearProgress
} from '@material-ui/core'
import {
  HeaderContent
} from 'ui'
import filmPoster from 'images/ford-vs-ferrari.jpg'
import StarIcon from '@material-ui/icons/Star'
import { useMovie } from 'hooks'

function Catalogue () {
  const { movies, getMovies, fetchingMovie } = useMovie()

  useEffect(() => {
    console.log('getting movies')
    getMovies()
  }, [])

  return (
    <>
      <Content>
        <HeaderContent title='Catalogo de filmes :-)' />

        {fetchingMovie && <LinearProgress />}

        <CatalogueContainer>
          {movies.map((movie) => (
            <FilmContainer key={movie.movieId}>
              <FilmItem>
                <FilmImage>
                  <img src={filmPoster} alt='poster' />
                </FilmImage>

                <FilmInformation>
                  <Top>
                    <FilmTitle>
                      {movie.title}
                    </FilmTitle>

                    <FilmCategory>
                      Ação
                    </FilmCategory>
                  </Top>

                  <Bottom>
                    <FilmRate>
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                      <StarIcon />
                    </FilmRate>

                    <FilmPrice>
                      R$ {movie.price}
                    </FilmPrice>
                  </Bottom>
                </FilmInformation>
              </FilmItem>
            </FilmContainer>
          ))}
        </CatalogueContainer>
      </Content>
    </>
  )
}

const Content = styled(Grid).attrs({
  container: true
})`
`

const CatalogueContainer = styled(Grid).attrs({
  container: true
})`
  && {
    justify-content: space-evenly;
    padding: ${({ theme }) => theme.spacing(2)}px;
  }
`

const FilmContainer = styled(Grid).attrs({
  item: true,
  xs: 12
})`
  && {
    box-shadow: 7px 6px 21px -1px rgba(0,0,0,0.52);
    border-radius: 5px;
    display: inline-block;
    flex-direction: column;
    margin: ${({ theme }) => theme.spacing(1)}px;
    max-width: 250px;
    max-height: 440px;
    overflow: hidden;
    position: relative;
  }
`

const FilmItem = styled.div`
  display: block;
  min-height: 100%;
  min-width: 100%;
`

const FilmImage = styled.div`
  display: block;
  height: 1%;
  position: relative;
  text-align: center;

  img {
    display: block;
    max-height: 345px;
    min-width: 100%;
  }
`

const FilmInformation = styled.div`
  background-color: ${({ theme }) => theme.palette.common.white};
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(0, 1)};
`

const Top = styled.div`
  overflow: hidden;
  text-align: left;
  word-break: break-all;
  padding-bottom: ${({ theme }) => theme.spacing(2)}px;
`

const FilmTitle = styled(Typography).attrs({
  noWrap: true
})`
  && {
    font-size: 1.7rem;
    max-height: 35px;
  }
`

const FilmCategory = styled(Typography)`
  && {
    font-size: 1rem;
    line-height: 17px;
    max-height: 17px;
  }
`

const Bottom = styled.div`
  display: inline-flex;
  justify-content: space-between;
`

const FilmRate = styled.div`
  vertical-align: bottom;
`

const FilmPrice = styled.div`
  color: red;
  font-size: 1.4rem;
  vertical-align: bottom;
`

export default Catalogue
