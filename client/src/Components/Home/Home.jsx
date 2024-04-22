import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="home">
            <h1>Welcome to ShoppersStop</h1>
            <p>At ShoppersStop, we strive to provide our customers with great products at a competitive price re-enforced by exceptional customer service. Our hope is you have a great experince as we take pride in being a one stop shop for all our customer needs</p>
            <h3>
            To view our products please click
                <Link to="/products"> here</Link>
            </h3>
        </div>
    );
}