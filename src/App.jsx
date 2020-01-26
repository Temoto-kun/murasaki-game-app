import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Router, Route, } from 'react-router'

import Loading from './components/Loading/Loading.jsx'

const Game = React.lazy(() => import('./routes/game/components/Main/Main.jsx'))

const App = ({
	history,
	datasets,
}) => (
	<React.Suspense fallback={<Loading />}>
		<Router history={history}>
			<Route
				path="/game/:id"
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
