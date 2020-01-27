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

		const kanjidic2 = JSON.parse(window.localStorage.getItem('murasaki-dataset-kanjidic2'))

		ReactDOM.render(
			createElement(
				App,
				{
					history,
					datasets: {
						kanjidic2: {
							...kanjidic2,
							entry: kanjidic2.entry.filter(e => e.misc.jlpt === '4'),
						}
					},
				}
			),
			window.document.getElementById(rootId)
		)
	}

	return null
}
