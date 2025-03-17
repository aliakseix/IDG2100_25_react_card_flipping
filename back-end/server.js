import express from "express";
import imgData from "./img.data.json" with { type: "json" };
import cors from "cors";

const app = express();

app.use(cors());

app.get("/data", (req, res)=>{
	console.log("Returning data");
	// console.log(req.method);
	setTimeout(()=>res.json(imgData), Math.random() * 5000);
});

app.listen(8086, ()=>{
	console.log("Express listening on 8086");
});