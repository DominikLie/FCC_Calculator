




function Display(props) {

  return (
    <div className="dis">
      <p id="display-input">{props.expression}</p>
      <p id="display">{props.answer}</p>
    </div>
  )
}




function Buttons(props) {

  return (
    <>
      <div onClick={() => props.onClick("AC")} className="padButton AC gray" id="clear">AC</div>
      <div onClick={() => props.onClick("/")} className="padButton div" id="divide">/</div>
      <div onClick={() => props.onClick("*")} className="padButton times" id="multiply">x</div>
      <div onClick={() => props.onClick("7")} className="padButton seven dark-gray" id="seven">7</div>
      <div onClick={() => props.onClick("8")} className="padButton eight dark-gray" id="eight">8</div>
      <div onClick={() => props.onClick("9")} className="padButton nine dark-gray" id="nine">9</div>
      <div onClick={() => props.onClick("-")} className="padButton minus" id="subtract">-</div>
      <div onClick={() => props.onClick("4")} className="padButton four dark-gray" id="four">4</div>
      <div onClick={() => props.onClick("5")} className="padButton five dark-gray" id="five">5</div>
      <div onClick={() => props.onClick("6")} className="padButton six dark-gray" id="six">6</div>
      <div onClick={() => props.onClick("+")} className="padButton plus" id="add">+</div>
      <div onClick={() => props.onClick("1")} className="padButton one dark-gray" id="one">1</div>
      <div onClick={() => props.onClick("2")} className="padButton two dark-gray" id="two">2</div>
      <div onClick={() => props.onClick("3")} className="padButton three dark-gray" id="three">3</div>
      <div onClick={() => props.onClick("=")} className="padButton equals" id="equals">=</div>
      <div onClick={() => props.onClick("0")} className="padButton zero dark-gray" id="zero">0</div>
      <div onClick={() => props.onClick(".")} className="padButton dot dark-gray" id="decimal">.</div>
    </>
  );
}


function App() {



  const [expression, setExpression] = React.useState("0");
  const [answer, setAnswer] = React.useState("0");
  const [decimal, setDecimal] = React.useState(false);

  const checkInput = symbol => {
    const lastDigit = expression[expression.length - 1];
    const regExOperator = /[*\/\-\+]/
    const debug = true;
    console.log(regExOperator.test(symbol), "decimal:", decimal);

    if (symbol == "=") {
      (debug) ? console.log("Debug1") : "none";
      const operation = [];
      for (let i = 0; i < expression.length; i++) {
       //Vorheriges Symbol ist ein Operator
        if (/[*\/\-\+]/.test(operation[operation.length-1])) {
            
            // Aktuelles Symbol Operator und nächstes Symbol Operator
            if (/[*\/\-\+]/.test(expression[i]) && /[*\/\-\+]/.test(expression[i+1])) {
             operation.pop();
            } 
            // AKtuelles Smybol Operator (außer Minus) und nächstes Symbol Zahl. Vorhigen Operater löschen.
            else if (/[*\/\+]/.test(expression[i])) {
              operation.pop();
            }
        }         
        operation.push(expression[i]);
      };

      
      setAnswer(eval(operation.join("")));
      setExpression(eval(operation.join("")));


      setDecimal(false);
    } else if (symbol == "AC") {
      (debug) ? console.log("Debug2") : "none";
      setExpression("0");
      setAnswer("0");
      setDecimal(false);
    } else if (expression == "0" && symbol == ".") {
      (debug) ? console.log("Debug3") : "none";
      setExpression(expression + symbol);
      setAnswer(expression + symbol);
      setDecimal(true);
    } else if (expression == "0") {
      (debug) ? console.log("Debug4") : "none";
      setExpression(symbol);
      setAnswer(symbol);
    } else if (symbol == "." && decimal == true) {
      (debug) ? console.log("Debug5") : "none";
      setExpression(expression);
      setAnswer(expression);
    } else if (symbol == "." && decimal == false) {
      (debug) ? console.log("Debug6") : "none";
      setExpression(expression + symbol);
      setAnswer(expression + symbol);
      setDecimal(true);

    } else if (regExOperator.test(symbol)) {
      (debug) ? console.log("Debug8") : "none";
      setExpression(expression + symbol);
      setAnswer(expression + symbol);
      setDecimal(false);
    } else {
      (debug) ? console.log("Debug9") : "none";
      setExpression(expression + symbol);
      setAnswer(expression + symbol);
    }
  }


  return (
    <div className="container">
      <div className="grid">
        <Display expression={expression} answer={answer} />
        <Buttons onClick={checkInput} />
      </div>
    </div>


  )
}

ReactDOM.render(<App />, document.getElementById("root"));