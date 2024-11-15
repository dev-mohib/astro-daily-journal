
import fs from 'fs';
import path from 'path';
export const prerender = false;
export const POST = async({ request }) => {
  const headers = request.headers.get('Content-Type')
  console.log({headers})
  if (request.headers.get("Content-Type") === "application/json") {
    const {content, title} = await request.json();
    const markdownContent = 
`---
title: "${title}"
date: ${new Date().toISOString()}
---
${content}
`;
    const filePath = path.join(process.cwd(), 'src','content', 'journals', `${title.split(" ").join("-")}.md`);
    try {
      fs.writeFileSync(filePath, markdownContent, 'utf8');
      return new Response(JSON.stringify({ status: 'success' }), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ status: 'error', message: error.message }), { status: 500 });
    }
  }else{ 
    return new Response("Invalid request")
  }
}

