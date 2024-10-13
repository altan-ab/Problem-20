import { useEffect, useState } from 'react'

// todos endpoint'inden tüm todo'ları getirin ve todo bileşeninde görüntüleyin
// API endpoint: https://jsonplaceholder.typicode.com/users/1/todos
export default function Todos() {
  //   {
  //     "userId": 1,
  //     "id": 1,
  //     "title": "delectus aut autem",
  //     "completed": false
  // }[]

  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users/1/todos')
      .then((response) => response.json())
      .then((data) => {
        setTodos(data) // Todos'u state'e atılır
        setLoading(false) // Yüklenme durumu biter
      })
      .catch((error) => {
        console.log('Veri çekme hatası:', error)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <p className="flex justify-center flex-col items-center py-8 text-3xl">
        Loading...
      </p>
    ) // Yüklenme sırasında gösterilecek mesaj
  }

  return (
    <div className="flex justify-center flex-col items-center py-8">
      <h1 className="text-2xl font-bold pb-4">Yapılacaklar Listem</h1>
      <div className="space-y-5">
        {/* todos buraya */}
        {todos.map((todo) => (
          <Todo key={todo.id} title={todo.title} completed={todo.completed} />
        ))}
      </div>
    </div>
  )
}

function Todo({ title, completed }) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id="completed"
          name="completed"
          type="checkbox"
          defaultChecked={completed} // API'den gelen completed bilgisi
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <div className="font-medium text-gray-900">{title}</div>
      </div>
    </div>
  )
}
