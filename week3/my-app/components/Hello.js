export default function Hello(props) {
    return (
      <p>
        Hello {props.fName} {props.lName}!
      </p>
    );
  }

  Hello.defaultProps = {
    fName: 'John',
    lName: 'Doe',
  };