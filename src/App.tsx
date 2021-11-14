import { useEffect } from 'react';
import Terminal from './components/terminal';

/**
 * @return {JSX.Element}
 */
function App(): JSX.Element {
  useEffect(() => {
    document.getElementById('userInput')?.focus();
  });

  return (
    <div id="App" className="min-h-screen h-auto">
      <Terminal />
    </div>
  );
}

export default App;
