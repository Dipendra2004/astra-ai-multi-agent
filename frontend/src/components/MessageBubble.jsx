import React from 'react'
import Markdown from 'react-markdown'

function MessageBubble({role,content,images}) {
  const isUser = role==="user"



  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`w-fit max-w-[92vm] ${isUser ? "bg-linear-to-br from-indigo-500 to-violet-700 text-white rounded-tr-sm" : " text-slate-200 rounded-tl-sm"}`}> 
      <Markdown>
        {content}
      </Markdown>
      
      </div>
    </div>
  )
}

export default MessageBubble