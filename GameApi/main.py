from fastapi import FastAPI,status
from starlette.responses import JSONResponse
from db.database import create_tables
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from routers import game,auth,admin,api_key
from core.config import settings
from starlette.middleware.authentication import AuthenticationMiddleware
from middlewere.auth import AuthBackend
from slowapi.middleware import SlowAPIMiddleware
from core.rate_limit import limiter
from slowapi.errors import RateLimitExceeded
from exceptions.exception_handlers import global_exception_handler

create_tables()

app=FastAPI(
    title="Game API",
    description="The game data of entire era",
    version="1.0",
    docs_url="/doc",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=settings.ALLOWED_HEADERS,
)


app.add_middleware(
    AuthenticationMiddleware,
    backend=AuthBackend(),
)

app.state.limiter=limiter
app.add_middleware(SlowAPIMiddleware)

@app.exception_handler(RateLimitExceeded)
async def rate_limit_exception_handler(request,exc):
    return JSONResponse(
        status_code=status.HTTP_429_TOO_MANY_REQUESTS,
        content={
            "error": "Too Many Requests",
            "description": "Api key rate limit exceeded",
        }
)
app.add_exception_handler(Exception,global_exception_handler)

app.include_router(auth.router,prefix=settings.API_PREFIX)
app.include_router(game.router,prefix=settings.API_PREFIX)
app.include_router(api_key.router,prefix=settings.API_PREFIX)
app.include_router(admin.router,prefix=settings.API_PREFIX)

if __name__=="__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=3000,reload=True)
