import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Button, ButtonGroup, Card, Container, FloatingLabel, Form } from "react-bootstrap";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
// import.meta.env.BASE_URL

const BASE_URL = "http://localhost:9000/notes/";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    axios.get(BASE_URL).then((res) => setNotes(res.data.rows));
  }, []);

  const handleAddNote = (event) => {
    event.preventDefault();
    axios
      .post(BASE_URL, { title, note })
      .then((res) => {
        setNotes([...notes, res.data]);
        setTitle("");
        setNote("");
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteNote = (noteId) => {
    axios
      .delete(BASE_URL + noteId)
      .then(() => {
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        console.log(note)
        setNotes(updatedNotes);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container style={{ margin: 2, }}>
      <h1>Notes App</h1>
      <Form onSubmit={handleAddNote} style={{ margin: 5 }}  >
        <FloatingLabel
          controlId="floatingInput"
          label="Title"
        >
          <Form.Control
            style={{ borderBottomRightRadius: 0, borderBottomLeftRadius: 0 }}
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Take a note..."
          className="mb-3"
        >
          <Form.Control
            style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
            as="textarea"
            placeholder="Take a note..."
            value={note}
            onChange={(event) => setNote(event.target.value)}
          />
        </FloatingLabel>
        <Button variant="success" disabled={!(title.length > 0 || note.length > 0)} type="submit">
          Add Note
        </Button>
      </Form>

      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          {notes.map((note) => (
            <Card key={note._id} className="m-2" border="secondary" style={{ maxWidth: '420px' }}>
              <Card.Title>{note.title}</Card.Title>
              <Card.Body >
                <Card.Text style={{ textAlign: 'left' }} >{note.note}</Card.Text>
                <ButtonGroup size="sm">
                  {/* <Button variant="outline-primary" onClick={() => handleUpdateNote(note.id, note)}>Update</Button> */}
                  <Button variant="outline-danger" onClick={() => handleDeleteNote(note.id)}>Delete</Button>

                </ButtonGroup>
              </Card.Body>
            </Card>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </Container>
  );

}

export default App;
