import { Link } from "react-router";
const getGoogleUrl = () => {
  const url = "https://accounts.google.com/o/oauth2/v2/auth";
  const query = {
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
    response_type: "code",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    prompt: "select_account",
    // get refresh_token by set access_type: 'offline'
    access_type: "offline",
  };
  const queryString = new URLSearchParams(query).toString();
  return `${url}?${queryString}`;
};

const googleOauthUrl = getGoogleUrl();

function Home() {
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));

  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div>
      <h1>Home page</h1>
      <video controls width={500}>
        <source
          src="http://localhost:4000/static/video-stream/f47b29eacdb5218565efe8e00.mp4"
          type="video/mp4"
        ></source>
      </video>

      {isAuthenticated ? (
        <>
          <p>Hello world, mother fucker</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to={googleOauthUrl}>Login with Google</Link>
      )}
    </div>
  );
}

export default Home;
