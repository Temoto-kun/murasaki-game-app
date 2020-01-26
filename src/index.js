import App from './App.jsx'

export default App

export const run = async (...params) => {
	if (process.env.CONTEXT === 'browser-dev') {
		const [rootId, ] = params
		const [
			{ createElement, },
			{ default: ReactDOM, },
			{ createBrowserHistory, }

		] = await Promise.all([
			import('react'),
			import('react-dom'),
			import('history'),
		])

		const history = createBrowserHistory()

		ReactDOM.render(
			createElement(
				App,
				{
					history,
					datasets: {
						...JSON.parse(window.localStorage.getItem('murasaki-dataset-kanjidic2'))
					},
				}
			),
			window.document.getElementById(rootId)
		)
	}

	return null
}
