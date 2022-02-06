import config
from datetime import datetime, timedelta
from jose import JWTError, jwt
from exceptions.auth import *

import uvicorn
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from web3.auto import w3
from eth_account.messages import defunct_hash_message
from fastapi.security import OAuth2PasswordBearer

from db.crud_utils import CRUDUtils
from models.auth import *
from models.user import *
from models.follow import *
from models.notifications import *
from nft.data_utils import DataUtils


app = FastAPI()
crud_utils = CRUDUtils("./data/sqlite.db")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
nft_data_utils = DataUtils(config)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=config.AUTH["ACCESS_TOKEN_EXPIRE_MINUTES"])
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, config.AUTH["SECRET"], algorithm=config.AUTH["ALGORITHM"])
    return encoded_jwt


@app.post("/auth/login", tags=["Authentication"])
def login(login_input: LoginInput):
    is_new_user = False

    if not crud_utils.check_user_exists(login_input.public_address):
        crud_utils.add_new_user(login_input.public_address)
    (first_name, last_name, nonce, public_address) = crud_utils.get_user(login_input.public_address)

    if not (first_name and last_name):
        is_new_user = True

    try:
        original_message = 'I am signing my one-time nonce: {}'.format(nonce)
        message_hash = defunct_hash_message(text=original_message)
        signer = w3.eth.account.recoverHash(message_hash, signature=login_input.signature)

        if signer == public_address:
            crud_utils.update_user_nonce(public_address)

            user_data = {"public_address": login_input.public_address}
            token = create_access_token(user_data)

            return {"token": token, "is_new_user": is_new_user}
        else:
            return FAILED_LOGIN_EXCEPTION

    except Exception as exp:
        print(exp)
        return FAILED_LOGIN_EXCEPTION


@app.get("/auth/nonce", tags=["Authentication"])
def get_nonce(public_address: str):
    if not crud_utils.check_user_exists(public_address):
        crud_utils.add_new_user(public_address)
    (_, _, nonce, public_address) = crud_utils.get_user(public_address)
    return {
        "nonce": nonce
    }


@app.post("/update/details", tags=["Update"])
def update_user_details(user_details_input: UserDetailsUpdateInput, token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, config.AUTH["SECRET"], algorithms=[config.AUTH["ALGORITHM"]])
        user_address = payload["public_address"]
        crud_utils.update_user_details(user_address, user_details_input.first_name, user_details_input.last_name)
    except:
        return {"Status": "Failed"}


@app.get("/info/user", tags=["Information"])
def fetch_user_details(public_address: str):
    try:
        (first_name, last_name, nonce, public_address) = crud_utils.get_user(public_address)

        return UserDetails(
            first_name=first_name,
            last_name=last_name
        )
    except:
        return {"Status": "Failed"}


@app.post("/info/collection", tags=["Information"])
def fetch_collection(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, config.AUTH["SECRET"], algorithms=[config.AUTH["ALGORITHM"]])
        user_address = payload["public_address"]
        # nft_data_utils.refresh_collection(user_address, crud_utils)
        return crud_utils.get_nfts(user_address)

    except Exception as exp:
        print(exp)
        return {"Status": "Failed"}


@app.post("/update/following", tags=["Update"])
def update_following(input_follow_request: InputFollowRequest, token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, config.AUTH["SECRET"], algorithms=[config.AUTH["ALGORITHM"]])
        user_address = payload["public_address"]

        follow_request = FollowRequest(follower=user_address, following=input_follow_request.following)
        return crud_utils.add_follow_request(follow_request)

    except Exception as exp:
        print(exp)
        return {"Status": "Failed"}


@app.get("/info/followers", tags=["Information"])
def get_followers(public_address: str):
    try:
        return crud_utils.get_all_followers(public_address)

    except Exception as exp:
        print(exp)
        return {"Status": "Failed"}


@app.get("/info/following", tags=["Information"])
def get_following(public_address: str):
    try:
        return crud_utils.get_all_followings(public_address)

    except Exception as exp:
        print(exp)
        return {"Status": "Failed"}


@app.post("/info/notifications", tags=["Information"])
def get_notifications(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, config.AUTH["SECRET"], algorithms=[config.AUTH["ALGORITHM"]])
        user_address = payload["public_address"]

        print(user_address)
        # This has to be stored in db while logging out
        last_logged_in = 0

        notifications = []
        following = crud_utils.get_all_followings(user_address)
        for following_user in following:
            user_nfts = crud_utils.get_nfts(following_user)
            filtered_nfts = [nft for nft in user_nfts if nft.added_at > last_logged_in]

            for nft in filtered_nfts:
                notification = Notification(type=NotificationType.BUY, executor=following_user, nft=nft)
                notifications.append(notification)

        return notifications

    except Exception as exp:
        print(exp)
        return {"Status": "Failed"}


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
