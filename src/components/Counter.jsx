import { Component } from "react";
import { Button } from "react-bootstrap";

class Counter extends Component {
  // ogni componente a classe può definire un suo stato interno in questo modo:

  state = {
    count: 0,
    name: "Stefano",
    static: null
  };

  // regola nr.1 degli State dei componenti è:
  // MAI MUTARE LO STATO DIRETTAMENTE!
  // per modificare lo stato bisogna SEMPRE usare il metodo this.setState()

  // this.setState(object)
  // il metodo setState è asincrono! e si aspetta un oggetto con coppie chiave-valore che sono quelle da modificare rispetto allo stato iniziale
  // in base a quello che passiamo nell'oggetto lo stato verrà modificato. possiamo modificare tutte le sue proprietà o solo alcune.

  // chiamare this.setState() notificherà React di un avvenuto cambiamento nel suo stato interno del componente
  // e di conseguenza richiamerà un'altra volta il metodo render() della classe

  // questo farà sì che i valori dinamici verranno letti un'altra volta, e quelli che sono cambiati determineranno l'aggiornamento
  // dell'elemento anche nel dom (in automatico)

  // si capisce quindi perché non è possibile mutare lo stato direttamente, non si attiverebbero tutte queste logiche automatiche
  // e soprattutto il dato cambierebbe nello stato ma l'interfaccia non rifletterebbe questo cambiamento

  render() {
    console.log("RENDER");
    return (
      <div className="border border-dark">
        <h1>{this.state.name}</h1>
        <div className="d-flex align-items-center justify-content-center gap-3 mt-5">
          <Button variant="success" onClick={() => this.setState({ count: this.state.count - 1, name: "Arianna" })}>
            -1
          </Button>
          <h2 className="mb-0">{this.state.count}</h2>
          <Button variant="success" onClick={() => this.setState({ count: this.state.count + 1, name: "Gabriel" })}>
            +1
          </Button>
        </div>
      </div>
    );
  }
}

export default Counter;
