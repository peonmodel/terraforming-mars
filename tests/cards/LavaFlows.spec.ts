import { expect } from "chai";
import { LavaFlows } from "../../src/cards/LavaFlows";
import { Color } from "../../src/Color";
import { Player } from "../../src/Player";
import { Game } from "../../src/Game";
import { TileType } from "../../src/TileType";
import { SpaceName } from "../../src/SpaceName";
import { SpaceType } from "../../src/SpaceType";
import { resetBoard } from "../TestingUtils";

describe("LavaFlows", function () {
    let card : LavaFlows, player : Player, game : Game;

    beforeEach(function() {
        card = new LavaFlows();
        player = new Player("test", Color.BLUE, false);
        game = new Game("foobar", [player, player], player);
        resetBoard(game);
    });

    it("Can't play if no available spaces", function () {
        game.addTile(player, SpaceType.LAND, game.getSpace(SpaceName.THARSIS_THOLUS), { tileType: TileType.LAVA_FLOWS }); 
        game.addTile(player, SpaceType.LAND, game.getSpace(SpaceName.ARSIA_MONS), { tileType: TileType.LAVA_FLOWS });
        game.addTile(player, SpaceType.LAND, game.getSpace(SpaceName.PAVONIS_MONS), { tileType: TileType.LAVA_FLOWS });

        const anotherPlayer = new Player("test", Color.RED, false);
        game.getSpace(SpaceName.ASCRAEUS_MONS).player = anotherPlayer; // land claim
        expect(card.canPlay(player, game)).is.not.true;
    });

    it("Should play", function () {
        const action = card.play(player, game);
        expect(action).is.not.undefined;
        
        const space = action.availableSpaces[0];
        action.cb(space);
        expect(space.tile && space.tile.tileType).to.eq(TileType.LAVA_FLOWS);
        expect(space.player).to.eq(player);
        expect(game.getTemperature()).to.eq(-26);
        expect(space.adjacency?.bonus).eq(undefined);
    });
});
