// Isolated development API. Never use this server for production or authentication.
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
const dataFile = new URL('./vehicle-documentation.local.json', import.meta.url);
const date = (offset = 0) => { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
const types = [ {id:'type-soat',code:'SOAT',name:'SOAT',description:'Seguro obligatorio',isRequired:true,isActive:true}, {id:'type-inspection',code:'CITV',name:'Revisión técnica / Technical inspection',description:'Certificado de inspección técnica vehicular',isRequired:true,isActive:true} ];
const vehicles = [{id:'vehicle-demo-1',licensePlate:'ABC-123'},{id:'vehicle-demo-2',licensePlate:'DEF-456'}];
let documents = existsSync(dataFile) ? JSON.parse(readFileSync(dataFile,'utf8')) : [-5,15,90].map((offset,i) => ({id:randomUUID(),vehicleId:vehicles[i === 2 ? 1 : 0].id,documentTypeId:types[i === 1 ? 1 : 0].id,number:`DEMO-${i+1}`,issueDate:date(-180),expirationDate:date(offset),fileUrl:'',createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}));
const persist = () => writeFileSync(dataFile, JSON.stringify(documents,null,2));
const validDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0,10) === value;
createServer(async (req,res) => {
  res.setHeader('Access-Control-Allow-Origin','http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  const send = (status,body) => {res.writeHead(status,{'Content-Type':'application/json'});res.end(JSON.stringify(body));};
  if(req.method==='OPTIONS') {res.writeHead(204);res.end();return;}
  try {
    const url = new URL(req.url,'http://localhost');
    if(req.method==='GET' && url.pathname==='/api/v1/vehicles') return send(200,vehicles);
    if(req.method==='GET' && url.pathname==='/api/v1/document-types') return send(200,types);
    if(req.method==='GET' && url.pathname==='/api/v1/documents/expiring') {
      const days = Number(url.searchParams.get('days') ?? 30);
      return send(200,documents.filter(d => d.expirationDate >= date() && d.expirationDate <= date(days)));
    }
    const match = url.pathname.match(/^\/api\/v1\/vehicles\/([^/]+)\/documents(?:\/([^/]+))?$/);
    if(!match) return send(404,{message:'Not found'});
    const [,vehicleId,id] = match;
    if(!vehicles.some(v => v.id === vehicleId)) return send(404,{message:'Vehicle not found'});
    if(req.method==='GET' && !id) return send(200,documents.filter(d=>d.vehicleId===vehicleId));
    if((req.method==='POST' && !id) || (req.method==='PUT' && id)) {
      let body=''; for await (const chunk of req) {body+=chunk;if(body.length>32768) return send(413,{message:'Payload too large'});}
      const input=JSON.parse(body);
      if(input.vehicleId!==vehicleId || !types.some(t=>t.id===input.documentTypeId) || typeof input.number!=='string' || !input.number.trim() || input.number.length>80 || !validDate(input.issueDate) || !validDate(input.expirationDate) || input.issueDate>input.expirationDate || typeof input.fileUrl!=='string' || (input.fileUrl && !/^https?:\/\/\S+$/i.test(input.fileUrl))) return send(400,{message:'Invalid document'});
      const previous = id ? documents.find(d=>d.id===id && d.vehicleId===vehicleId) : null;
      if(id && !previous) return send(404,{message:'Document not found'});
      const doc={id:previous?.id ?? randomUUID(),vehicleId,documentTypeId:input.documentTypeId,number:input.number.trim(),issueDate:input.issueDate,expirationDate:input.expirationDate,fileUrl:input.fileUrl,createdAt:previous?.createdAt ?? new Date().toISOString(),updatedAt:new Date().toISOString()};
      documents=previous ? documents.map(d=>d.id===id ? doc : d) : [...documents,doc];persist();return send(previous?200:201,doc);
    }
    send(405,{message:'Method not allowed'});
  } catch {send(400,{message:'Invalid request'});}
}).listen(3001,'127.0.0.1',()=>console.log('Vehicle Documentation demo API: http://localhost:3001/api/v1'));
