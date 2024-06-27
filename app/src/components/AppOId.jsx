import Container from './Container';
import Menu from './Menu/Menu';

export function AppOld() {
  const isVisible = true;
  const showHeading = true;
  const showMenu = true;

  function renderHeading() {
    return <h1>Heading</h1>;
  }

  return (
    <div>
      {console.log('Din jsx')}
      {/* {isVisible ? 'Vizibil' : 'Invizibil'} */}
      {isVisible && 'Vizibil'}
      {showHeading && renderHeading()}
      <Menu title="Titlul Meniului" items={['item 1', 'item 2', 'item 3']} isVisible={showMenu} />
      <Container>
        <div
          style={{
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 40,
            color: '#010101',
          }}
        >
          <h1>Lectia2 - React si JSX</h1>
        </div>
      </Container>
    </div>
  );
}
