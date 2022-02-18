import { useState } from 'react';
import './App.css';
import Content from './Content.js';
function App() {
	const [show, setShow] = useState(false);

	return (
		<div className='App'>
			<button onClick={() => setShow(!show)}>Toggle Show</button>
			{show && <Content />}
		</div>
	);
}

export default App;
