const Header = ( {headerCallback}) => {


  return (
      <div>
        <button onClick={() => headerCallback(false)}>Homepage</button>
        <button onClick={() => headerCallback(true)}>Favorites</button>
      </div>
  );
}

export default Header;