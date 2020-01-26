import App from './App.jsx'

export default App

export const run = async (...params) => {
	if (process.env.CONTEXT === 'browser-dev') {
		const [rootId, ] = params
		const [
			React,
			{ default: ReactDOM, }
		] = await Promise.all([
			import('react'),
			import('react-dom'),
		])

		ReactDOM.render(
			React.createElement(App),
			window.document.getElementById(rootId)
		)
	}

	return null
}
