from starlette.requests import Request
from starlette.responses import JSONResponse


def global_exception_handler(request:Request,exception:Exception):
    return JSONResponse(
        status_code=500,
        content={
            "message":"Something went wrong,Please try again later.",
        }
    )