import { Component } from "react";
import { Alert, Badge, Button, Carousel, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
import menu from "../data/menu.json";

class Home extends Component {
  // lo State è una memoria interna ad un componente a Classe
  // lo State è sempre un oggetto

  state = {
    // selectedPasta: null // null permette di fare da argine su un controllo con un ternario / short circuit operator
    selectedPasta: menu[0]
  };

  componentDidMount() {
    // console.log("HOME didMount()");
  }

  render() {
    // mai chiamare setState fuori dal contesto di un evento
    // risulterebbe in un loop infinito di setState che chiama render e render che chiama setState

    // console.log("HOME Render");
    return (
      <Container fluid="md" className="mt-5">
        <Row className="justify-content-center">
          <Col xs={10} md={8} lg={4} xl={6}>
            {/* short circuit operator - blocca la renderizzazione del codice alla destra del && se il valore a sinistra è falsy */}
            {this.state.selectedPasta && <Alert variant="info">Pasta selezionata</Alert>}
            {/* onSlid è un metodo regalatoci dal carosello di react-bootstrap, 
            il suo funzionamento è particolare e prevede di passarci l'indice della nuova slide appena cambiata come parametro della nostra funzione.
            Possiamo quindi mettere insieme l'indice della posizione della slide visualizzata con la posizione nell'array menu, 
            ricevendo quindi l'oggetto del nuovo elemento visualizzato a schermo. 

            A quel punto lo possiamo salvare nello State andando ad attivare l'aggiornamento della porzione di interfaccia collegata allo State!
            */}
            <Carousel
              interval={3000}
              onSlid={slideIndex => {
                // console.log(slideIndex, menu[slideIndex]);
                this.setState({ selectedPasta: menu[slideIndex] });
              }}
            >
              {/* abbiamo ciclato l'array menu con il metodo map */}

              {/* per usare il map all'interno del JSX abbiamo bisogno di creare un'area di contenuto dinamico per 
            andare a risolvere l'espressione direttamente sul posto, quindi risolvere il map, 
            che si lascerà dietro di sé un array di elementi React che verranno renderizzati nella pagina.
            
            Per un corretto uso del map, avremo bisogno di applicare SEMPRE una prop key sul primo elemento ritornato dal map,
            per evitare che React ricrei l'intera lista nel caso in cui uno degli elementi debba cambiare nel tempo.
            */}
              {menu.map(plate => {
                // abbiamo ritornato tanti Carousel.Item quanti erano gli elementi dell'array

                // IMPORTANTE:
                // 1) ricordarsi il return (implicito o esplicito dal map!)
                // 2) ricordarsi di applicare la prop key al primo elemento ritornato dal map (non sui figli)
                return (
                  <Carousel.Item
                    key={`plate-${plate.id}`}
                    // onClick={() => this.setState({ selectedPasta: plate })}
                  >
                    <div className="img-container">
                      <Image src={plate.image} className="img-fluid w-100" />
                    </div>
                    <Carousel.Caption>
                      <h3>{plate.name}</h3>
                      <p className="mb-2">{plate.description}</p>
                      <div>
                        <Badge bg="dark" className="mb-3">
                          {plate.price}€
                        </Badge>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </Col>
        </Row>
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={8} lg={4}>
            {/* Quando abbiamo a che fare con valori di stato è buona prassi controllare la loro esistenza
                specialmente per il primo render iniziale, nel quale lo stato potrebbe non essere ancora presente
                
                Grazie a questo ternario, nel caso in cui lo stato sia vuoto inizialmente non si genererà un errore,
                ma ci sarà il fallback sul caso else del ternario stesso, generando un elemento alternativo ed
                evitando così errori che potrebbero nascere dalla lettura di null.comments ad esempio
                */}
            {this.state.selectedPasta ? (
              <>
                <h4>Recensioni per: {this.state.selectedPasta.name}</h4>
                <ListGroup>
                  {this.state.selectedPasta.comments.map((review, index) => (
                    <ListGroup.Item key={`review-${index}`} className="d-flex justify-content-between align-items-center">
                      <span>
                        {review.author} — {review.comment}
                      </span>
                      <Badge bg={review.rating > 3 ? "success" : "danger"}>{review.rating}</Badge>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </>
            ) : (
              <Alert variant="warning">Seleziona una pasta per leggere le recensioni ☝️</Alert>
            )}

            <Button variant="danger" onClick={() => this.setState({ selectedPasta: null })}>
              Reset
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;
