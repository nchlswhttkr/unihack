from uber_rides.session import Session
from uber_rides.client import UberRidesClient

session = Session(server_token="CUofQlGNUbYK3x9FjX0AtlFjEJCak4O59V61YeGs")
client = UberRidesClient(session)

response = client.get_products(37.77, -122.41)
products = response.json.get('products')

response = client.get_price_estimates(
    start_latitude=37.770,
    start_longitude=-122.411,
    end_latitude=37.791,
    end_longitude=-122.405,
    seat_count=2
)

estimate = response.json.get('prices')

from uber_rides.auth import AuthorizationCodeGrant
auth_flow = AuthorizationCodeGrant(
    "bNuMgUk4XDsvlVbnnLtJwwEitiflHMPG",
    "history history_lite places profile request_receipt",
    "Crhu4OyRxMV0nHoZYT-Mu8R2izwlDaSupxao_QMF",
    "http://localhost:5000/uber/success"
)
auth_url = auth_flow.get_authorization_url()

session = auth_flow.get_session("http://localhost:5000/uber/success?code=JA.VUNmGAAAAAAAEgASAAAABwAIAAwAAAAAAAAAEgAAAAAAAAG8AAAAFAAAAAAADgAQAAQAAAAIAAwAAAAOAAAAkAAAABwAAAAEAAAAEAAAAPxtIcCH81zNpbi_21NRXyxsAAAAyZYw2AIWkRQEoLeDW1fVF-mJIr0-sslqVPLtmA9T5uXoz4n06j3L1siIBdi9UBCEiThzpt6jzWs0Fr_bBx8g1ITkFar7NgwjJ8SaghbB4UTWNo_7UDqyMZ55Na2Ym5lTxaTxBiCFSVIYn0jdDAAAACWpUq-rVsDw9z8iUSQAAABiMGQ4NTgwMy0zOGEwLTQyYjMtODA2ZS03YTRjZjhlMTk2ZWU")
client = UberRidesClient(session, sandbox_mode=True)
credentials = session.oauth2credential

response = client.get_user_profile()
profile = response.json

first_name = profile.get('first_name')
last_name = profile.get('last_name')
email = profile.get('email')