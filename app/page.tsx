"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");

  // TODOを追加
  const addTodo = () => {
    const todoText = inputValue.trim();

    if (todoText === "") {
      alert("タスクを入力してください");
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  // TODOを削除
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // TODOの完了状態を切り替え
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Enterキーで追加
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          TODOリスト
        </h1>

        {/* 入力セクション */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="新しいタスクを入力..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            onClick={addTodo}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
          >
            追加
          </button>
        </div>

        {/* TODOリスト */}
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className={`flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all ${
                todo.completed ? "opacity-60" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 cursor-pointer accent-purple-600"
              />
              <span
                className={`flex-1 text-base ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 transition-colors"
              >
                削除
              </button>
            </li>
          ))}
        </ul>

        {/* タスクがない場合のメッセージ */}
        {todos.length === 0 && (
          <p className="text-center text-gray-400 mt-8">
            タスクがありません。新しいタスクを追加してください。
          </p>
        )}

        {/* タスク数の表示 */}
        {todos.length > 0 && (
          <div className="mt-6 text-center text-gray-600">
            <p>
              全タスク: {todos.length} | 完了:{" "}
              {todos.filter((todo) => todo.completed).length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
