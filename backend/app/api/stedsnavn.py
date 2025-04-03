# /backend/app/api/stedsnavn.py
import httpx
from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel

router = APIRouter(prefix="/geonorge", tags=["locations"])


class Stedsnavn(BaseModel):
    #navn: str
    #ylke: str
    kommune: str
    latitude: float
    longitude: float

#returnerer en liste
#@router.get("/geonorge/{query}", response_model=List[Stedsnavn])
#async def get_stedsnavn(query: str):

#returner bare et sted, men det er ikke den meste optimale måten å gjør det på
#pga den returner første på liste egentlig, så det er flere koordinater som beskriver en By
@router.get("/{query}", response_model=Stedsnavn)
async def get_stedsnavn(query: str):
    url = f"https://ws.geonorge.no/stedsnavn/v1/navn?sok={query}&fuzzy=false"

    async with httpx.AsyncClient() as client:
        response = await client.get(url)

    data = response.json()

    # Process data and extract necessary fields
    stedsnavn_list = []
    for item in data['navn']:
        for kommune in item['kommuner']:
            stedsnavn_list.append(Stedsnavn(
                #navn=item['skrivemåte'],
                #fylke=item['fylker'][0]['fylkesnavn'],
                kommune=kommune['kommunenavn'],
                latitude=item['representasjonspunkt']['nord'],
                longitude=item['representasjonspunkt']['øst']
            ))

    #return stedsnavn_list
    if stedsnavn_list:
        return stedsnavn_list[0]

    raise HTTPException(status_code=404, detail="Ingen treff funnet")

