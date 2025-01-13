import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import LayoutDef from './Layout/LayoutDef.jsx'
import Homepage from './pages/Homepage.jsx'
import DetailsPage from './pages/DetailsPage.jsx'
import AddPropertiesPage from './pages/AddPropertiesPage.jsx'
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route element={<LayoutDef />}>
						<Route index element={<Homepage />} />
						<Route path="/properties/:id" element={<DetailsPage />} />
						<Route path="/properties/:owner" element={<AddPropertiesPage />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
