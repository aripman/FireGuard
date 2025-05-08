# /backend/app/api/stedsnavn.py
import httpx
from fastapi import APIRouter, HTTPException
from typing import List
from pydantic import BaseModel
from frcm.frcapi import METFireRiskAPI
from frcm.datamodel.model import Location, FireRisk
import datetime
from typing import Optional

router = APIRouter(prefix="/geonorge", tags=["locations"])

class Stedsnavn(BaseModel):
    kommune: str
    latitude: float
    longitude: float
    firerisks: Optional[List[FireRisk]] = None

#class Stedsnavn(BaseModel):
#    kommune: str
#    latitude: float
#    longitude: float
#    timestamp: Optional[datetime.datetime] = None
#    ttf: Optional[float] = None
#    wind_speed: Optional[float] = None



#returnerer en liste
#@router.get("/geonorge/{query}", response_model=List[Stedsnavn])
#async def get_stedsnavn(query: str):

#returner bare et sted, men det er ikke den meste optimale måten å gjør det på
#pga den returner første på liste egentlig, så det er flere koordinater som beskriver en By
@router.get("/{query}", response_model=Stedsnavn)
async def get_stedsnavn(query: str):
    url = f"https://ws.geonorge.no/stedsnavn/v1/navn?sok={query}&fuzzy=false"

    frc = METFireRiskAPI()

    async with httpx.AsyncClient() as client:
        response = await client.get(url)

    data = response.json()
    print(data)
    # Process data and extract necessary fields
    stedsnavn_list = []
    for item in data['navn']:
        for kommune in item['kommuner']:
            stedsnavn_list.append(Stedsnavn(
                kommune=kommune['kommunenavn'],
                latitude=item['representasjonspunkt']['nord'],
                longitude=item['representasjonspunkt']['øst'],
                firerisks=None  # Du fyller inn dette senere
            ))

    if stedsnavn_list:
        sted = stedsnavn_list[0]

        #for stedsnavn in stedsnavn_list[1:len(stedsnavn_list) - 1]:
            #location = Location(latitude=stedsnavn.latitude, longitude=stedsnavn.longitude)
        location = Location(latitude=sted.latitude, longitude=sted.longitude)
        obs_delta = datetime.timedelta(days=10)
        prediction = frc.compute_now(location, obs_delta)

        sted.firerisks = prediction.firerisks
        return sted

    #if stedsnavn_list:
    #    return stedsnavn_list[0]

    raise HTTPException(status_code=404, detail="Ingen treff funnet")
