export default function ForgotPassword() {
  return (
    <>
      <h3>
        Enter Your Email Address
      </h3>
      <form className="form">
        <label htmlFor={"email"} className="email">
          Email: <input type={"email"} />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}