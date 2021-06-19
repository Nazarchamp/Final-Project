import asyncio
import websockets
import json


async def hello(websocket, path):
    while True:
        name = await websocket.recv()
        print(f"< {name}")

        greeting = f"Hello {name}!"

        items = None
        try:
            with open(f'{name}.json') as f:
                items = json.load(f)
            await websocket.send(f'{items}')
        except:
            await websocket.send('Bad Request')

        print(f"> {greeting}")

start_server = websockets.serve(hello, "localhost", 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()