import Navigation from "../navegation/Navegation";
import Login from "../login/Login";
import './home.css';

export default function Home() {
    return (
      <div className="home-container">
        <Navigation />
        <main>
          <Login /> {}
        </main>
      </div>
    );
  }