import HTTP from "./http";

export class Room {
    constructor(client, roomId) {
        this.client = client;
        this.roomId = roomId;

        this.client.on("ROOM_CALL", this.onRoomCall);

        this.client.emit("ROOM_SUBSCRIBE", this.roomId);
    }

    getRoomData() {
        return HTTP.Get("/rooms/" + this.roomId, this.httpHeaders);
    }

    get httpHeaders() {
        return this.client.httpHeaders;
    }

    onRoomCall = (data) => {

    }

    dispose() {
        if (this.client) {
            this.client.off("ROOM_CALL", this.onRoomCall);

            this.client.emit("ROOM_UNSUBSCRIBE", this.roomId);
        }
    }
}