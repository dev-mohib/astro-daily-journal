import { useEffect, useState } from "react";
import { markdownToHtml } from "../utils/markdown"
const MarkdownComponent = () =>  {
    const [title, setTitle] = useState('untitled')
    const [content, setContent] = useState(`
# My Day
- Some text
- Some other text

`)

const [html, setHtml] = useState('')

const convert = async() => {
    const data = await markdownToHtml(content)
    setHtml(data)
}

useEffect(() => {
    convert()
}, [content])

const handleSave = async() => {
    const response = await fetch('/api/postJournal', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content, title }),
    });
    if (!response.ok) {
    console.error('Failed to save journal');
    }
}
return (
    <div>
    <div className="flex w-full justify-between px-10 py-5 ">
        <div>
            Name: <input className="focus:outline-none ring-2 ring-gray-200 rounded-md focus:ring-2 focus:ring-blue-500 px-3 py-1" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
    </div>
    <section className="flex flex-col md:flex-row border border-gray-300 p-6 md:p-8 bg-gray-50 rounded-lg">
        <div className="w-full md:w-1/2 p-4 border border-gray-300 rounded-lg md:mr-2">
            <label for="textInput" className="block text-lg font-semibold text-gray-700 mb-2">Enter Markdown</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="10" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type your text here..."></textarea>
        </div>
        <div className="w-full md:w-1/2 p-4 border border-gray-300 rounded-lg md:ml-2">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Preview</h2>
            <div dangerouslySetInnerHTML={{__html : html}} class="prose prose-sm p-3 bg-white border border-gray-200 rounded-lg h-72 overflow-y-auto">
            </div>
        </div>
    </section>

    <div className="w-full flex justify-end px-14 py-5">
        <button onClick={handleSave} className="px-10 py-3 bg-blue-500 hover:bg-blue-400 rounded-md text-white">Save</button>
    </div>
    </div>
  );
}

export default MarkdownComponent;