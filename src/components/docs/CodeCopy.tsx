'use client'
import { useEffect } from 'react'

export function CodeCopy() {
  useEffect(() => {
    document.querySelectorAll<HTMLPreElement>('article pre').forEach((pre) => {
      if (pre.dataset.copy) return
      pre.dataset.copy = '1'
      const b = document.createElement('button')
      b.type = 'button'; b.className = 'copy-btn'; b.textContent = 'Copy'
      b.onclick = async () => { await navigator.clipboard.writeText(pre.innerText); b.textContent = 'Copied'; setTimeout(() => (b.textContent = 'Copy'), 1200) }
      pre.style.position = 'relative'; pre.appendChild(b)
    })
  }, [])
  return null
}
