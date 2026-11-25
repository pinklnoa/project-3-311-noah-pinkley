import { useState } from "react"

function PokemonLookup() {
	const [query, setQuery] = useState("")
	const [result, setResult] = useState(null)
	const [missing, setMissing] = useState(false)
	const [busy, setBusy] = useState(false)

	async function onSearch(e) {
		e.preventDefault()
		const clean = query.trim().toLowerCase()
		if (clean === "") {
			return
		}

		setBusy(true)
		setResult(null)
		setMissing(false)

		try {
			const res = await fetch("https://pokeapi.co/api/v2/pokemon/" + clean)
			if (!res.ok) {
				setMissing(true)
				setBusy(false)
				return
			}
			const data = await res.json()
			setResult({
				id: data.id,
				name: data.name,
				sprite: data.sprites.front_default,
				type: data.types[0].type.name
			})
		} catch {
			setMissing(true)
		}

		setBusy(false)
	}

	return (
		<section className="section-box">
			<form onSubmit={onSearch} className="search-form">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="search name or id (e.g. ditto or 132)"
				/>
				<button type="submit" disabled={busy}>
					{busy ? "..." : "search api"}
				</button>
			</form>

			{missing && (
				<div className="error-box">pokemon "{query}" not found</div>
			)}

			{result && (
				<div className="box lookup-card">
					{result.sprite && (
						<img src={result.sprite} alt={result.name} />
					)}
					<p>{result.name}</p>
					<span className="meta">#{result.id} · {result.type}</span>
				</div>
			)}
		</section>
	)
}

export default PokemonLookup