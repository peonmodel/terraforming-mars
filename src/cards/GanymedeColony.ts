
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";
import { SpaceName } from "../SpaceName";
import { SpaceType } from "../SpaceType";

export class GanymedeColony implements IProjectCard {
    public cost: number = 20;
    public nonNegativeVPIcon: boolean = true;
    public tags: Array<Tags> = [Tags.JOVIAN, Tags.SPACE, Tags.CITY];
    public cardType: CardType = CardType.AUTOMATED;
    public name: string = "Ganymede Colony";
    public text: string = "Place a city tile on the reserved area. Gain 1 victory point per jovian tag you have.";
    public requirements: undefined;
    public description: string = "Settling the biggest moon of the biggest plant.";
    public canPlay(): boolean {
        return true;
    }
    public onGameEnd(player: Player) {
        player.victoryPoints += player.getTagCount(Tags.JOVIAN);
    }
    public play(player: Player, game: Game) {
        game.addCityTile(player, SpaceName.GANYMEDE_COLONY, SpaceType.COLONY);
        return undefined;
    }
}
