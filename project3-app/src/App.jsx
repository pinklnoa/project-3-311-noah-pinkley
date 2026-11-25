import { useEffect, useState } from "react"
import PokemonGrid from "./components/PokemonGrid"
import PokemonLookup from "./components/PokemonLookup"
import bgImg from "./assets/bg.png"
import "./App.css"

function App() {
	const [list, setList] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [errMsg, setErrMsg] = useState("")

	async function loadRandom() {
		setIsLoading(true)
		setErrMsg("")

		try {
			const picked = []
			for (let i = 0; i < 20; i++) {
				const num = Math.floor(Math.random() * 1025) + 1
				picked.push(num)
			}

			const items = []
			for (let i = 0; i < picked.length; i++) {
				const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + picked[i])
				if (!res.ok) {
					throw new Error("could not load pokemon")
				}
				const data = await res.json()
				items.push({
					id: data.id,
					name: data.name,
					sprite: data.sprites.front_default,
					type: data.types[0].type.name
				})
			}

			setList(items)
		} catch (e) {
			setErrMsg(e.message)
		}

		setIsLoading(false)
	}

	useEffect(() => {
		loadRandom()
	}, [])

	return (
		<main className="page-wrap" style={{ backgroundImage: `url("${bgImg}")` }}>
			<div className="page">
				<header className="header">
					<h1>Random pokemon generator</h1>
					<div className="controls">
						<button type="button" onClick={loadRandom} disabled={isLoading}>
							{isLoading ? "..." : "generate pokemon"}
						</button>
					</div>
				</header>

				{errMsg !== "" && <div className="error-box">{errMsg}</div>}

				<PokemonLookup />

				<PokemonGrid pokemonList={list} loading={isLoading} />
			</div>
		</main>
	)
}

export default App