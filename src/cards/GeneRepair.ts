
import { IProjectCard } from "./IProjectCard";
import { Tags } from "./Tags";
import { CardType } from "./CardType";
import { Player } from "../Player";
import { Game } from "../Game";

export class GeneRepair implements IProjectCard {
    public cost: number = 12;
    public nonNegativeVPIcon: boolean = true;
    public tags: Array<Tags> = [Tags.SCIENCE];
    public cardType: CardType = CardType.AUTOMATED;
    public name: string = "Gene Repair";
    public text: string = "Requires 3 science tags. Increase your mega credit production 2 steps. Gain 2 victory points.";
    public requirements: string = "3 Science";
    public description: string = "Counters the inevitable damage from cosmis radiation and reverses many aging symptoms";
    public canPlay(player: Player): boolean {
        return player.getTagCount(Tags.SCIENCE) >= 3;
    }
    public play(player: Player, _game: Game) {
        if (player.getTagCount(Tags.SCIENCE) < 3) {
            throw "Requires 3 science tags.";
        }
        player.megaCreditProduction += 2;
        player.victoryPoints += 2;
        return undefined;
    }
}
