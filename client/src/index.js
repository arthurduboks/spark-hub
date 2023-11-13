// import "@fortawesome/fontawesome-free/css/all.css";
import Modal from "./components/Modal";
import IdeaForm from "./components/IdeaForm";
import IdeaList from "./components/IdeaList";
import "./css/style.css";

// Modal
new Modal();
// Idea form
const ideaForm = new IdeaForm();
// Call render from IdeaForm
ideaForm.render();
// Idea list
new IdeaList();
