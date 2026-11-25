function PokemonGrid({ pokemonList, loading }) {
	return (
		<section className="section-box">
			<div className="grid-bar">
				<span>Showing {pokemonList.length} pokemon</span>
			</div>

			{loading && pokemonList.length === 0 ? (
				<p className="status-text">loading...</p>
			) : (
				<div id="main-grid">
					{pokemonList.map((p, index) => (
						<div key={index} className="box">
							{p.sprite && <img src={p.sprite} alt={p.name} />}
							<p>{p.name}</p>
							<span className="meta">#{p.id} · {p.type}</span>
						</div>
					))}
				</div>
			)}
		</section>
	)
}

export default PokemonGrid