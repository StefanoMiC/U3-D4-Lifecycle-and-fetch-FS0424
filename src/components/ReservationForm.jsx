import { Component } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";

// proprietà che il server si aspetta di ricevere per ogni prenotazione inviata:

// name <-- string
// phone <-- string
// numberOfPeople <-- string || number
// smoking <-- boolean
// dateTime <-- string || date
// specialRequests <-- string

class ReservationForm extends Component {
  state = {
    reservation: {
      name: "",
      phone: "",
      numberOfPeople: "1",
      smoking: false,
      dateTime: "",
      specialRequests: ""
    },
    userName: "StefanoMic",
    hasAlert: false,
    hasError: false,
    errMsg: ""
  };

  // i metodi custom delle classi vanno creati come arrow function per evitare problemi nella lettura del this
  handleFieldChange = (propertyName, propertyValue) => {
    this.setState({ reservation: { ...this.state.reservation, [propertyName]: propertyValue } });
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   console.log("submit");

  //   fetch("https://striveschool-api.herokuapp.com/api/reservation/", {
  //     method: "POST",
  //     body: JSON.stringify(this.state.reservation),
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(resp => {
  //       if (resp.ok) {
  //         this.setState(
  //           {
  //             reservation: {
  //               name: "",
  //               phone: "",
  //               numberOfPeople: "1",
  //               smoking: false,
  //               dateTime: "",
  //               specialRequests: ""
  //             },
  //             hasAlert: true
  //           },
  //           () => {
  //             // questa callback ci dà la garanzia che lo stato sia effettivamente già cambiato prima di fare una qualsiasi altra operazione
  //             // se leggiamo lo stato da qui dentro, avremo SICURAMENTE il dato aggiornato
  //             console.log("state aggiornato", this.state.reservation.name);
  //           }
  //         );

  //         // leggere lo stato SOTTO ad un setState (essendo setState asincrono) potrebbe darci indietro ancora il valore NON AGGIORNATO
  //         console.log("fuori da setState", this.state.reservation.name);

  //         setTimeout(() => {
  //           this.setState({ hasAlert: false });
  //         }, 5000);
  //       } else {
  //         throw new Error("Non trovo la risorsa");
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);

  //       this.setState({ hasError: true, errMsg: err.message });

  //       setTimeout(() => {
  //         this.setState({ hasError: false, errMsg: "" });
  //       }, 5000);
  //     });
  // };

  handleSubmit = async e => {
    e.preventDefault();
    console.log("submit");

    try {
      const resp = await fetch("https://striveschool-api.herokuapp.com/api/reservation/", {
        method: "POST",
        body: JSON.stringify(this.state.reservation),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (resp.ok) {
        this.setState(
          {
            reservation: {
              name: "",
              phone: "",
              numberOfPeople: "1",
              smoking: false,
              dateTime: "",
              specialRequests: ""
            },
            hasAlert: true
          },
          () => {
            // questa callback ci dà la garanzia che lo stato sia effettivamente già cambiato prima di fare una qualsiasi altra operazione
            // se leggiamo lo stato da qui dentro, avremo SICURAMENTE il dato aggiornato
            console.log("state aggiornato", this.state.reservation.name);
          }
        );

        // leggere lo stato SOTTO ad un setState (essendo setState asincrono) potrebbe darci indietro ancora il valore NON AGGIORNATO
        console.log("fuori da setState", this.state.reservation.name);

        setTimeout(() => {
          this.setState({ hasAlert: false });
        }, 5000);
      } else {
        throw new Error("Non trovo la risorsa");
      }
    } catch (err) {
      console.log(err);

      this.setState({ hasError: true, errMsg: err.message });

      setTimeout(() => {
        this.setState({ hasError: false, errMsg: "" });
      }, 5000);
    }
  };

  componentDidMount() {
    // console.log("RESERV. FORM didMount()");
  }

  render() {
    // console.log("RESERV. FORM Render");
    return (
      <Container>
        <h2 className="display-5 text-center mt-5">Prenota un tavolo da noi</h2>
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={4} xl={6}>
            {/* versione 1) con cortocircuito */}
            {this.state.hasAlert && (
              <Alert variant="success" onClose={() => this.setState({ hasAlert: false })} dismissible>
                Prenotazione inviata
              </Alert>
            )}

            {/* versione 2) con prop show */}
            {/* 
            <Alert show={this.state.hasAlert} variant="success" >
              Prenotazione inviata
            </Alert> */}

            {this.state.hasError && (
              <Alert variant="danger" onClose={() => this.setState({ hasError: false })} dismissible>
                Errore: <strong>{this.state.errMsg || "Errore nell'invio della prenotazione"}</strong>
              </Alert>
            )}

            <Form className="text-start" onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci nome prenotazione"
                  value={this.state.reservation.name} // lettura dallo stato
                  //   lo spread operator serve a prendere tutte le proprietà esistenti nello State IN QUEL MOMENTO e successivamente si sovrascriverà solo una di queste (in questo caso name)
                  //   onChange={e => this.setState({ reservation: { ...this.state.reservation, name: e.target.value } })} // scrittura dello stato
                  onChange={e => this.handleFieldChange("name", e.target.value)} // scrittura dello stato
                  required
                />
                {this.state.reservation.name && this.state.reservation.name.toLowerCase().includes("arnaldo") && (
                  <Form.Text className="text-danger">Ma che nome orribile! Usa quello di un tuo amico..</Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Telefono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="333xxxxx"
                  value={this.state.reservation.phone}
                  onChange={e => this.handleFieldChange("phone", e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSeats">
                <Form.Label>Numero Coperti</Form.Label>
                <Form.Select
                  aria-label="Number of seats"
                  value={this.state.reservation.numberOfPeople}
                  onChange={e => this.handleFieldChange("numberOfPeople", e.target.value)}
                >
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                  <option value="4">Four</option>
                  <option value="5">Five</option>
                  <option value="6">Six</option>
                  <option value="7">Seven</option>
                  <option value="8">Eight</option>
                  <option value="9">Nine</option>
                  <option value="10">Ten</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formCheckbox">
                <Form.Check
                  type="checkbox"
                  label="Fumatori"
                  checked={this.state.reservation.smoking}
                  onChange={e => this.handleFieldChange("smoking", e.target.checked)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formDate">
                <Form.Label>Data e Ora</Form.Label>
                <Form.Control
                  type="datetime-local"
                  min={new Date().toISOString().split(".")[0].slice(0, -3)}
                  value={this.state.reservation.dateTime}
                  onChange={e => this.handleFieldChange("dateTime", e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formPhone">
                <Form.Label>Richieste particolari</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="intolleranze, allergie..."
                  value={this.state.reservation.specialRequests}
                  onChange={e => this.handleFieldChange("specialRequests", e.target.value)}
                />
              </Form.Group>

              <Button variant="info" type="submit">
                Invia
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ReservationForm;
