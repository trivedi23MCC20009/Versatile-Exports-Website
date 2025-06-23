#!/bin/bash
curl -X POST http://localhost:3001/api/products -H "Content-Type: application/json" -d '{"name":"Dark Brown barcoo bridle","description":"3/4\" Barcoo Bridle Made from high quality dark brown leather with Solid brass fittings","price":100,"imageUrl":"P1.JPG"}'
