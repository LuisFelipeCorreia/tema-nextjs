'use client'

import { useState } from 'react'

const CURSOS = [
  { id: 1, titulo: 'React Moderno com Hooks', categoria: 'Front-end', nivel: 'Intermediário', carga: '24h' },
  { id: 2, titulo: 'APIs RESTful com Node.js e Express', categoria: 'Back-end', nivel: 'Intermediário', carga: '30h' },
  { id: 3, titulo: 'TypeScript na Prática', categoria: 'Front-end', nivel: 'Básico', carga: '16h' },
  { id: 4, titulo: 'Docker e Deploy em Nuvem', categoria: 'DevOps', nivel: 'Avançado', carga: '20h' },
  { id: 5, titulo: 'Banco de Dados PostgreSQL', categoria: 'Back-end', nivel: 'Básico', carga: '18h' },
  { id: 6, titulo: 'Arquitetura CSS e Tailwind', categoria: 'Front-end', nivel: 'Básico', carga: '12h' }
]

export default function Home() {
  const [busca, setBusca] = useState('')
  const [categoria, setCategoria] = useState('Todos')
  const [favoritos, setFavoritos] = useState([1])

  const alternarFavorito = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const cursosFiltrados = CURSOS.filter((curso) => {
    const bateCategoria = categoria === 'Todos' || curso.categoria === categoria
    const bateBusca = curso.titulo.toLowerCase().includes(busca.toLowerCase())
    return bateCategoria && bateBusca
  })

  return (
    <div className="app">
      <header className="topo">
        <div>
          <span className="tag">Projeto 04 • Next.js</span>
          <h1>Catálogo de Cursos Tech</h1>
        </div>
        <div className="fav-badge">★ Favoritos: {favoritos.length}</div>
      </header>

      <div className="controles">
        <input
          type="text"
          placeholder="Buscar curso..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <div className="filtros">
          {['Todos', 'Front-end', 'Back-end', 'DevOps'].map((cat) => (
            <button
              key={cat}
              className={categoria === cat ? 'ativo' : ''}
              onClick={() => setCategoria(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="grid">
        {cursosFiltrados.map((curso) => {
          const isFav = favoritos.includes(curso.id)
          return (
            <article key={curso.id} className="card">
              <div className="card-top">
                <span className="cat">{curso.categoria}</span>
                <span className="carga">{curso.carga}</span>
              </div>
              <h2>{curso.titulo}</h2>
              <p className="nivel">Nível: {curso.nivel}</p>
              <button
                className={`btn-fav ${isFav ? 'favoritado' : ''}`}
                onClick={() => alternarFavorito(curso.id)}
              >
                {isFav ? '★ Favoritado' : '☆ Favoritar'}
              </button>
            </article>
          )
        })}
      </main>
    </div>
  )
}