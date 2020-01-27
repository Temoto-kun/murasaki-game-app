import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Router, Route, Redirect, } from 'react-router'

import Loading from './components/Loading/Loading.jsx'

const Home = React.lazy(() => import('./routes/home/components/Main/Main.jsx'))
const Start = React.lazy(() => import('./routes/start/components/Main/Main.jsx'))
const Game = React.lazy(() => import('./routes/game/components/Main/Main.jsx'))
const Datasets = React.lazy(() => import('./routes/datasets/components/Main/Main.jsx'))

const App = ({
	history,
	datasets,
}) => (
	<React.Suspense fallback={<Loading />}>
		<Router history={history}>
			<Route
				path="/"
				exact
				render={() => (
					<Redirect
						to="/home"
					/>
				)}
			/>
			<Route
				path="/home"
				component={Home}
			/>
			<Route
				path="/start"
				component={Start}
			/>
			<Route
				path="/datasets"
				component={Datasets}
			/>
			<Route
				path="/game"
				render={routeProps => (
					<Game
						{...routeProps}
						datasets={datasets}
					/>
				)}
			/>
		</Router>
	</React.Suspense>
)

App.propTypes = {
	history: PropTypes.object.isRequired,
}

export default App
