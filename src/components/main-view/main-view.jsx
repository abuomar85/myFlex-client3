import React from "react";
import axios from "axios";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from '../login-view/login-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null
        }
    }
 

    componentDidMount(){
      axios.get('https://limitless-sierra-99077.herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        })
    }

    onLoggedIn(user) {
      this.setState({
        user
      });
    }

    onRegistration(user) {
      this.setState({
        user
      }); 
    }
    render() {

        const { movies, selectedMovie, user } = this.state;
        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
        if (movies.length === 0) return <Container><MainView /></Container>;
    
        return (
         
          <Row className="main-view justify-content-md-center">
            {selectedMovie
              ? (
                <Col md={8}>
                  <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
              )
              : movies.map(movie => (
                <Col md={3}>
                  <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
              ))
            }
         </Row>
        );
      }
}