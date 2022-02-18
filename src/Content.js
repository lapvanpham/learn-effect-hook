import React, { useState, useEffect } from 'react';
import './Content.css';
export default function Content() {
	const [title, setTitle] = useState('');
	const [posts, setPosts] = useState([]);
	const tabs = ['posts', 'comments', 'albums'];
	const [type, setType] = useState('posts');
	const [showToTop, setShowToTop] = useState('false');

	function changeHandler(e) {
		setTitle(e.target.value);
	}
	// call API
	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/${type}`)
			.then((res) => res.json())
			.then((type) => {
				setPosts(type);
			});
	}, [type]);

	// add event listener
	useEffect(() => {
		function scrollHandler() {
			setShowToTop(window.scrollY > 400);
		}
		window.addEventListener('scroll', scrollHandler);

		// cleanup function
		return () => {
			window.removeEventListener('scroll', scrollHandler);
		};
	}, []);

	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		function resizeHandler() {
			setWidth(window.innerWidth);
		}

		window.addEventListener('resize', resizeHandler);

		return () => window.removeEventListener('resize', resizeHandler);
	});

	return (
		<div>
			<h1>{width}</h1>
			{tabs.map((tab) => (
				<button
					key={tab}
					onClick={() => setType(tab)}
					style={type === tab ? { color: 'white', backgroundColor: '#333' } : {}}
				>
					{tab}
				</button>
			))}
			<br />
			<input type='text' value={title} onChange={changeHandler} />
			<ul>
				{posts.map((post) => (
					<li key={post.id}>{post.title || post.name}</li>
				))}
			</ul>

			{showToTop && <button className='show-to-top'>Go to top</button>}
		</div>
	);
}
